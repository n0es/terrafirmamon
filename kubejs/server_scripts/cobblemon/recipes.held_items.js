// priority: 0
"use strict";

/**
 * Cobblemon held items: type gems, elemental boosters, battle accessories,
 * power/training items, weather rocks and Milcery sweets.
 *
 * Tier logic: everything here is a small trinket, so nothing goes past
 * wrought iron/steel plates - there is no reason a held item should need
 * GT automation. Families that repeat the same shape (18 type gems, 4
 * weather rocks, 3 power items, 7 sweets, 14 elemental boosters) are driven
 * off data arrays and a single forEach loop, following the
 * global.COBBLEMON_APRICORN_BALLS pattern in recipes.js, instead of being
 * copy-pasted. Every entry below was checked against PROVEN_INGREDIENTS.txt
 * and VERIFIED_TAGS.txt, and every themed ingredient was chosen to actually
 * evoke the item's name/type rather than reused as filler.
 */
const registerCobblemonHeldItemRecipes = (event) => {

	//#region Type gems - copper age, one shared shape per type

	// Base gem stock cut down with a type-themed material. All 18 share the
	// exact same recipe shape; only the themed ingredient changes, and each
	// themed ingredient is picked to genuinely read as its type.
	const TYPE_GEMS = [
		['cobblemon:bug_gem', 'minecraft:cobweb'],
		['cobblemon:dark_gem', '#forge:dyes/black'],
		['cobblemon:dragon_gem', 'minecraft:ender_pearl'],
		['cobblemon:electric_gem', 'minecraft:redstone'],
		// Glowstone dust, not glow berries: glow berries only exist in this pack
		// via a Nether greenhouse, which is no place for a copper-age trinket.
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
		event.shapeless(gem, ['2x #forge:gems/quartzite', themed])
			.id(`tfg:shapeless/${global.linuxUnfucker(gem)}`)
	})

	//#endregion

	//#region Milcery sweets - stone age, sugar plus a flavour/colour item

	// Each sweet is named after a THING, so the second ingredient is that thing
	// rather than a dye of roughly the right colour. Three of these used to be
	// dyes or a block; they now take the material the sweet is actually made of,
	// and four of them take a tag so any member of the family works:
	//
	//   berry   - any berry at all (#cobblemon:berries covers all 70 Cobblemon
	//             berries), not specifically glow berries
	//   flower  - any flower, not yellow dye
	//   ribbon  - any cloth, not plain string
	//   star    - glowstone DUST, the sparkle; it used to demand the whole block,
	//             which is four dust for one sweet
	//   love    - cocoa powder, so it is a chocolate heart rather than red dye.
	//             Deliberately NOT a red berry: berry_sweet already takes any
	//             berry, and a red berry would match both recipes at once.
	const SWEETS = [
		['cobblemon:berry_sweet', '#cobblemon:berries'],
		['cobblemon:clover_sweet', '#minecraft:saplings'],
		['cobblemon:flower_sweet', '#minecraft:flowers'],
		['cobblemon:love_sweet', 'firmalife:food/cocoa_powder'],
		['cobblemon:ribbon_sweet', '#forge:cloth'],
		['cobblemon:star_sweet', '#forge:dusts/glowstone'],
		['cobblemon:strawberry_sweet', 'tfc:food/strawberry'],
	]

	SWEETS.forEach(([sweet, flavour]) => {
		event.shapeless(sweet, ['minecraft:sugar', flavour])
			.id(`tfg:shapeless/${global.linuxUnfucker(sweet)}`)
	})

	//#endregion

	//#region Elemental held items - copper/bronze bench, type-flavoured pair

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

	ELEMENTAL_HELD_ITEMS.forEach(([item, ingredients]) => {
		event.shapeless(item, ingredients)
			.id(`tfg:shapeless/${global.linuxUnfucker(item)}`)
	})

	//#endregion

	//#region Battle accessories - copper through steel by power level

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

	BATTLE_ACCESSORIES.forEach(([item, ingredients]) => {
		event.shapeless(item, ingredients)
			.id(`tfg:shapeless/${global.linuxUnfucker(item)}`)
	})

	//#endregion

	//#region Power/training items - heavy metal, rhyming trio

	const POWER_ITEMS = [
		['cobblemon:power_band', ['#forge:rods/wrought_iron', '#forge:plates/wrought_iron']],
		['cobblemon:power_belt', ['#forge:rods/steel', '#forge:plates/steel']],
		['cobblemon:power_lens', ['tfc:lens', '#forge:rods/wrought_iron']],
	]

	POWER_ITEMS.forEach(([item, ingredients]) => {
		event.shapeless(item, ingredients)
			.id(`tfg:shapeless/${global.linuxUnfucker(item)}`)
	})

	//#endregion

	//#region Weather rocks - stone based, all rhyme off tfc:rock

	// damp = a water plant, heat = charcoal, icy = ice, smooth = the actual
	// smooth-stone tag, so each rock reads as its own weather effect.
	const WEATHER_ROCKS = [
		['cobblemon:damp_rock', 'tfc:plant/leafy_kelp'],
		['cobblemon:heat_rock', 'minecraft:charcoal'],
		['cobblemon:icy_rock', 'minecraft:ice'],
		['cobblemon:smooth_rock', '#forge:smooth_stone'],
	]

	WEATHER_ROCKS.forEach(([rock, themed]) => {
		event.shapeless(rock, ['#tfc:rock_knapping', themed])
			.id(`tfg:shapeless/${global.linuxUnfucker(rock)}`)
	})

	//#endregion

	//#region Misc held/breeding items

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

	MISC_HELD_ITEMS.forEach(([item, ingredients]) => {
		event.shapeless(item, ingredients)
			.id(`tfg:shapeless/${global.linuxUnfucker(item)}`)
	})

	//#endregion
}
