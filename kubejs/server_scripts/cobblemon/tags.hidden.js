// priority: 0
"use strict";

/**
 * Cobblemon items that are deliberately NOT obtainable, hidden from EMI.
 *
 * The pack's rule (see recipes.js) is that everything obtainable gets a recipe and
 * anything without one is unobtainable by design. That leaves a pile of dead entries
 * in the recipe viewer, which this file removes - the same treatment the ancient
 * balls already get in tags.js.
 *
 * Most are hidden because they are worldgen or loot shaped, not because they were
 * forgotten: an ore block that never generates and a sherd you brush out of gravel
 * are not things a player should be able to craft. The boats are the one exception -
 * those are a deliberate removal, because the pack has its own boatbuilding.
 *
 * @param {Internal.ItemTagEventJS} event
 */
const registerCobblemonHiddenItems = (event) => {

	// Evolution-stone ore blocks. TFG replaces vanilla worldgen entirely, so these
	// never generate, and the evolution stones themselves already come from
	// GregTech gems (see COBBLEMON_EVOLUTION_STONES). Crafting an ore block would
	// be backwards, so they are hidden rather than given a recipe.
	;['dawn_stone_ore', 'deepslate_dawn_stone_ore', 'deepslate_dusk_stone_ore', 'deepslate_fire_stone_ore', 'deepslate_ice_stone_ore', 'deepslate_leaf_stone_ore', 'deepslate_moon_stone_ore', 'deepslate_shiny_stone_ore', 'deepslate_sun_stone_ore', 'deepslate_thunder_stone_ore', 'deepslate_water_stone_ore', 'dripstone_moon_stone_ore', 'dusk_stone_ore', 'fire_stone_ore', 'ice_stone_ore', 'leaf_stone_ore', 'moon_stone_ore', 'nether_fire_stone_ore', 'shiny_stone_ore', 'sun_stone_ore', 'terracotta_sun_stone_ore', 'thunder_stone_ore', 'water_stone_ore']
		.forEach(id => event.add('c:hidden_from_recipe_viewers', `cobblemon:${id}`))

	// Archaeology sherds: found by brushing suspicious blocks, never crafted.
	;['bygone_sherd', 'capture_sherd', 'dome_sherd', 'helix_sherd', 'nostalgic_sherd', 'suspicious_sherd']
		.forEach(id => event.add('c:hidden_from_recipe_viewers', `cobblemon:${id}`))

	// Gimmighoul and gilded chests are worldgen/spawn features, not craftables.
	;['black_gilded_chest', 'blue_gilded_chest', 'gilded_chest', 'gimmighoul_chest', 'green_gilded_chest', 'pink_gilded_chest', 'white_gilded_chest', 'yellow_gilded_chest']
		.forEach(id => event.add('c:hidden_from_recipe_viewers', `cobblemon:${id}`))

	// Relic coins, pouches, teacups and pots are Gimmighoul and archaeology loot.
	;['chipped_pot', 'cracked_pot', 'masterpiece_teacup', 'relic_coin', 'relic_coin_pouch', 'relic_coin_pouch_case', 'relic_coin_sack', 'unremarkable_teacup']
		.forEach(id => event.add('c:hidden_from_recipe_viewers', `cobblemon:${id}`))

	// The Origin Pokerod, and only that one. The other fifteen ancient rods used to be hidden
	// here too, because ancient balls had no recipe and a rod needs one - but recipes.ancient.js
	// now builds every ancient ball except the Origin Ball, so those fifteen are genuinely
	// craftable and recipes.fishing.js gives each a smithing recipe.
	//
	// cobblemon:ancient_origin_ball stays unobtainable (Cobblemon ships no recipe for it either
	// - it is the legendary of the set), so its rod is still a dead entry and still hidden.
	event.add('c:hidden_from_recipe_viewers', 'cobblemon:ancient_origin_rod')

	// Boats and chest boats, both woods. Removed outright rather than left
	// recipeless: this pack boats with Firmaciv, whose hulls are assembled plank
	// by plank, and a five-plank rowboat crafted in one click undercuts that
	// entirely. See the header of recipes.wood_fossils.js.
	global.COBBLEMON_WOOD.forEach(wood => {
		event.add('c:hidden_from_recipe_viewers', `cobblemon:${wood.name}_boat`)
		event.add('c:hidden_from_recipe_viewers', `cobblemon:${wood.name}_chest_boat`)
	})

	// Mod logo / display items with no gameplay role.
	;['cobblemon', 'cobblemon_blue', 'cobblemon_green', 'cobblemon_purple', 'cobblemon_yellow']
		.forEach(id => event.add('c:hidden_from_recipe_viewers', `cobblemon:${id}`))
}
