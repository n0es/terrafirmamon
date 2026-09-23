// priority: 0
"use strict";

/**
 * TFC climate gate for Cobblemon spawns.
 *
 * Cobblemon decides where a Pokemon may spawn from biome tags, light and a
 * handful of block checks. None of that can see TFC's climate, which is the
 * thing that actually varies across a TFG world: two tfg:earth/plains chunks
 * can be a rainforest and an ice field. So this hooks Cobblemon's own
 * cancellable ENTITY_SPAWN event and vetoes a spawn whose species does not
 * belong in the TFC climate at that exact position.
 *
 * Two checks run, both driven by the tables in constants.spawns.js:
 *
 *   1. Climate envelope. Average temperature, rainfall and forest density are
 *      compared against the species override if it has one, otherwise against
 *      its elemental types. Fire types want heat, ice types want cold, grass
 *      and bug types want trees TFC actually grew.
 *
 *   2. Region. TFC classifies the position into one of twelve Koppen zones;
 *      each zone is a Pokemon region. Its own generations spawn freely,
 *      climatically adjacent ones turn up as occasional visitors, and the rest
 *      are turned away. Legendaries and their kin skip this entirely.
 *
 * Every failure path here is fail-open: if anything at all goes wrong the
 * spawn is allowed through unchanged, because a broken gate must never be a
 * world with no Pokemon in it.
 */

/**
 * Note on `var`: everything declared inside these function bodies uses var on
 * purpose. Rhino raises "redeclaration of var" the second time it enters a
 * function that mixes a const/let declaration with a try/catch in the same
 * body, which silently latched the whole gate off the first time this ran.
 * The top-level handles below are declared once at load and are safe as const.
 */

const $CobblemonEvents = Java.loadClass('com.cobblemon.mod.common.api.events.CobblemonEvents')
const $Climate = Java.loadClass('net.dries007.tfc.util.climate.Climate')
const $Koppen = Java.loadClass('net.dries007.tfc.util.climate.KoppenClimateClassification')
const $ChunkData = Java.loadClass('net.dries007.tfc.world.chunkdata.ChunkData')

/** Set true to log every veto to the KubeJS console. Very chatty; testing only. */
global.COBBLEMON_CLIMATE_DEBUG = false

/**
 * Narrow one envelope by another, keeping the tighter bound on each axis.
 * A dual type whose halves disagree (there is no fire/ice) collapses to an
 * impossible band, so the caller falls back to the primary type alone.
 */
const intersectClimate = (a, b) => {
	if (!a) return b
	if (!b) return a
	return {
		minTemp: Math.max(a.minTemp, b.minTemp),
		maxTemp: Math.min(a.maxTemp, b.maxTemp),
		minRain: Math.max(a.minRain, b.minRain),
		maxRain: Math.min(a.maxRain, b.maxRain),
		minForest: Math.max(a.minForest || 0, b.minForest || 0)
	}
}

const isImpossible = (envelope) =>
	envelope.minTemp > envelope.maxTemp || envelope.minRain > envelope.maxRain

/** The climate band a Pokemon is allowed to spawn in, or null if it is unrestricted. */
const climateEnvelopeFor = (pokemon) => {

	var speciesName = String(pokemon.getSpecies().getResourceIdentifier().getPath())
	var override = global.COBBLEMON_SPECIES_CLIMATE[speciesName]
	if (override) return override

	var primaryType = pokemon.getPrimaryType()
	if (primaryType === null) return null

	var primary = global.COBBLEMON_TYPE_CLIMATE[String(primaryType.getName())]
	if (!primary) return null

	var secondaryType = pokemon.getSecondaryType()
	if (secondaryType === null) return primary

	var secondary = global.COBBLEMON_TYPE_CLIMATE[String(secondaryType.getName())]
	if (!secondary) return primary

	// The form's typing is what matters, so an Alolan Vulpix reads as ice here.
	var combined = intersectClimate(primary, secondary)
	return isImpossible(combined) ? primary : combined
}

/**
 * True if the species is exempt from both gates - legendaries, mythicals,
 * paradox forms, ultra beasts and the boss-shaped labels. See
 * COBBLEMON_REGION_GATE_EXEMPT for why they skip the climate envelope too.
 */
const isGateExempt = (pokemon) => {

	var labels = pokemon.getSpecies().getLabels()

	for (var i = 0; i < global.COBBLEMON_REGION_GATE_EXEMPT.length; i++) {
		if (labels.contains(global.COBBLEMON_REGION_GATE_EXEMPT[i])) return true
	}
	return false
}

/** True if the species belongs to this Koppen zone, or is visiting it today. */
const passesRegionGate = (pokemon, zoneName) => {

	var zone = global.COBBLEMON_CLIMATE_REGIONS[zoneName]
	if (!zone) return true

	var labels = pokemon.getSpecies().getLabels()

	for (var i = 0; i < zone.home.length; i++) {
		if (labels.contains(zone.home[i])) return true
	}

	for (var i = 0; i < zone.visiting.length; i++) {
		if (labels.contains(zone.visiting[i])) {
			return Math.random() < global.COBBLEMON_REGION_VISITOR_CHANCE
		}
	}

	// No generation label at all means an addon species the tables do not know
	// about. Let it through rather than silently deleting other mods' content.
	var hasGeneration = false
	for (var generation = 1; generation <= 9; generation++) {
		if (labels.contains('gen' + generation)) { hasGeneration = true; break }
	}
	return !hasGeneration
}

