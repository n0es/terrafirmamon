// priority: 0
"use strict";

/**
 * Item tags for the Cobblemon integration.
 *
 * Two jobs: fold Cobblemon's edibles into TFC's food and compost chains, and
 * hide from EMI the ~1000 entries that are deliberately unobtainable, so the
 * recipe viewer stays legible.
 */
const registerCobblemonItemTags = (event) => {

	// Every berry and apricorn is TFC food, and rots into the compost chain.
	global.COBBLEMON_BERRIES.forEach(berry => {
		event.add('tfc:foods', berry.id)
		event.add('tfc:foods/fruits', berry.id)
		event.add('tfc:compost_greens', berry.id)
	})

	// #forge:berries is what the berry-juice extractor in recipes.automation.consumables.js
	// asks for, and NOTHING in this pack or any of its mods populates it - Cobblemon ships
	// #cobblemon:berries, TFC ships #tfc:foods/fruits, and the Forge conventional name is
	// simply unused. The recipe therefore failed to load on every boot:
	//   "Invalid or empty input item (tfg:extractor/automation/extractor/berry_juice)
	//    (empty or unknown tag: #forge:berries)"
	//
	// Filling it here, rather than repointing the recipe at #cobblemon:berries, keeps the
	// conventional tag meaningful for anything else that reaches for it and lets TFC's own
	// berries feed the same juicer - a TFC blackberry is as much a berry as a Cheri Berry.
	//
	// Apricorns are deliberately EXCLUDED. They are the Poke Ball crafting material (see
	// recipes.js), and an extractor that eats them for juice would quietly compete with
	// ball production for the pack's scarcest Cobblemon crop.
	global.COBBLEMON_BERRIES
		.filter(berry => !berry.apricorn)
		.forEach(berry => event.add('forge:berries', berry.id))

	;['blackberry', 'blueberry', 'bunchberry', 'cloudberry', 'cranberry', 'elderberry',
		'gooseberry', 'raspberry', 'snowberry', 'strawberry', 'wintergreen_berry']
		.forEach(berry => event.add('forge:berries', `tfc:food/${berry}`))

	global.COBBLEMON_FOODS.forEach(item => {
		event.add('tfc:foods', item.id)
		event.add('tfc:compost_greens', item.id)
	})

	// Apricorn leaves and saplings are green compost too.
	event.add('tfc:compost_greens', 'cobblemon:apricorn_leaves')

	// #tfg:mochi_grains - the grain half of every EV mochi in recipes.cooking.js.
	//
	// Mochi is pounded rice, and rice is the reliable input: it is a farmed TFC
	// crop, and it is what the pack owner asked these run on. Cobblemon's own
	// hearty grains is accepted alongside it so that crop is not a dead item
	// where its plains_grains/swamp_grains features do place - but nothing
	// depends on it, so mochi stay craftable either way.
	;['tfc:food/cooked_rice', 'cobblemon:hearty_grains']
		.forEach(grain => event.add('tfg:mochi_grains', grain))

	// The Ancient Origin Ball, and only that one. The other fifteen used to be hidden here as
	// recipeless relics; recipes.ancient.js now builds them from apricorns, tumblestone and a
	// tier metal - Cobblemon's own shape - so they are real craftables and must show in EMI.
	//
	// The Origin Ball has no recipe in Cobblemon either and stays a reward item, so it is the
	// one that is still a dead entry. Its rod is hidden to match, in tags.hidden.js.
	event.add('c:hidden_from_recipe_viewers', 'cobblemon:ancient_origin_ball')
}

