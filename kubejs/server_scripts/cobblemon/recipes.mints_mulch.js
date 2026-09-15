// priority: 0
"use strict";

/**
 * Nature mints, mint leaves/seeds, and soil mulches.
 *
 * Mints: mint SEEDS are the cheapest tier, a shapeless craft of the base seed tag
 * plus a colour-themed reagent. Now that VERIFIED_TAGS.txt confirms real dye tags
 * exist for all six colours (#forge:dyes/<colour>), every mint colour is crafted
 * with its actual matching dye instead of the earlier stand-ins (kelp for cyan,
 * pink sand for pink, a dye-making tag for green). Mint LEAVES mirror that exact
 * shape with the leaves tag standing in for the seed tag, so leaves and seeds
 * "rhyme" with each other colour-for-colour.
 *
 * The 21 nature mints all share one shape too: a single mint leaf plus one cheap
 * TFC powder. Colour and powder are picked by cycling two small themed lists against
 * the nature index (6 colours x 8 powders, period 24 > 21 natures), which guarantees
 * every nature gets a distinct ingredient pair with no shapeless recipe collisions,
 * while keeping the recipe trivially cheap and early-game (one leaf, one powder).
 *
 * Mulches: TFC compost is the backbone. mulch_base is compost + dirt, bulk-crafted
 * (x4) since mulches are meant to be spread generously. Every themed mulch is then
 * mulch_base plus one swapped-in cheap soil/garden reagent, also bulk (x4), keeping
 * the whole family a single rhyming shape true to the brief.
 */
const registerCobblemonMintsMulchRecipes = (event) => {

	//#region Mint leaves & seeds - TFC farming tier, six colours

	const MINT_COLOUR_REAGENTS = {
		blue: '#forge:dyes/blue',
		cyan: '#forge:dyes/cyan',
		green: '#forge:dyes/green',
		pink: '#forge:dyes/pink',
		red: '#forge:dyes/red',
		white: '#forge:dyes/white'
	}

	Object.keys(MINT_COLOUR_REAGENTS).forEach((colour) => {
		const reagent = MINT_COLOUR_REAGENTS[colour]

		// Leaf: the leaves tag plus the colour reagent.
		event.shapeless(`2x cobblemon:${colour}_mint_leaf`, [
			'#minecraft:leaves',
			reagent
		]).id(`tfg:shapeless/${colour}_mint_leaf`)

		// Seeds: same shape, the seed tag stands in for the leaves tag.
		event.shapeless(`2x cobblemon:${colour}_mint_seeds`, [
			'#forge:seeds',
			reagent
		]).id(`tfg:shapeless/${colour}_mint_seeds`)
	})

	//#endregion

	//#region Nature mints - one mint leaf + one cheap powder, all 21 natures

	const MINT_NATURE_COLOURS = ['blue', 'cyan', 'green', 'pink', 'red', 'white']
	const MINT_NATURE_POWDERS = [
		'tfc:powder/salt',
		'tfc:powder/saltpeter',
		'tfc:powder/wood_ash',
		'tfc:powder/kaolinite',
		'tfc:powder/soda_ash',
		'tfc:powder/sulfur',
		'tfc:powder/flux',
		'tfc:powder/charcoal'
	]
	const NATURES = [
		'adamant', 'bold', 'brave', 'calm', 'careful', 'gentle', 'hasty', 'impish',
		'jolly', 'lax', 'lonely', 'mild', 'modest', 'naive', 'naughty', 'quiet',
		'rash', 'relaxed', 'sassy', 'serious', 'timid'
	]

	NATURES.forEach((nature, i) => {
		const colour = MINT_NATURE_COLOURS[i % MINT_NATURE_COLOURS.length]
		const powder = MINT_NATURE_POWDERS[i % MINT_NATURE_POWDERS.length]

		event.shapeless(`cobblemon:${nature}_mint`, [
			`cobblemon:${colour}_mint_leaf`,
			powder
		]).id(`tfg:shapeless/${nature}_mint`)
	})

	//#endregion

	//#region Mulches - TFC compost tier, bulk-crafted

	// Base: compost plus dirt, the compost-heap starting point for every mulch.
	event.shapeless('4x cobblemon:mulch_base', [
		'tfc:compost',
		'#tfc:dirt'
	]).id('tfg:shapeless/mulch_base')

	const MULCH_REAGENTS = {
		coarse_mulch: 'tfc:straw',
		growth_mulch: '#forge:seeds',
		humid_mulch: 'tfc:groundcover/humus',
		loamy_mulch: 'tfc:dirt/loam',
		peat_mulch: 'tfg:dried_peat_brick',
		rich_mulch: 'gtceu:fertilizer',
		sandy_mulch: '#forge:sand',
		surprise_mulch: 'minecraft:gunpowder'
	}

	Object.keys(MULCH_REAGENTS).forEach((mulch) => {
		event.shapeless(`4x cobblemon:${mulch}`, [
			'cobblemon:mulch_base',
			MULCH_REAGENTS[mulch]
		]).id(`tfg:shapeless/${mulch}`)
	})

	//#endregion

}
