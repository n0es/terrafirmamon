// priority: 0
"use strict";

/**
 * Pokerods.
 *
 * Cobblemon makes a rod at a SMITHING table: the Pokerod smithing template, plus any
 * fishing rod, plus the ball you want the rod themed after. 48 recipes ship with the mod,
 * one per ball. recipes.js begins with event.remove({ mod: 'cobblemon' }) and nothing
 * rebuilt any of them, so the entire fishing branch of the mod was unobtainable in this
 * pack - and with it cobblemon:fishing/pokerod and cobblemon:fishing/pokerod_treasure, the
 * two loot tables only a rod can roll.
 *
 * That is worth restoring rather than hiding: fishing is one of Cobblemon's two ways to
 * encounter a Pokemon, and the pack's governing brief (see recipes.js) is that catching is
 * EASY and EARLY. A dead rod line quietly removed half of that.
 *
 * The recipes below are Cobblemon's own, re-emitted, with two deliberate changes:
 *
 *   1. The base is #forge:fishing_rods rather than a single rod item. minecraft:fishing_rod
 *      has no recipe in this pack; TerraFirmaCraft's metal rods do, and TFC already
 *      populates that tag with all nine of them (copper through red steel). So a rod's cost
 *      rides TFC's metal progression without this file inventing a second cost curve.
 *   2. Fifteen of the sixteen ancient rods ARE restored, as of the ancient-ball pass:
 *      recipes.ancient.js now builds every ancient ball except the Origin Ball, so their rods
 *      are no longer dead EMI entries and have been unhidden. cobblemon:ancient_origin_rod is
 *      the sole exception and stays hidden - Cobblemon ships no recipe for the Origin Ball
 *      either, so it remains a reward item.
 *
 * Related jar-side fix, for context: Cobblemon ships data/minecraft/tags/items/enchantable/
 * fishing.json containing only #cobblemon:poke_rods, because on 1.21 VANILLA also defines
 * that tag (with minecraft:fishing_rod in it) and the two merge. 1.20.1 has no such tag, so
 * on the backport it resolved to "an existing Pokerod" and the first rod could never be
 * made in any pack. generate_missing_vanilla_tags() in utilityscripts/backport_data.py now
 * ships the vanilla half. These recipes name the tag they want directly and so do not
 * depend on that, but the mod's own 48 recipes do.
 *
 * One caveat worth recording: cobblemon:fishing/pokerod pulls in
 * minecraft:gameplay/fishing/{junk,treasure} directly, and this pack does not modify those
 * tables, so a rod can land minecraft:lily_pad, rotten_flesh, salmon, tropical_fish,
 * pufferfish, ink_sac or enchanted_book - none of which have a recipe here. They are
 * junk-tier trinkets rather than progression items, and those two tables are shared with
 * anything else in the pack that fishes, so re-pointing them is a pack-wide decision for
 * minecraft/loot.js, not something this file should do on Cobblemon's behalf.
 */
const registerCobblemonFishingRecipes = (event) => {

	//#region The smithing template - the gate on the whole line

	// Cobblemon's own template recipe duplicates an existing template (2 gold ingots + a
	// prismarine shard around one you already own), so the first one has to come from a
	// shipwreck cove or gilded treasure chest. recipes.utility.js already breaks with that
	// pattern for the automaton armour trim template - paper plus a plate, craftable from
	// scratch - so this matches it rather than leaving the rods behind a loot roll.
	event.shapeless('cobblemon:pokerod_smithing_template', [
		'minecraft:paper',
		'#forge:plates/wrought_iron'
	]).id('tfg:shapeless/pokerod_smithing_template')

	//#endregion

	//#region Clear Cobblemon's own rod recipes first

	// event.remove({ mod: 'cobblemon' }) in recipes.js does NOT get these. Probed on the test
	// server: after the wipe, findRecipes({ output: 'cobblemon:ancient_poke_rod' }) still
	// returns 1, so at least the smithing_transform recipes survive the mod-wide filter.
	//
	// That matters twice over. Left alone, the 32 rods below would each have two recipes -
	// Cobblemon's and this file's - and the 16 ancient rods would stay quietly craftable,
	// which is not what recipes.js decided about ancient balls. Removing by explicit id makes
	// the outcome the same either way, and is a no-op for any that the wipe did catch.
	;['poke', 'great', 'ultra', 'master', 'azure', 'citrine', 'roseate', 'slate', 'verdant',
		'safari', 'fast', 'level', 'lure', 'heavy', 'love', 'friend', 'moon', 'sport', 'net',
		'dive', 'nest', 'repeat', 'timer', 'luxury', 'premier', 'dusk', 'heal', 'quick',
		'cherish', 'park', 'dream', 'beast']
		.forEach(rod => {
			event.remove({ id: `cobblemon:${rod}_rod` })
			event.remove({ id: `cobblemon:ancient_${rod}_rod` })
		})

	// The ancient-only rod names (no plain counterpart in the list above). Still removed, then
	// rebuilt below for every ancient ball that now has a recipe - Cobblemon's own versions take
	// a vanilla fishing rod as the base, which is unobtainable here.
	;['feather', 'wing', 'jet', 'leaden', 'gigaton', 'origin', 'ivory']
		.forEach(rod => event.remove({ id: `cobblemon:ancient_${rod}_rod` }))

	//#endregion

	//#region Rods - one smithing transform per obtainable ball

	// Written as event.custom rather than the smithing_transform binding on purpose: this is
	// verbatim the JSON shape Cobblemon itself ships (see data/cobblemon/recipes/*_rod.json),
	// and a wrong binding name here would throw inside ServerEvents.recipes and take every
	// other mod's recipes down with it.
	//
	// Every ball with a recipe in this pack, in the order recipes.js builds them. The rod id
	// is the ball id with _ball swapped for _rod, which holds for all 48 of Cobblemon's rods.
	const RODDABLE_BALLS = ['cobblemon:poke_ball', 'cobblemon:great_ball', 'cobblemon:ultra_ball',
		'cobblemon:master_ball']

	global.COBBLEMON_APRICORN_BALLS.forEach(([ball]) => RODDABLE_BALLS.push(ball))
	global.COBBLEMON_SPECIALTY_BALLS.forEach(([ball]) => RODDABLE_BALLS.push(ball))

	// The 15 ancient balls recipes.ancient.js builds. ancient_origin_ball is not in that table
	// (no recipe, in this pack or in Cobblemon), so ancient_origin_rod correctly gets none here
	// and stays hidden in tags.hidden.js.
	global.COBBLEMON_ANCIENT_BALLS.forEach(([ball]) => RODDABLE_BALLS.push(ball))

	RODDABLE_BALLS.forEach(ball => {
		const rod = ball.replace('_ball', '_rod')
		event.custom({
			type: 'minecraft:smithing_transform',
			template: { item: 'cobblemon:pokerod_smithing_template' },
			base: { tag: 'forge:fishing_rods' },
			addition: { item: ball },
			result: { item: rod }
		}).id(`tfg:smithing/${global.linuxUnfucker(rod)}`)
	})

	//#endregion
}