const registerCobblemonClimateGate = () => {

	// /kubejs reload startup_scripts re-runs this file, and a second subscription
	// would veto every spawn twice - which silently squares the visitor roll and
	// makes the region gate look far harsher than it is. global outlives the
	// reload, so it is the right place for the guard. The tables are read from
	// global at spawn time, so retuning them still takes effect without a
	// resubscribe.
	if (global.COBBLEMON_CLIMATE_GATE_INSTALLED) return
	global.COBBLEMON_CLIMATE_GATE_INSTALLED = true

	// One argument, not (Priority, handler): Cobblemon overloads subscribe(Priority, ...) for both a
	// Kotlin function and a java.util.function.Consumer, and Rhino cannot tell which a JS function
	// means - it throws "the choice of Java method ... is ambiguous". The single-argument overload
	// has no such twin and already defaults to NORMAL priority. On a client this error was survivable;
	// on a dedicated server KubeJS treats a startup script error as fatal and the server will not boot.
	$CobblemonEvents.ENTITY_SPAWN.subscribe(event => {

		try {
			var spawned = event.getEntity()

			// Diagnostic: proves ENTITY_SPAWN fires at all and shows what it
			// carries. Without it, a silent early return is indistinguishable
			// from the event never being emitted.
			if (!global.COBBLEMON_GATE_SAW_ENTITY) {
				global.COBBLEMON_GATE_SAW_ENTITY = true
				console.error(`[cobblemon] gate saw first entity: ${spawned.getClass().getName()}`)
			}

			// The spawner emits this for everything it places; only Pokemon
			// carry a Pokemon, so duck-typing keeps us off Cobblemon internals.
			var pokemon = null
			try {
				pokemon = spawned.getPokemon()
			} catch (notAPokemon) {
				if (!global.COBBLEMON_GATE_DUCK_FAILED) {
					global.COBBLEMON_GATE_DUCK_FAILED = true
					console.error(`[cobblemon] getPokemon() not callable: ${notAPokemon}`)
				}
				return
			}
			if (pokemon === null) return

			// Cobblemon 1.8 renamed SpawnEvent.ctx to spawnablePosition. Both
			// carry the same world and position, so try the current name first
			// and fall back to the old one rather than pinning to one version.
			// Getting this wrong is invisible: the catch below fails the spawn
			// open, so a rename reads as "no gate at all", which is exactly how
			// this sat broken after the 1.8 update.
			var context = null
			try {
				context = event.getSpawnablePosition()
			} catch (beforeTheRename) {
				context = event.getCtx()
			}

			var level = context.getWorld()
			if (String(level.dimension) !== global.COBBLEMON_CLIMATE_DIMENSION) return

			var pos = context.getPosition()
			var temperature = $Climate.getAverageTemperature(level, pos)
			var rainfall = $Climate.getRainfall(level, pos)

			// Checked before either gate: a legendary placed inside a
			// lam:* structure only ever gets this one spawn attempt, so a
			// veto here is permanent rather than merely a lower rate.
			if (isGateExempt(pokemon)) return

			var envelope = climateEnvelopeFor(pokemon)
			if (envelope !== null) {

				var rejected = temperature < envelope.minTemp || temperature > envelope.maxTemp
					|| rainfall < envelope.minRain || rainfall > envelope.maxRain

				if (!rejected && envelope.minForest) {
					var forest = $ChunkData.get(level, pos).getForestType().ordinal()
					rejected = forest < envelope.minForest
				}

				if (rejected) {
					if (global.COBBLEMON_CLIMATE_DEBUG) {
						console.error(`[cobblemon] climate veto ${pokemon.getSpecies().getName()} at ${temperature}C ${rainfall}mm`)
					}
					event.cancel()
					return
				}
			}

			var zoneName = String($Koppen.classify(temperature, rainfall))

			// Positive proof of life: without this a working gate that happens
			// to veto nothing is indistinguishable from one that never ran.
			if (!global.COBBLEMON_CLIMATE_GATE_LIVE) {
				global.COBBLEMON_CLIMATE_GATE_LIVE = true
				// Also proves the label path: HashSet.contains with a JS string is
				// the one remaining interop assumption the region gate rests on.
				var labelProbe = pokemon.getSpecies().getLabels()
				var labelSample = 'none'
				for (var g = 1; g <= 9; g++) {
					if (labelProbe.contains('gen' + g)) { labelSample = 'gen' + g; break }
				}
				console.error(`[cobblemon] TFC climate gate live - ${pokemon.getSpecies().getName()} at ${temperature}C ${rainfall}mm, zone ${zoneName}, label ${labelSample}`)
			}
			if (!passesRegionGate(pokemon, zoneName)) {
				if (global.COBBLEMON_CLIMATE_DEBUG) {
					console.error(`[cobblemon] region veto ${pokemon.getSpecies().getName()} in ${zoneName}`)
				}
				event.cancel()
			}

		} catch (error) {
			// Fail open, but say so once rather than quietly gating nothing.
			global.COBBLEMON_CLIMATE_GATE_ERRORS = (global.COBBLEMON_CLIMATE_GATE_ERRORS || 0) + 1
			if (global.COBBLEMON_CLIMATE_GATE_ERRORS <= 5) {
				console.error(`[cobblemon] spawn check failed, letting it through: ${error}`)
			}
		}
	})
}

try {
	registerCobblemonClimateGate()
} catch (error) {
	// Subscribing means handing Rhino a JS function where Cobblemon wants a
	// Kotlin Function1. If that ever stops working, say so loudly and leave
	// spawning exactly as vanilla rather than taking the startup script down.
	console.error(`[cobblemon] could not install the TFC climate gate: ${error}`)
}
