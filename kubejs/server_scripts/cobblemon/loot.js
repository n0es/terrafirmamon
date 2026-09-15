// priority: 0
"use strict";

// LootJS coerces whatever it is handed into a ResourceLocationFilter, and the three forms do NOT
// behave the same:
//   - an exact id string                 -> matches that one table
//   - a java.util.regex.Pattern          -> matches by pattern          <- used below
//   - a "/.../" string                   -> parsed into a Pattern, also works
//   - a BARE JS REGEX LITERAL /^x:/      -> accepted, registered, and SILENTLY NEVER MATCHES
//   - a glob "cobblemon:*"               -> THROWS ResourceLocationException, aborting the whole
//                                           LootJS.modifiers handler and every modifier after it
// The first version of this file used a JS regex literal and therefore did nothing at all, with no
// error in the log. Verified on the test server by spawning the loot and reading the chest back.
// Note the pattern has to FULL-match, so the trailing .* is load-bearing: "^cobblemon:" alone
// matches nothing.
const Pattern = Java.loadClass('java.util.regex.Pattern')
const COBBLEMON_TABLES = Pattern.compile('^cobblemon:.*')

/**
 * Loot-table integration for Cobblemon.
 *
 * Cobblemon's 601 loot tables were authored for vanilla and hand out 55 distinct vanilla
 * ids. TerraFirmaGreg replaces vanilla progression wholesale, so some of those are items
 * a player can obtain no other way - a Cobblemon chest becomes the pack's only source of
 * a diamond chestplate - and some are simply the wrong item for TFC's tech tree.
 *
 * The list below is NOT the whole set of vanilla ids Cobblemon references. Everything not
 * named here was checked against the live registry and IS obtainable in this pack, so it
 * stays: minecraft:iron_ingot, gold_ingot and copper_ingot (GregTech maps its Iron/Gold/
 * Copper materials onto the vanilla items - 861, 207 and 572 recipes respectively), plus
 * diamond, emerald, redstone, charcoal, book, stick, bowl, flower_pot, lectern, map,
 * spyglass, bow, bone, cobweb and the iron/gold/coal/redstone/amethyst storage blocks.
 * Replacing those would have been busywork that made the loot worse.
 *
 * Method: item-level replacement over every cobblemon: table, rather than rewriting the
 * tables. It survives a Cobblemon update, it leaves the pools' weights and roll counts
 * alone (Cobblemon tuned those), and it keeps the whole policy readable in one place.
 *
 * Note the deliberate difference from the pack's treatment of VANILLA structure chests in
 * minecraft/loot.js, which are emptied outright with removeLoot(ItemFilter.ALWAYS_TRUE).
 * That is right for a vanilla chest, whose entire contents are vanilla progression. A
 * Cobblemon chest is mostly Cobblemon items - balls, berries, evolution stones, exp candy -
 * which are legitimately this pack's content, so emptying them would delete the reward for
 * finding the structure.
 *
 * @param {Internal.LootModificationEventJS} event
 */
