// priority: 0
"use strict";

/**
 * Cobblemon's two wood families, described the way this pack describes every other
 * mod's wood (see global.AD_ASTRA_WOOD, global.TFG_NEW_WOOD_TYPES).
 *
 * Cobblemon ships apricorn wood, and 1.8 added the saccharine tree. Both were
 * vanilla-shaped: a log crafted straight into four planks, and everything built
 * from planks. TFC does not work that way - a log is sawn into lumber, and lumber
 * is what every worked form is made of - so feeding these two families through
 * TFGWoodBuilder (see tfg/natural_blocks/recipes.wood.js) is what makes a Cobblemon
 * tree behave like any other tree in the pack.
 *
 * The behaviour that comes from being a log at all - whole-tree felling with an
 * axe, log piles, charcoal pits, pit kilns, firepit fuel, TFC's very_large item
 * size - Cobblemon already gets for free, because its logs are in #minecraft:logs
 * and TFC keys all of that off that tag. What it does NOT get for free is a fuel
 * definition (burn temperature and duration, see cobblemon/data.js) or membership
 * of the pack's own #tfg:hardwood chain (see cobblemon/tags.js).
 *
 * burnTemperature / burnDuration follow TFC's own wood table, matched to the
 * nearest real-world analogue: apricorn is a fruitwood, so it sits with chestnut
 * (651C, 1500 ticks), and saccharine is the pack's maple - it is the tree you tap
 * for syrup - so it takes maple's numbers (745C, 2000 ticks).
 *
 * Cobblemon has no support beams, chests, barrels, looms or the rest of TFC's
 * wooden furniture, so those slots are null and TFGWoodBuilder simply skips them.
 */
global.COBBLEMON_WOOD = [
	{
		name: 'apricorn',
		logs: '#cobblemon:apricorn_logs',
		log: 'cobblemon:apricorn_log', stripped_log: 'cobblemon:stripped_apricorn_log',
		log_wood: 'cobblemon:apricorn_wood', stripped_wood: 'cobblemon:stripped_apricorn_wood',
		lumber: 'tfg:wood/lumber/apricorn', plank: 'cobblemon:apricorn_planks',
		stair: 'cobblemon:apricorn_stairs', slab: 'cobblemon:apricorn_slab',
		fence: 'cobblemon:apricorn_fence', fence_gate: 'cobblemon:apricorn_fence_gate',
		door: 'cobblemon:apricorn_door', trapdoor: 'cobblemon:apricorn_trapdoor',
		button: 'cobblemon:apricorn_button', pressure_plate: 'cobblemon:apricorn_pressure_plate',
		sign: 'cobblemon:apricorn_sign', hanging_sign: 'cobblemon:apricorn_hanging_sign',
		leaves: 'cobblemon:apricorn_leaves',
		isHardwood: true,
		burnTemperature: 651, burnDuration: 1500
	},
	{
		name: 'saccharine',
		logs: '#cobblemon:saccharine_logs',
		log: 'cobblemon:saccharine_log', stripped_log: 'cobblemon:stripped_saccharine_log',
		log_wood: 'cobblemon:saccharine_wood', stripped_wood: 'cobblemon:stripped_saccharine_wood',
		lumber: 'tfg:wood/lumber/saccharine', plank: 'cobblemon:saccharine_planks',
		stair: 'cobblemon:saccharine_stairs', slab: 'cobblemon:saccharine_slab',
		fence: 'cobblemon:saccharine_fence', fence_gate: 'cobblemon:saccharine_fence_gate',
		door: 'cobblemon:saccharine_door', trapdoor: 'cobblemon:saccharine_trapdoor',
		button: 'cobblemon:saccharine_button', pressure_plate: 'cobblemon:saccharine_pressure_plate',
		sign: 'cobblemon:saccharine_sign', hanging_sign: 'cobblemon:saccharine_hanging_sign',
		leaves: 'cobblemon:saccharine_leaves',
		isHardwood: true,
		burnTemperature: 745, burnDuration: 2000
	}
]
