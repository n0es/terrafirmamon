// priority: 0
"use strict";

/**
 * Cobblemon spawn rate tuning.
 *
 * Lives here rather than in config/cobblemon/main.json so the numbers travel
 * with the pack: every instance and every server that ships these scripts gets
 * them, and a player's local config file cannot drift away from the pack.
 * Cobblemon reads these fields live from its config object, so writing to it
 * once the server is up is enough - main.json on disk is left untouched.
 *
 * Rates are raised because the TFC climate gate in
 * startup_scripts/cobblemon/spawns.climate.js vetoes roughly half of all spawn
 * attempts by design. Measured in game: 12 of 24 attempts passed. These values
 * put the felt density back above where it was before the gate existed.
 */
const COBBLEMON_SPAWN_TUNING = {
	// Cobblemon default 1.0. The headline density knob.
	pokemonPerChunk: 1.75,
	// Cobblemon default 120.0 ticks, i.e. one attempt every 6s. 80 is every 4s.
	ticksBetweenSpawnAttempts: 80.0,
	// Cobblemon default 24.0. Lower lets Pokemon cluster a little more tightly.
	minimumDistanceBetweenEntities: 20.0
}

/** @param {Internal.ServerEventJS} event */
const applyCobblemonSpawnTuning = (event) => {

	const $Cobblemon = Java.loadClass('com.cobblemon.mod.common.Cobblemon')

	try {
		var config = $Cobblemon.INSTANCE.getConfig()

		config.setPokemonPerChunk(COBBLEMON_SPAWN_TUNING.pokemonPerChunk)
		config.setTicksBetweenSpawnAttempts(COBBLEMON_SPAWN_TUNING.ticksBetweenSpawnAttempts)
		config.setMinimumDistanceBetweenEntities(COBBLEMON_SPAWN_TUNING.minimumDistanceBetweenEntities)

		console.info(`[tfg] cobblemon spawn tuning: ${config.getPokemonPerChunk()}/chunk, `
			+ `every ${config.getTicksBetweenSpawnAttempts()} ticks, `
			+ `min gap ${config.getMinimumDistanceBetweenEntities()}`)

	} catch (error) {
		console.error(`[tfg] could not apply cobblemon spawn tuning: ${error}`)
	}
}

// Also apply at script load. ServerEvents.loaded only fires when a world is
// opened, so without this a retune needs a full world reload to take effect;
// with it, /reload is enough. Cobblemon's config object exists from mod
// construction onward, so this is always safe, and the setters are idempotent.
applyCobblemonSpawnTuning()