const registerCobblemonBlockTags = (event) => {

	// Apricorn saplings extend vanilla SaplingBlock, so they may only be placed
	// on minecraft:dirt. TFC folds its bare soils into that tag but deliberately
	// leaves its GRASS out, which vanilla does not - minecraft:grass_block is in
	// BlockTags.DIRT upstream. The result is that an apricorn seed bounces off
	// every grassed surface in the world and has to be planted on dug-up dirt.
	//
	// Adding #tfc:grass restores the vanilla rule. Note the scope: this is the
	// vanilla dirt tag, so it also lets other saplings, bamboo and azalea sit on
	// TFC grass, which is how they behave outside this pack anyway. It does NOT
	// touch #tfc:dirt, so the pack's enderman_holdable and mushroom_grow_block
	// entries are unaffected - and mushroom_grow_block already lists #tfc:grass.
	event.add('minecraft:dirt', '#tfc:grass')

	// Cobblemon tags none of its own wood as axe-mineable (only the apricorn fruit
	// blocks), so every log, plank and worked form needs it here or it breaks at
	// hand speed with no tool bonus. Saccharine had none of this at all.
	global.COBBLEMON_WOOD.forEach(wood => {
		[wood.logs, wood.plank, wood.stair, wood.slab, wood.door, wood.trapdoor,
			wood.fence, wood.fence_gate, wood.pressure_plate, wood.button, wood.sign,
			wood.hanging_sign]
			.forEach(block => event.add('minecraft:mineable/axe', block))

		// TFC cuts leaves with a sharp tool rather than shears or a hoe, and its own
		// leaves sit in this tag. Cobblemon's are hoe-mineable out of the box, which
		// is the vanilla rule, so add the TFC one alongside it.
		event.add('tfc:mineable_with_sharp_tool', wood.leaves)
	})
}

/**
 * Slots Cobblemon's wood into the pack's own wood classification.
 *
 * #tfg:hardwood and #tfg:softwood are how TerraFirmaGreg tells one kind of wood
 * from another - they drive the pulp and paper chain, hardwood strips for arrows,
 * and GT recycling. A wood that is in neither is inert: it burns and it builds,
 * but nothing downstream will take it. Every other mod's wood in this pack is
 * classified this way (see ad_astra/tags.js, afc/tags.js, tfc/tags.js).
 *
 * Both Cobblemon woods are hardwood: apricorn is a fruitwood, and saccharine is
 * the pack's maple.
 *
 * @param {Internal.ItemTagEventJS} event
 */
const registerCobblemonWoodTags = (event) => {

	global.COBBLEMON_WOOD.forEach(wood => {
		const kind = wood.isHardwood ? 'hardwood' : 'softwood'

		event.add(`tfg:${kind}`, wood.logs)
		event.add(`tfg:stripped_${kind}`, wood.stripped_log)
		event.add(`tfg:stripped_${kind}`, wood.stripped_wood)
	})
}

/**
 * Fluid tags for the Cobblemon integration.
 *
 * One entry, and it exists to make a jar-side recipe reachable. Cobblemon's Create
 * compat ships a mixing recipe for the Rage Candy Bar that wants 250mB of milk. On
 * 1.21 that is the conventional `c:milk` fluid tag; the backport rewrites it to the
 * 1.20.1 Forge name `forge:milk` (see convert_create_fluid_ingredient in
 * utilityscripts/backport_data.py), but nothing on 1.20.1 actually DEFINES that tag -
 * Forge never shipped it and TFC uses its own `tfc:milks`.
 *
 * Without this the recipe parses but can never be satisfied, which is the quiet
 * failure mode the pack keeps tripping over: registered is not obtainable.
 *
 * @param {Internal.FluidTagEventJS} event
 */
const registerCobblemonFluidTags = (event) => {

	event.add('forge:milk', '#tfc:milks')
}

/**
 * Places the wild berry patches in the world.
 *
 * `#tfc:feature/crops` is the tag TFC walks when it decorates a chunk with wild crops, and it is
 * how every TFG crop gets into the world (see the `tfc:feature/crops` entries in
 * tfg/overworld/tags.overworld.js). Without an entry here the patch features generated under
 * data/tfg/worldgen/.../cobblemon/crop exist but are never placed, which is the same shape of
 * failure that left Cobblemon's berry groves dormant: configured correctly, connected to nothing.
 *
 * Each patch carries the berry's own climate range from constants.js, so a berry is found growing
 * where it would also grow if planted.
 *
 * @param {Internal.TagEventJS} event
 */
const registerCobblemonPlacedFeatures = (event) => {

	global.COBBLEMON_BERRIES
		.filter(berry => berry.crop)
		.forEach(berry => {
			const name = berry.id.split(':')[1]
			event.add('tfc:feature/crops', `tfg:cobblemon/crop/${name}_patch`)
		})
}
