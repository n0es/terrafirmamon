// priority: 0
"use strict";

/**
 * Pass 2 automation layer: Create/GregTech routes for the type gem family, the
 * apricorn wood family, held items/gear, and evolution stones.
 *
 * This file ADDS to the existing tier-1 hand recipes in recipes.held_items.js,
 * recipes.utility.js and recipes.wood_fossils.js - it does not touch them. Every
 * item produced below already has a tier-1 bench recipe elsewhere; this only
 * gives it a machine (tier 2) and, where mass production actually makes sense
 * (tier 3) route. All ids are namespaced under tfg:automation/gear/... to stay
 * unique against every other agent's tfg:automation/... ids.
 *
 * NOTE: no spread operator anywhere in this file. KubeJS runs on Rhino, which
 * does not support ES6 spread - `.itemInputs(...arr)` is a silent, whole-file
 * killing syntax error that `node --check` will not catch. Arrays are always
 * passed directly.
 */
const registerCobblemonGearAutomation = (event) => {

	//#region 1. Type gems - GT forming_press, copper-age shape from recipes.held_items.js

	// Mirrors the tier-1 shapeless recipe exactly (2x quartzite gem + themed
	// item), just run through a forming press instead of a crafting bench.
	const TYPE_GEMS = [
		['cobblemon:bug_gem', 'minecraft:cobweb'],
		['cobblemon:dark_gem', '#forge:dyes/black'],
		['cobblemon:dragon_gem', 'minecraft:ender_pearl'],
		['cobblemon:electric_gem', 'minecraft:redstone'],
		['cobblemon:fairy_gem', '#forge:dusts/glowstone'],
		['cobblemon:fighting_gem', 'minecraft:bone'],
		['cobblemon:fire_gem', 'minecraft:charcoal'],
		['cobblemon:flying_gem', '#forge:feathers'],
		['cobblemon:ghost_gem', 'minecraft:glow_ink_sac'],
		['cobblemon:grass_gem', 'minecraft:bone_meal'],
		['cobblemon:ground_gem', '#forge:sand'],
		['cobblemon:ice_gem', 'minecraft:blue_ice'],
		['cobblemon:normal_gem', '#minecraft:wool'],
		['cobblemon:poison_gem', 'minecraft:spider_eye'],
		['cobblemon:psychic_gem', '#forge:gems/certus_quartz'],
		['cobblemon:rock_gem', '#forge:cobblestone'],
		['cobblemon:steel_gem', '#forge:plates/steel'],
		['cobblemon:water_gem', 'tfc:plant/leafy_kelp'],
	]

	TYPE_GEMS.forEach(([gem, themed]) => {
		const name = gem.split(':')[1]

		// Tier 2 - single gem per press cycle, ULV like the wood lathe/support builds.
		event.recipes.gtceu.forming_press(`tfg:automation/gear/gem/tier2/${name}`)
			.itemInputs(['2x #forge:gems/quartzite', themed])
			.itemOutputs(gem)
			.duration(100)
			.EUt(GTValues.VA[GTValues.ULV])

		// Tier 3 - batch press, LV, four gems for three themed items instead of
		// four (25% cheaper themed material per gem) since off-cuts are reused.
		event.recipes.gtceu.forming_press(`tfg:automation/gear/gem/tier3/${name}`)
			.itemInputs(['6x #forge:gems/quartzite', `3x ${themed}`])
			.itemOutputs(`4x ${gem}`)
			.duration(160)
			.EUt(GTValues.VA[GTValues.LV])
	})

	//#endregion

	//#region 2. Cobblemon wood family - handled by the pack's own wood builder

	// Apricorn and saccharine wood used to have a parallel GT line here: cutter
	// recipes for planks/slab/stairs and assembler recipes for the rest, all built
	// straight from planks. They are gone because both families now run through
	// TFGWoodBuilder (Cobblemon region of tfg/natural_blocks/recipes.wood.js),
	// which generates the same machine steps the rest of the pack's wood uses -
	// cutter log -> lumber, packer plank -> lumber, cutter plank -> slab, assembler
	// pressure plate, cutter pressure plate -> button.
	//
	// Keeping both would have been a GT recipe conflict, not just duplication: the
	// old 'planks_from_log' cutter recipe took the same input with no circuit as
	// the builder's log -> lumber recipe.

	const ULV = GTValues.VA[GTValues.ULV]
	const LV = GTValues.VA[GTValues.LV]

	//#endregion

	//#region 3. Held items and gear - GT assembler, driven from data arrays

	// Battle accessories (recipes.held_items.js BATTLE_ACCESSORIES) - LV.
	const BATTLE_ACCESSORIES = [
		['cobblemon:choice_band', ['#forge:leather', '#forge:plates/wrought_iron']],
		['cobblemon:choice_scarf', ['#forge:cloth', '#forge:plates/wrought_iron']],
		['cobblemon:choice_specs', ['#forge:glass_panes', '#forge:plates/wrought_iron']],
		['cobblemon:focus_band', ['#forge:leather', '#forge:plates/copper']],
		['cobblemon:expert_belt', ['#forge:leather', '#forge:plates/steel']],
		['cobblemon:muscle_band', ['#forge:leather', '#forge:rods/wrought_iron']],
		['cobblemon:quick_claw', ['#forge:plates/copper', 'minecraft:gunpowder']],
		['cobblemon:razor_claw', ['#forge:plates/wrought_iron', 'minecraft:flint']],
		['cobblemon:razor_fang', ['#forge:rods/wrought_iron', 'minecraft:bone']],
		['cobblemon:kings_rock', ['#tfc:rock_knapping', '#forge:plates/brass']],
		['cobblemon:life_orb', ['minecraft:redstone', '#forge:glass', 'tfc:powder/sulfur']],
		['cobblemon:flame_orb', ['minecraft:charcoal', '#forge:glass', 'tfc:powder/sulfur']],
		['cobblemon:toxic_orb', ['minecraft:spider_eye', '#forge:glass', 'tfc:powder/sulfur']],
		['cobblemon:shell_bell', ['firmalife:hollow_shell', '#forge:plates/brass']],
		['cobblemon:soothe_bell', ['#forge:plates/brass', '#minecraft:wool']],
		['cobblemon:lucky_egg', ['#forge:eggs', '#forge:plates/brass']],
	]

	// Elemental held items (recipes.held_items.js ELEMENTAL_HELD_ITEMS) - LV.
	const ELEMENTAL_HELD_ITEMS = [
		['cobblemon:magnet', ['#forge:plates/copper', '#tfc:magnetic_rocks']],
		['cobblemon:mystic_water', ['#forge:plates/copper', 'tfc:plant/leafy_kelp']],
		['cobblemon:never_melt_ice', ['#forge:plates/copper', 'minecraft:packed_ice']],
		['cobblemon:sharp_beak', ['#forge:feathers', 'minecraft:flint']],
		['cobblemon:silk_scarf', ['tfc:silk_cloth', '#forge:string']],
		['cobblemon:soft_sand', ['#forge:sand', 'minecraft:clay']],
		['cobblemon:twisted_spoon', ['#forge:plates/copper', 'firmalife:spoon']],
		['cobblemon:black_belt', ['#forge:leather', '#forge:dyes/black']],
		['cobblemon:black_glasses', ['minecraft:glass_pane', '#forge:dyes/black']],
		['cobblemon:hard_stone', ['2x #tfc:rock_knapping', '#forge:cobblestone']],
		['cobblemon:metal_coat', ['#forge:plates/steel', '#forge:plates/copper']],
		['cobblemon:poison_barb', ['tfc:powder/sulfur', 'minecraft:flint']],
		['cobblemon:spell_tag', ['minecraft:paper', '#forge:dyes/black']],
		['cobblemon:dragon_fang', ['2x minecraft:bone', 'minecraft:flint']],
	]

	// Weather rocks (recipes.held_items.js WEATHER_ROCKS) - LV.
	const WEATHER_ROCKS = [
		['cobblemon:damp_rock', ['#tfc:rock_knapping', 'tfc:plant/leafy_kelp']],
		['cobblemon:heat_rock', ['#tfc:rock_knapping', 'minecraft:charcoal']],
		['cobblemon:icy_rock', ['#tfc:rock_knapping', 'minecraft:ice']],
		['cobblemon:smooth_rock', ['#tfc:rock_knapping', '#forge:smooth_stone']],
	]

	// Power/training items - both the held_items.js trio and the utility.js
	// steel-age trio are the same "family" for automation purposes - LV.
	const POWER_ITEMS = [
		['cobblemon:power_band', ['#forge:rods/wrought_iron', '#forge:plates/wrought_iron']],
		['cobblemon:power_belt', ['#forge:rods/steel', '#forge:plates/steel']],
		['cobblemon:power_lens', ['tfc:lens', '#forge:rods/wrought_iron']],
		['cobblemon:power_anklet', ['#forge:plates/steel', '#forge:cloth', '#forge:string']],
		['cobblemon:power_bracer', ['#forge:double_plates/steel', '#forge:cloth', '#forge:string']],
		['cobblemon:power_weight', ['2x #forge:double_plates/steel', '#forge:cloth']],
	]

	// Misc held/breeding items (recipes.held_items.js MISC_HELD_ITEMS) - LV.
	const MISC_HELD_ITEMS = [
		['cobblemon:binding_band', ['#forge:leather', '#forge:string']],
		['cobblemon:bright_powder', ['minecraft:glowstone', 'tfc:powder/salt']],
		['cobblemon:cleanse_tag', ['minecraft:paper', 'tfc:powder/salt']],
		['cobblemon:deep_sea_scale', ['#forge:plates/tin_alloy', 'tfc:plant/leafy_kelp']],
		['cobblemon:dragon_scale', ['#forge:plates/wrought_iron', 'minecraft:ender_pearl']],
		['cobblemon:float_stone', ['tfc:groundcover/pumice', '#tfc:rock_knapping']],
		['cobblemon:heavy_duty_boots', ['#forge:leather', '#forge:rods/steel']],
		['cobblemon:iron_ball', ['2x #forge:plates/wrought_iron']],
		['cobblemon:light_ball', ['#forge:eggs', 'minecraft:redstone']],
		['cobblemon:metal_powder', ['2x gtceu:iron_dust']],
		['cobblemon:oval_stone', ['#tfc:rock_knapping', '#forge:eggs']],
		['cobblemon:prism_scale', ['#forge:glass', '#forge:dyes/blue']],
		['cobblemon:quick_powder', ['2x gtceu:magnesium_dust']],
		['cobblemon:silver_powder', ['2x #forge:dusts/silver']],
		['cobblemon:smoke_ball', ['#minecraft:wool', 'minecraft:gunpowder']],
		['cobblemon:sticky_barb', ['tfc:glue', 'minecraft:flint']],
		['cobblemon:wise_glasses', ['minecraft:glass_pane', 'minecraft:paper']],
	]

	// Held/utility gear - copper age (recipes.utility.js) - ULV, matches its
	// tier-1 bench cost.
	const COPPER_AGE_GEAR = [
		['cobblemon:destiny_knot', ['2x #forge:string', '#forge:dyes/red']],
		['cobblemon:everstone', ['minecraft:flint', '#tfc:rock_knapping']],
		['cobblemon:charcoal_stick', ['minecraft:charcoal', '#forge:rods/wooden']],
		['cobblemon:focus_sash', ['#forge:cloth', '#forge:string']],
		['cobblemon:leftovers', ['#tfc:foods/vegetables', '#tfc:foods/meats', '#forge:cloth']],
		['cobblemon:absorb_bulb', ['#forge:glass', '#forge:dusts/calcite']],
	]

	// Held/utility gear - iron age (recipes.utility.js COBBLEMON_IRON_AGE_GEAR) - LV.
	const IRON_AGE_GEAR = [
		['cobblemon:air_balloon', ['#forge:plates/wrought_iron', 'waterflasks:bladder', '#forge:string']],
		['cobblemon:blunder_policy', ['#forge:plates/wrought_iron', 'minecraft:paper', '#forge:dyes/gray']],
		['cobblemon:covert_cloak', ['#forge:plates/wrought_iron', '#forge:cloth', '#forge:dyes/black']],
		['cobblemon:loaded_dice', ['#forge:plates/wrought_iron', '#forge:bones', '#forge:string']],
		['cobblemon:red_card', ['#forge:dyes/red', '#forge:plates/cardboard']],
		['cobblemon:ring_target', ['#forge:plates/wrought_iron', '#forge:rings/wrought_iron', '#forge:dyes/red']],
		['cobblemon:weakness_policy', ['#forge:plates/wrought_iron', 'minecraft:paper', '#forge:dyes/white']],
	]

	// Held/utility gear - steel age (recipes.utility.js COBBLEMON_STEEL_AGE_GEAR,
	// shaped PSP/SCS/PSP - four plates, four seconds and one centre) - MV.
	const STEEL_AGE_GEAR = [
		['cobblemon:assault_vest', ['4x #forge:double_plates/steel', '4x #forge:cloth', '#forge:string']],
		['cobblemon:reaper_cloth', ['4x #forge:plates/steel', '4x #forge:cloth', '#forge:dyes/black']],
		['cobblemon:rocky_helmet', ['4x #forge:plates/steel', '4x #forge:stone', '#forge:string']],
		['cobblemon:safety_goggles', ['4x #forge:plates/steel', '4x #forge:cloth', '#forge:glass']],
	]

	// Evolution/held misc (recipes.utility.js) - MV, matches their tier-1 cost.
	const EVO_HELD_MISC = [
		['cobblemon:eviolite', ['#forge:gems/certus_quartz', '#forge:dusts/diamond']],
		['cobblemon:automaton_armor_trim_smithing_template', ['minecraft:paper', '#forge:plates/black_steel']],
		['cobblemon:black_sludge', ['#forge:dusts/dark_ash', '#forge:dusts/sulfur']],
	]

	const LV_FAMILIES = [BATTLE_ACCESSORIES, ELEMENTAL_HELD_ITEMS, WEATHER_ROCKS,
		POWER_ITEMS, MISC_HELD_ITEMS, IRON_AGE_GEAR]

	LV_FAMILIES.forEach(family => {
		family.forEach(([item, ingredients]) => {
			event.recipes.gtceu.assembler(`tfg:automation/gear/held/${item.split(':')[1]}`)
				.itemInputs(ingredients)
				.itemOutputs(item)
				.duration(100)
				.EUt(LV)
		})
	})

	COPPER_AGE_GEAR.forEach(([item, ingredients]) => {
		event.recipes.gtceu.assembler(`tfg:automation/gear/held/${item.split(':')[1]}`)
			.itemInputs(ingredients)
			.itemOutputs(item)
			.duration(80)
			.EUt(ULV)
	})

	const MV = GTValues.VA[GTValues.MV]

	STEEL_AGE_GEAR.forEach(([item, ingredients]) => {
		event.recipes.gtceu.assembler(`tfg:automation/gear/held/${item.split(':')[1]}`)
			.itemInputs(ingredients)
			.itemOutputs(item)
			.duration(150)
			.EUt(MV)
	})

	EVO_HELD_MISC.forEach(([item, ingredients]) => {
		event.recipes.gtceu.assembler(`tfg:automation/gear/held/${item.split(':')[1]}`)
			.itemInputs(ingredients)
			.itemOutputs(item)
			.duration(150)
			.EUt(MV)
	})

	// Ability items (recipes.utility.js) - already MV-flavoured (mv circuit +
	// diamond dust) at tier 1, so tier 2 is just the same build on a real
	// assembler. Deliberately NO tier 3: these rewrite a mon's ability and are
	// crafted a handful of times at most, never farmed by the dozen.
	event.recipes.gtceu.assembler('tfg:automation/gear/held/ability_capsule')
		.itemInputs(['#forge:plates/titanium', '#gtceu:circuits/mv', '#forge:dusts/diamond'])
		.itemOutputs('cobblemon:ability_capsule')
		.duration(200)
		.EUt(MV)

	event.recipes.gtceu.assembler('tfg:automation/gear/held/ability_shield')
		.itemInputs(['#forge:double_plates/titanium', '#gtceu:circuits/mv'])
		.itemOutputs('cobblemon:ability_shield')
		.duration(200)
		.EUt(MV)

	// Ability Patch consumes a whole Ability Capsule plus a nether star - a
	// late-game, one-at-a-time craft. No machine route: automating it would
	// just be automating the capsule (already covered above) plus punching a
	// button, so it is deliberately left hand-only.

	//#endregion

	//#region 3b. Evolution trade items - bulk tier 3 only

	// These are consumed one-per-evolution and a player with a full breeding
	// operation plausibly wants a dozen at once, unlike a held item that's
	// crafted once and kept forever. Tier 2 already exists as their tier-1
	// bench recipe is itself a GT assembler (recipes.utility.js
	// COBBLEMON_ELECTRONIC_EVOLUTION_ITEMS) or, for the organic ones, gets a
	// tier 2 above (kings_rock/metal_coat/deep_sea_scale in the LV families,
	// dragon_scale/oval_stone/prism_scale in MISC_HELD_ITEMS). This section
	// only adds the HV bulk run: 4 outputs per cycle at a themed-material
	// discount versus 4x the tier-2 recipe.
	const HV = GTValues.VA[GTValues.HV]

	const EVOLUTION_TRADE_BULK = [
		['cobblemon:electirizer', ['6x #forge:wires/copper', '3x #gtceu:circuits/lv', '6x minecraft:redstone']],
		['cobblemon:magmarizer', ['6x #forge:plates/copper', '3x #gtceu:circuits/lv', '3x minecraft:magma_cream']],
		['cobblemon:dubious_disc', ['3x #forge:plates/copper', '3x #gtceu:circuits/lv', '3x etched:blank_music_disc']],
		['cobblemon:kings_rock', ['3x #tfc:rock_knapping', '3x #forge:plates/brass']],
		['cobblemon:metal_coat', ['3x #forge:plates/steel', '3x #forge:plates/copper']],
		['cobblemon:deep_sea_scale', ['3x #forge:plates/tin_alloy', '3x tfc:plant/leafy_kelp']],
		['cobblemon:dragon_scale', ['3x #forge:plates/wrought_iron', '3x minecraft:ender_pearl']],
		['cobblemon:oval_stone', ['3x #tfc:rock_knapping', '3x #forge:eggs']],
		['cobblemon:prism_scale', ['3x #forge:glass', '3x #forge:dyes/blue']],
		['cobblemon:protector', ['3x #forge:plates/wrought_iron', '3x minecraft:leather']],
		['cobblemon:deep_sea_tooth', ['3x minecraft:flint', '3x #forge:dusts/calcite']],
		['cobblemon:sachet', ['3x #forge:cloth', '3x #forge:dyes/red']],
		['cobblemon:whipped_dream', ['3x tfc:wool', '3x firmalife:raw_honey']],
		['cobblemon:galarica_cuff', ['3x #forge:rods/wooden', '3x #forge:plates/copper']],
		['cobblemon:galarica_wreath', ['9x #forge:rods/wooden', '3x #forge:string']],
		['cobblemon:black_augurite', ['3x #forge:dusts/black_steel', '3x minecraft:flint']],
	]

	EVOLUTION_TRADE_BULK.forEach(([item, ingredients]) => {
		event.recipes.gtceu.assembler(`tfg:automation/gear/held/tier3/${item.split(':')[1]}`)
			.itemInputs(ingredients)
			.itemOutputs(`4x ${item}`)
			.duration(200)
			.EUt(HV)
	})

	//#endregion

	//#region 4. Evolution stones - GT assembler tier 2, bulk tier 3

	// Driven off global.COBBLEMON_EVOLUTION_STONES (constants.js), which maps
	// each stone to the GT gem it is pressed from. Mirrors the tier-1 shapeless
	// recipe (gem + flint) exactly.
	global.COBBLEMON_EVOLUTION_STONES.forEach(([stone, gem]) => {
		const name = stone.split(':')[1]

		event.recipes.gtceu.assembler(`tfg:automation/gear/evo/tier2/${name}`)
			.itemInputs([gem, 'minecraft:flint'])
			.itemOutputs(stone)
			.duration(120)
			.EUt(LV)

		// Bulk: 4 gems + 2 flint -> 4 stones (half the flint cost per stone).
		event.recipes.gtceu.assembler(`tfg:automation/gear/evo/tier3/${name}`)
			.itemInputs([`4x ${gem}`, '2x minecraft:flint'])
			.itemOutputs(`4x ${stone}`)
			.duration(200)
			.EUt(MV)
	})

	// Ice Stone is not in COBBLEMON_EVOLUTION_STONES (its tier-1 recipe uses
	// sapphire gem + actual ice as a tenth source, see recipes.js) - give it
	// the same tier 2/3 treatment directly.
	event.recipes.gtceu.assembler('tfg:automation/gear/evo/tier2/ice_stone')
		.itemInputs(['gtceu:sapphire_gem', 'minecraft:ice'])
		.itemOutputs('cobblemon:ice_stone')
		.duration(120)
		.EUt(LV)

	event.recipes.gtceu.assembler('tfg:automation/gear/evo/tier3/ice_stone')
		.itemInputs(['4x gtceu:sapphire_gem', '2x minecraft:ice'])
		.itemOutputs('4x cobblemon:ice_stone')
		.duration(200)
		.EUt(MV)

	//#endregion
}
