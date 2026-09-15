// priority: 0
"use strict";

/**
 * Tier 2/3 automation layer for the Cobblemon consumable families defined in
 * recipes.medicine.js and recipes.mints_mulch.js.
 *
 * Tier 1 (hand, in the two files above) is untouched. This file ADDS:
 *   Tier 2 - a GregTech machine route, same rough ingredient cost as the hand
 *            recipe, so it is automatable but not cheaper.
 *   Tier 3 - a later-game, higher-voltage BULK recipe that produces several
 *            of an item per run for cheaper per-unit cost. Only added for
 *            families players actually mass-produce; see the per-section
 *            notes and the final report for what was deliberately skipped.
 *
 * Machine choices:
 *   Potions/medicine  - mixer (potions are literally mixtures); bottle stays
 *                       in the recipe as the container, per the hand recipes.
 *   Vitamins/candies   - mixer (sugar-coating / blending powders into food).
 *   Feathers           - mixer (feather + reagent, same shape as hand).
 *   X-items            - mixer (TFG medicine powder + effect herbs, a blend).
 *   Mints/mulch        - mixer (leaf/base + reagent blend).
 *   Berries            - one extractor "juicer" recipe, see that section.
 *
 * Voltage ladder: tier 2 sits at ULV/LV depending on how deep in its chain the
 * item is (matches the hand recipes' own escalating cost), tier 3 sits one
 * voltage step above its tier 2 counterpart.
 */
