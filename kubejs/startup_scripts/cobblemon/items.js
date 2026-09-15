// priority: 0
"use strict";

/**
 * Items backing the Cobblemon integration.
 *
 * Only one bridging item is needed: the unfired Poké Ball. The stone-age ball
 * route is clay + apricorn -> unfired ball -> pit kiln at 1399C, which is the
 * same firing temperature TFC uses for all of its own ceramics.
 *
 * @param {Registry.Item} event
 */
/**
 * Title-cases a ball id - `poke_ball` -> `Poké Ball`.
 *
 * The accent is not cosmetic. Cobblemon itself ships "Poké Ball", so a transitional item labelled
 * "Poke Ball" sits next to the real one in EMI looking like a different, sloppier item. Naive
 * capitalisation of the id gets every other ball right and this one wrong, so "poke" is special-cased
 * rather than hand-writing all four names.
 */
const prettyBallName = (ball) => ball
	.split('_')
	.map(word => word === 'poke' ? 'Poké' : word[0].toUpperCase() + word.slice(1))
	.join(' ')

const registerCobblemonItems = (event) => {

	event.create('tfg:unfired_poke_ball')
		.displayName('Unfired Poké Ball')
		.maxStackSize(16)

	// One unfired shell per apricorn-coloured ball, mirroring the Poke Ball above: each is clay
	// plus its own apricorn, fired in a pit kiln at TFC's ceramic temperature (see recipes.js).
	// They are separate items rather than one shared shell because the apricorn goes in before
	// firing, so what comes out of the kiln is already decided - and it lets each carry its own
	// tinted texture instead of six identical grey balls in the inventory.
	global.COBBLEMON_APRICORN_BALLS.forEach(([ball]) => {
		const name = ball.split(':')[1].replace('_ball', '')
		event.create(`tfg:unfired_${name}_ball`)
			.displayName(`Unfired ${prettyBallName(`${name}_ball`)}`)
			.maxStackSize(16)
	})

	// Lumber for Cobblemon's two wood families. Every wood in this pack is sawn
	// into lumber before it is worked, and #tfc:lumber is what the pack's own
	// recipes ask for, so a Cobblemon tree needs its own lumber to be usable the
	// way a TFC tree is - see global.COBBLEMON_WOOD and the Cobblemon region of
	// tfg/natural_blocks/recipes.wood.js. Same registration as the Ad Astra woods.
	global.COBBLEMON_WOOD.forEach(wood => {
		event.create(`tfg:wood/lumber/${wood.name}`)
			.tag('tfc:lumber')
	})
}