function registerCobblemonLoots(event) {

	//#region Vanilla -> TFC/TFG item replacements

	// [vanilla id, replacement, why]
	// Every replacement was confirmed to exist AND be obtainable on the live test server.
	const REPLACEMENTS = [
		// --- Primitive tools. TFC replaces vanilla stone tools entirely and has no stone
		// pickaxe or sword at all: the hammer and the javelin are its primitive equivalents,
		// and a pickaxe is deliberately a copper-age tool. Sedimentary is the rock family
		// used throughout because a loot table cannot know the local stone.
		['minecraft:stone_axe', 'tfc:stone/axe/sedimentary'],
		['minecraft:stone_shovel', 'tfc:stone/shovel/sedimentary'],
		['minecraft:stone_pickaxe', 'tfc:stone/hammer/sedimentary'],
		['minecraft:stone_sword', 'tfc:stone/javelin/sedimentary'],

		// --- Metal gear. Handing out a vanilla iron or diamond set skips most of TFC's
		// metalworking. Mapped onto the TFC armour of comparable standing instead, so the
		// chest is still worth opening: wrought iron for the iron set, black steel for the
		// diamond set (TFC's late-game armour, and these are treasure-tier tables).
		['minecraft:iron_helmet', 'tfc:metal/helmet/wrought_iron'],
		['minecraft:iron_chestplate', 'tfc:metal/chestplate/wrought_iron'],
		['minecraft:iron_leggings', 'tfc:metal/greaves/wrought_iron'],
		['minecraft:iron_boots', 'tfc:metal/boots/wrought_iron'],
		['minecraft:iron_sword', 'tfc:metal/sword/wrought_iron'],
		['minecraft:iron_pickaxe', 'tfc:metal/pickaxe/wrought_iron'],
		['minecraft:diamond_helmet', 'tfc:metal/helmet/black_steel'],
		['minecraft:diamond_chestplate', 'tfc:metal/chestplate/black_steel'],
		['minecraft:diamond_leggings', 'tfc:metal/greaves/black_steel'],
		['minecraft:diamond_boots', 'tfc:metal/boots/black_steel'],
		['minecraft:diamond_sword', 'tfc:metal/sword/black_steel'],

		// --- Raw metals and coal. These are the vanilla 1.17 raw forms, which TFG does not
		// generate; TFC's raw ore items are what the pack's own loot uses (see the vase loot
		// in tfg/loot.js). This is the bulk of the fossil tables.
		['minecraft:raw_iron', 'tfc:ore/normal_hematite'],
		['minecraft:raw_copper', 'tfc:ore/normal_native_copper'],
		['minecraft:raw_gold', 'tfc:ore/normal_native_gold'],
		['minecraft:coal', 'tfc:ore/bituminous_coal'],

		// --- Containers and sundries with no recipe in this pack.
		['minecraft:glass_bottle', 'tfc:ceramic/jug'],
		['minecraft:bucket', 'tfc:wooden_bucket'],
		['minecraft:bread', 'tfc:food/wheat_bread'],
		['minecraft:string', 'tfc:jute_fiber'],
		['minecraft:fishing_rod', 'tfc:metal/fishing_rod/copper'],
		['minecraft:cod', 'tfc:food/cod'],
		['minecraft:cooked_cod', 'tfc:food/cooked_cod'],
		['minecraft:kelp', 'tfc:plant/leafy_kelp'],
		// The pack hides every potion behind a regex in minecraft/tags.js and uses its own
		// pills instead, so a potion in a treasure chest is an item EMI will not even show.
		['minecraft:potion', 'tfg:regeneration_pill'],
		// No golden food in this pack - minecraft:golden_carrot is in MINECRAFT_HIDED_ITEMS.
		// Rare Candy is the Cobblemon-flavoured treasure that fits the slot it was filling.
		['minecraft:golden_apple', 'cobblemon:rare_candy'],
		// One reference, in a decayed-crypt pot. A compass is unobtainable here; a map is not.
		['minecraft:compass', 'minecraft:map']
	]

	// One modifier carrying every replacement, not one modifier per pair: the modifier is
	// re-tested against the table id on every roll, so 30 of them would mean 30 regex
	// matches per chest opened.
	//
	// preserveCount (the third argument) keeps the pool's own set_count function meaningful:
	// a roll of "3 to 5 raw iron" becomes 3 to 5 hematite, not a single one.
	const cobblemonTables = event.addLootTableModifier(COBBLEMON_TABLES)
	REPLACEMENTS.forEach(([from, to]) => {
		cobblemonTables.replaceLoot(from, LootEntry.of(to), true)
	})

	//#endregion

	//#region Naturally-generated machines scrap into the metal they are built from

	// A PC or Healing Machine placed by a pokecenter structure carries natural=true, and
	// breaking one drops 1-4 minecraft:iron_ingot instead of the block. Iron ingot IS
	// obtainable here, so this is not broken - it is just the wrong metal. recipes.js builds
	// both machines out of tin alloy plates precisely so they are reachable in the bronze
	// age, and scrapping a wild one should return that, not a later-tier metal.
	;['cobblemon:pc', 'cobblemon:healing_machine'].forEach(block => {
		event.addBlockLootModifier(block)
			.replaceLoot('minecraft:iron_ingot', LootEntry.of('gtceu:tin_alloy_plate'), true)
	})

	//#endregion
}
