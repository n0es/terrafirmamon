// priority: 0
"use strict";

/**
 * Cobblemon apricorn seeds, tumblestones, and fossils.
 *
 * The apricorn and saccharine wood families used to be built here, vanilla-style,
 * from planks. They now run through TFGWoodBuilder like every other wood in the
 * pack (see the Cobblemon region of tfg/natural_blocks/recipes.wood.js).
 *
 * Cobblemon's boats and chest boats are gone entirely - no recipe here, and both
 * woods' four boat items are hidden from the recipe viewer in tags.hidden.js.
 * This pack does its boating through Firmaciv, which builds real hulls out of
 * lumber; a one-craft vanilla rowboat sitting next to that is a shortcut around
 * the whole system, not a wood variant TFGWoodBuilder happened to miss.
 *
 * Apricorn seeds are extracted 1:1 from their matching coloured apricorn - the
 * seed is what you plant, the apricorn is the fruit.
 *
 * Tumblestones mirror vanilla's amethyst geode: the raw shard, the cluster, and all
 * three budding-block growth stages are worldgen/mining-only and are deliberately
 * left with no recipe here. Only the compressed *_tumblestone_block is craftable
 * from its matching shard, exactly like amethyst_block from amethyst shards.
 *
 * Fossils (and the combined fossilized_* revival items) are dug up via archaeology
 * and deliberately have NO crafting recipe - making them craftable would trivialise
 * fossil Pokemon revival and clash with the pack's dig-it-up flavour. The Fossil
 * Analyzer machine itself and the Eject Button held item are unrelated utility/
 * accessory items and are craftable as normal.
 */
const registerCobblemonWoodFossilRecipes = (event) => {

	//#region Apricorn seeds - extracted from the matching apricorn

	global.COBBLEMON_APRICORN_SEEDS = [
		['cobblemon:black_apricorn', 'cobblemon:black_apricorn_seed'],
		['cobblemon:blue_apricorn', 'cobblemon:blue_apricorn_seed'],
		['cobblemon:green_apricorn', 'cobblemon:green_apricorn_seed'],
		['cobblemon:pink_apricorn', 'cobblemon:pink_apricorn_seed'],
		['cobblemon:red_apricorn', 'cobblemon:red_apricorn_seed'],
		['cobblemon:white_apricorn', 'cobblemon:white_apricorn_seed'],
		['cobblemon:yellow_apricorn', 'cobblemon:yellow_apricorn_seed']
	]

	global.COBBLEMON_APRICORN_SEEDS.forEach(([apricorn, seed]) => {
		event.shapeless(seed, [apricorn])
			.id(`tfg:shapeless/${global.linuxUnfucker(seed)}`)
	})

	// Miracle Seed - a grass-type held accessory, copper bench tier like the other
	// small trinkets. A green (grass-flavoured) apricorn seed bound in copper wire.
	event.shapeless('cobblemon:miracle_seed', [
		'cobblemon:green_apricorn_seed',
		'#forge:plates/copper',
		'#forge:string'
	]).id('tfg:shapeless/miracle_seed')

	//#endregion

	//#region Tumblestones - mirrors vanilla's amethyst geode

	// Only the compressed block is craftable, exactly like amethyst_block from
	// amethyst shards. The raw shard, the cluster, and all three budding stages
	// are worldgen/mining only and get no recipe.
	event.shaped('cobblemon:tumblestone_block', [
		'AA',
		'AA'
	], {
		A: 'cobblemon:tumblestone'
	}).id('tfg:shaped/tumblestone_block')

	event.shaped('cobblemon:sky_tumblestone_block', [
		'AA',
		'AA'
	], {
		A: 'cobblemon:sky_tumblestone'
	}).id('tfg:shaped/sky_tumblestone_block')

	event.shaped('cobblemon:black_tumblestone_block', [
		'AA',
		'AA'
	], {
		A: 'cobblemon:black_tumblestone'
	}).id('tfg:shaped/black_tumblestone_block')

	//#endregion

	//#region Fossil utility items

	// Fossil Analyzer - the revival machine, and one half of the fossil system
	// (the Restoration Tank in recipes.utility.js is the other). It had only the
	// LV assembler route below, which put the entire fossil line behind
	// electricity even though the fossils themselves are dug up by hand in the
	// stone age. This bench recipe is the hand route, at the same tin-alloy tier
	// as the PC, healing machine and data monitor: a stone housing with an
	// amethyst lens over a lit glass plate, wired to a redstone readout.
	event.shaped('cobblemon:fossil_analyzer', [
		'SAS',
		'PGP',
		'SRS'
	], {
		S: '#forge:stone',
		A: 'minecraft:amethyst_shard',
		P: '#forge:plates/tin_alloy',
		G: '#forge:glass',
		R: 'minecraft:redstone'
	}).id('tfg:shaped/fossil_analyzer')

	// The LV route, for automation.
	event.recipes.gtceu.assembler('tfg:fossil_analyzer')
		.itemInputs('4x #forge:plates/aluminium', '2x #gtceu:circuits/lv', '#forge:glass')
		.itemOutputs('cobblemon:fossil_analyzer')
		.duration(400)
		.EUt(GTValues.VA[GTValues.LV])

	// Eject Button - a small held accessory, copper bench tier: a spring behind a
	// copper plate.
	event.shapeless('cobblemon:eject_button', [
		'#forge:plates/copper',
		'#forge:small_springs'
	]).id('tfg:shapeless/eject_button')

	// Peat Block - compressed from the tfg intermediate peat bricks already used
	// elsewhere in this pack, like a hay bale from wheat.
	event.shaped('cobblemon:peat_block', [
		'AA',
		'AA'
	], {
		A: 'tfg:dried_peat_brick'
	}).id('tfg:shaped/peat_block')

	//#endregion

}