const registerCobblemonConsumableAutomation = (event) => {

	//#region Medicine / potions - tier 2 mixer

	// [output item, itemInputs array (mirrors the hand recipe), EUt tier]
	const medicineMachine = [
		// Heal powder is milled revival herb now, blended with the same two TFG
		// effect-ingredient tags recovery powder uses - see the mixing bowl
		// route in recipes.medicine.js.
		['heal_powder', ['cobblemon:revival_herb', '#tfg:instant_health_ingredients', '#tfg:regeneration_ingredients'], GTValues.ULV],
		['potion', ['cobblemon:heal_powder', 'cobblemon:oran_berry', '#tfc:glass_bottles'], GTValues.ULV],
		['super_potion', ['cobblemon:potion', 'minecraft:sugar', 'tfc:powder/wood_ash', '#tfc:glass_bottles'], GTValues.ULV],
		['hyper_potion', ['cobblemon:super_potion', '#tfc:foods/dairy', '#tfc:glass_bottles'], GTValues.LV],
		['max_potion', ['cobblemon:hyper_potion', '#forge:dusts/silver', 'cobblemon:sitrus_berry', '#tfc:glass_bottles'], GTValues.LV],

		['remedy', ['#minecraft:flowers', 'tfc:powder/salt', '#tfc:glass_bottles'], GTValues.ULV],
		['superb_remedy', ['cobblemon:remedy', 'cobblemon:lum_berry', '#tfc:glass_bottles'], GTValues.ULV],
		['fine_remedy', ['cobblemon:superb_remedy', 'firmalife:raw_honey', '#tfc:glass_bottles'], GTValues.LV],

		['ether', ['minecraft:sugar', 'tfc:powder/soda_ash', 'cobblemon:leppa_berry', '#tfc:glass_bottles'], GTValues.ULV],
		['max_ether', ['cobblemon:ether', '#forge:dusts/silver', '#tfc:glass_bottles'], GTValues.LV],
		['elixir', ['cobblemon:potion', 'cobblemon:ether', '#tfc:glass_bottles'], GTValues.LV],
		['max_elixir', ['cobblemon:max_potion', 'cobblemon:max_ether', '#tfc:glass_bottles'], GTValues.MV],

		// Cobblemon's own revive recipe: heal powder and honey.
		['revive', ['cobblemon:heal_powder', 'firmalife:jar/honey'], GTValues.ULV],
		['max_revive', ['cobblemon:revive', 'cobblemon:max_potion', '#tfc:glass_bottles'], GTValues.MV],

		['antidote', ['#minecraft:flowers', 'cobblemon:pecha_berry', '#tfc:glass_bottles'], GTValues.ULV],
		['awakening', ['#minecraft:flowers', 'cobblemon:chesto_berry', '#tfc:glass_bottles'], GTValues.ULV],
		['burn_heal', ['#minecraft:flowers', 'cobblemon:rawst_berry', '#tfc:glass_bottles'], GTValues.ULV],
		['ice_heal', ['#minecraft:flowers', 'cobblemon:aspear_berry', '#tfc:glass_bottles'], GTValues.ULV],
		['paralyze_heal', ['#minecraft:flowers', 'cobblemon:cheri_berry', '#tfc:glass_bottles'], GTValues.ULV],
		['full_heal', ['cobblemon:pecha_berry', 'cobblemon:chesto_berry', 'cobblemon:rawst_berry', 'cobblemon:aspear_berry', 'cobblemon:cheri_berry', '#tfc:glass_bottles'], GTValues.LV],

		['medicinal_brew', ['#minecraft:flowers', 'firmalife:raw_honey', 'tfc:powder/salt', 'cobblemon:oran_berry', '#tfc:glass_bottles'], GTValues.LV],
		['full_restore', ['cobblemon:max_potion', 'cobblemon:full_heal', '#tfc:glass_bottles'], GTValues.MV]
	]

	medicineMachine.forEach(([item, inputs, tier]) => {
		event.recipes.gtceu.mixer(`tfg:automation/mixer/${item}`)
			.itemInputs(inputs)
			.itemOutputs(`cobblemon:${item}`)
			.duration(100)
			.EUt(GTValues.VA[tier])
	})

	// Tier 3 - bulk, one voltage step up, 4x output. Only the common, cheap,
	// genuinely mass-produced ones: potion, super_potion, remedy, heal_powder
	// and the five status cures. The rare top-tier items (full_restore,
	// max_revive, max_elixir) deliberately get none - nobody farms those.
	const medicineBulk = [
		['heal_powder', ['4x cobblemon:revival_herb', '4x #tfg:instant_health_ingredients', '4x #tfg:regeneration_ingredients'], GTValues.LV],
		['potion', ['4x cobblemon:heal_powder', '4x cobblemon:oran_berry', '4x #tfc:glass_bottles'], GTValues.LV],
		['super_potion', ['4x cobblemon:potion', '4x minecraft:sugar', '4x tfc:powder/wood_ash', '4x #tfc:glass_bottles'], GTValues.LV],
		['remedy', ['4x #minecraft:flowers', '4x tfc:powder/salt', '4x #tfc:glass_bottles'], GTValues.LV],
		['antidote', ['4x #minecraft:flowers', '4x cobblemon:pecha_berry', '4x #tfc:glass_bottles'], GTValues.LV],
		['awakening', ['4x #minecraft:flowers', '4x cobblemon:chesto_berry', '4x #tfc:glass_bottles'], GTValues.LV],
		['burn_heal', ['4x #minecraft:flowers', '4x cobblemon:rawst_berry', '4x #tfc:glass_bottles'], GTValues.LV],
		['ice_heal', ['4x #minecraft:flowers', '4x cobblemon:aspear_berry', '4x #tfc:glass_bottles'], GTValues.LV],
		['paralyze_heal', ['4x #minecraft:flowers', '4x cobblemon:cheri_berry', '4x #tfc:glass_bottles'], GTValues.LV]
	]

	medicineBulk.forEach(([item, inputs, tier]) => {
		event.recipes.gtceu.mixer(`tfg:automation/mixer_bulk/${item}`)
			.itemInputs(inputs)
			.itemOutputs(`4x cobblemon:${item}`)
			.duration(100)
			.EUt(GTValues.VA[tier])
	})

	//#endregion

	//#region Vitamins, candies, X-items, feathers - tier 2 mixer

	const vitaminMachine = [
		['protein', ['tfc:food/beef', '#tfc:foods/dairy'], GTValues.ULV],
		['iron', ['#forge:dusts/iron', 'minecraft:sugar'], GTValues.ULV],
		['calcium', ['minecraft:bone_meal', '#tfc:foods/dairy'], GTValues.ULV],
		['zinc', ['#forge:dusts/zinc', 'minecraft:sugar'], GTValues.ULV],
		['carbos', ['tfc:food/potato', 'minecraft:sugar'], GTValues.ULV],
		['hp_up', ['cobblemon:protein', 'cobblemon:calcium', 'minecraft:sugar'], GTValues.LV],
		['pp_up', ['minecraft:sugar', 'firmalife:raw_honey'], GTValues.ULV],
		['pp_max', ['cobblemon:pp_up', '#forge:dusts/silver'], GTValues.LV],
		// Rare candy gets a machine route but no bulk tier - it stays the
		// pricey top-tier item on purpose.
		['rare_candy', ['4x minecraft:sugar', 'firmalife:raw_honey', '2x #forge:dusts/silver'], GTValues.LV]
	]

	vitaminMachine.forEach(([item, inputs, tier]) => {
		event.recipes.gtceu.mixer(`tfg:automation/mixer/${item}`)
			.itemInputs(inputs)
			.itemOutputs(`cobblemon:${item}`)
			.duration(100)
			.EUt(GTValues.VA[tier])
	})

	// Exp candy chain - tier 2 mixer, mirrors the hand recipe's escalation.
	const expCandyMachine = [
		['exp_candy_xs', ['minecraft:sugar', 'minecraft:bone_meal'], GTValues.ULV],
		['exp_candy_s', ['cobblemon:exp_candy_xs', 'cobblemon:mago_berry'], GTValues.ULV],
		['exp_candy_m', ['cobblemon:exp_candy_s', '#forge:dusts/iron'], GTValues.ULV],
		['exp_candy_l', ['cobblemon:exp_candy_m', '#forge:dusts/silver'], GTValues.LV],
		['exp_candy_xl', ['cobblemon:exp_candy_l', 'tfc:powder/lapis_lazuli'], GTValues.LV]
	]

	expCandyMachine.forEach(([item, inputs, tier]) => {
		event.recipes.gtceu.mixer(`tfg:automation/mixer/${item}`)
			.itemInputs(inputs)
			.itemOutputs(`cobblemon:${item}`)
			.duration(100)
			.EUt(GTValues.VA[tier])
	})

	// Feathers - mirrors the hand recipes in recipes.medicine.js: the feather, the
	// berry for the stat that feather trains, and the TFG effect-ingredient tag
	// for the matching effect.
	// [item, berry, TFG effect-ingredient tag or dust]
	const featherMachine = [
		['muscle_feather', 'cobblemon:figy_berry', '#tfg:strength_ingredients'],
		['genius_feather', 'cobblemon:wiki_berry', '#tfg:haste_ingredients'],
		['swift_feather', 'cobblemon:mago_berry', '#tfg:speed_ingredients'],
		['clever_feather', 'cobblemon:aguav_berry', '#tfg:absorption_ingredients'],
		['resist_feather', 'cobblemon:iapapa_berry', '#tfg:resistance_ingredients'],
		['health_feather', 'cobblemon:oran_berry', '#tfg:instant_health_ingredients'],
		['fairy_feather', 'cobblemon:persim_berry', '#forge:dusts/glowstone']
	]

	featherMachine.forEach(([item, berry, reagent]) => {
		event.recipes.gtceu.mixer(`tfg:automation/mixer/${item}`)
			.itemInputs(['minecraft:feather', berry, reagent])
			.itemOutputs(`cobblemon:${item}`)
			.duration(100)
			.EUt(GTValues.VA[GTValues.ULV])
	})

	// X-items - shared shape, one mixer entry each. Mirrors the hand recipes in
	// recipes.medicine.js: a TerraFirmaGreg medicine powder plus the TFG
	// effect-ingredient tag for the stat that X-item raises.
	// [item, TFG powder, TFG effect-ingredient tag]
	const X_ITEM_INPUTS = [
		['x_attack', 'tfg:combat_powder', '#tfg:strength_ingredients'],
		['x_defence', 'tfg:combat_powder', '#tfg:resistance_ingredients'],
		['x_speed', 'tfg:acrobat_powder', '#tfg:speed_ingredients'],
		['x_special_attack', 'tfg:mining_powder', '#tfg:haste_ingredients'],
		['x_special_defence', 'tfg:recovery_powder', '#tfg:absorption_ingredients'],
		['x_accuracy', 'tfg:mining_powder', '#tfg:night_vision_ingredients'],
		['dire_hit', 'tfg:combat_powder', '#tfg:luck_ingredients'],
		['guard_spec', 'tfg:recovery_powder', '#tfg:resistance_ingredients']
	]

	X_ITEM_INPUTS.forEach(([item, powder, herbs]) => {
		event.recipes.gtceu.mixer(`tfg:automation/mixer/${item}`)
			.itemInputs([powder, herbs])
			.itemOutputs(`cobblemon:${item}`)
			.duration(100)
			.EUt(GTValues.VA[GTValues.ULV])
	})

	// Tier 3 - bulk, one voltage step up, 4x output. Only the cheap,
	// high-volume families: exp candies and every x-item (battle boosters
	// players burn through fast). Rare candy, and the base vitamins/hp_up/
	// pp_up/pp_max/feathers, are trained one Pokemon at a time and are left
	// without a bulk tier to avoid EMI clutter for something nobody stockpiles.
	const expCandyBulk = [
		['exp_candy_xs', ['4x minecraft:sugar', '4x minecraft:bone_meal'], GTValues.LV],
		['exp_candy_s', ['4x cobblemon:exp_candy_xs', '4x cobblemon:mago_berry'], GTValues.LV],
		['exp_candy_m', ['4x cobblemon:exp_candy_s', '4x #forge:dusts/iron'], GTValues.LV],
		['exp_candy_l', ['4x cobblemon:exp_candy_m', '4x #forge:dusts/silver'], GTValues.MV],
		['exp_candy_xl', ['4x cobblemon:exp_candy_l', '4x tfc:powder/lapis_lazuli'], GTValues.MV]
	]

	expCandyBulk.forEach(([item, inputs, tier]) => {
		event.recipes.gtceu.mixer(`tfg:automation/mixer_bulk/${item}`)
			.itemInputs(inputs)
			.itemOutputs(`4x cobblemon:${item}`)
			.duration(100)
			.EUt(GTValues.VA[tier])
	})

	// Same eight pairings as the tier 2 block above, four at a time.
	X_ITEM_INPUTS.forEach(([item, powder, herbs]) => {
		event.recipes.gtceu.mixer(`tfg:automation/mixer_bulk/${item}`)
			.itemInputs([`4x ${powder}`, `4x ${herbs}`])
			.itemOutputs(`4x cobblemon:${item}`)
			.duration(100)
			.EUt(GTValues.VA[GTValues.LV])
	})

	//#endregion

	//#region Mints and mulch - tier 2 mixer, tier 3 for mulch and mint leaves/seeds

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

		event.recipes.gtceu.mixer(`tfg:automation/mixer/${colour}_mint_leaf`)
			.itemInputs(['#minecraft:leaves', reagent])
			.itemOutputs(`2x cobblemon:${colour}_mint_leaf`)
			.duration(100)
			.EUt(GTValues.VA[GTValues.ULV])

		event.recipes.gtceu.mixer(`tfg:automation/mixer/${colour}_mint_seeds`)
			.itemInputs(['#forge:seeds', reagent])
			.itemOutputs(`2x cobblemon:${colour}_mint_seeds`)
			.duration(100)
			.EUt(GTValues.VA[GTValues.ULV])

		// Tier 3 - bulk leaves/seeds. These feed the whole 21-nature mint
		// family plus TFC farming, so stocking up in bulk is genuinely useful,
		// unlike any single finished nature (see note below).
		event.recipes.gtceu.mixer(`tfg:automation/mixer_bulk/${colour}_mint_leaf`)
			.itemInputs(['4x #minecraft:leaves', `4x ${reagent}`])
			.itemOutputs(`8x cobblemon:${colour}_mint_leaf`)
			.duration(100)
			.EUt(GTValues.VA[GTValues.LV])

		event.recipes.gtceu.mixer(`tfg:automation/mixer_bulk/${colour}_mint_seeds`)
			.itemInputs(['4x #forge:seeds', `4x ${reagent}`])
			.itemOutputs(`8x cobblemon:${colour}_mint_seeds`)
			.duration(100)
			.EUt(GTValues.VA[GTValues.LV])
	})

	// Nature mints - tier 2 mixer only, one leaf + one powder, same shape as
	// the hand recipe. No tier 3: a player only ever wants the ONE nature
	// they are breeding/training for, never all 21 at once, so a bulk
	// recipe per nature would be 21 extra EMI entries for a family that is
	// never actually mass-produced - the bulk demand lives one level down,
	// in the mint leaves/seeds tier above.
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

		event.recipes.gtceu.mixer(`tfg:automation/mixer/${nature}_mint`)
			.itemInputs([`cobblemon:${colour}_mint_leaf`, powder])
			.itemOutputs(`cobblemon:${nature}_mint`)
			.duration(100)
			.EUt(GTValues.VA[GTValues.ULV])
	})

	// Mulches - bulk agricultural material, tier 2 mixer AND a generous
	// tier 3 bulk (both make sense per the brief).
	event.recipes.gtceu.mixer('tfg:automation/mixer/mulch_base')
		.itemInputs(['tfc:compost', '#tfc:dirt'])
		.itemOutputs('4x cobblemon:mulch_base')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])

	event.recipes.gtceu.mixer('tfg:automation/mixer_bulk/mulch_base')
		.itemInputs(['4x tfc:compost', '4x #tfc:dirt'])
		.itemOutputs('16x cobblemon:mulch_base')
		.duration(100)
		.EUt(GTValues.VA[GTValues.LV])

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
		const reagent = MULCH_REAGENTS[mulch]

		event.recipes.gtceu.mixer(`tfg:automation/mixer/${mulch}`)
			.itemInputs(['cobblemon:mulch_base', reagent])
			.itemOutputs(`4x cobblemon:${mulch}`)
			.duration(100)
			.EUt(GTValues.VA[GTValues.ULV])

		event.recipes.gtceu.mixer(`tfg:automation/mixer_bulk/${mulch}`)
			.itemInputs(['4x cobblemon:mulch_base', `4x ${reagent}`])
			.itemOutputs(`16x cobblemon:${mulch}`)
			.duration(100)
			.EUt(GTValues.VA[GTValues.LV])
	})

	//#endregion

	//#region Berries - one extractor "juicer" recipe

	// The pack has ~60 registered berries (#forge:berries covers all of them,
	// Cobblemon's and vanilla's) and cobblemon:berry_juice is a registered
	// item with no crafting recipe anywhere in the pack yet. An extractor
	// turning any berry into juice is the one machine route that genuinely
	// fits: it is exactly what the GTCEu extractor already does elsewhere in
	// this pack (item -> item "juicer", see tfg:sugar_from_honey and the
	// wraptor egg juice recipes in recipes.mars.js) and gives berry farming
	// an automatable sink instead of only stockpiling raw berries.
	//
	// A macerator route into a berry "dust" was deliberately NOT added: no
	// recipe anywhere in the pack (hand or machine) consumes such a dust, so
	// it would be a dead-end item existing only to clutter EMI.
	event.recipes.gtceu.extractor('tfg:automation/extractor/berry_juice')
		.itemInputs('#forge:berries')
		.itemOutputs('cobblemon:berry_juice')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])

	//#endregion

}
