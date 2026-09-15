// priority: 0
"use strict";

/**
 * Early-game routes for the specialty balls.
 *
 * Before this, all 22 specialty balls had exactly one recipe each: an LV GregTech assembler,
 * great_ball plus two themed items. That put the entire specialty line behind electricity,
 * which sits badly with the pack's own brief that catching is EASY and EARLY - a player with
 * a kiln and a crafting table could make a Poke Ball and then nothing else for a very long time.
 *
 * These add a hand or apparatus route in front of that. The assembler recipes in recipes.js are
 * deliberately KEPT as the bulk, automatable option: one ball here, two there. Nothing is lost.
 *
 * Two things shape the table in startup_scripts/cobblemon/constants.js:
 *
 *   1. **The base is the matching apricorn ball, not great_ball.** That is what the six coloured
 *      shells are for - roseate for the Love Ball, verdant for the Safari Ball, slate for the
 *      Dusk Ball. It also means the apricorn colours a player farms map onto the balls they want.
 *   2. **The apparatus is spread deliberately.** The pack has a large workbench roster and the
 *      old layer used precisely one machine.
 *
 * A hard constraint worth recording, because it rules out the obvious choices: **no TFC anvil or
 * welding recipe is possible on a ball.** data.js registers every shell with
 * event.itemHeat(id, 1, null, null) - heat capacity, then a null forging temperature and a null
 * welding temperature. TFC needs both of those to be real numbers before an item may be worked or
 * welded, so a ball can be heated but never hammered. Everything below therefore uses apparatuses
 * that consume items as-is.
 *
 * @param {Internal.RecipesEventJS} event
 */
const registerCobblemonBallHandcraftRecipes = (event) => {

	// Dye volume for the barrel routes. TFC's own dyeing recipes use 25 mB for one small item
	// (see the chalk and simplylight barrel recipes); a ball is a bigger object than a stick of
	// chalk, so it costs four times that rather than reusing the trinket figure.
	const DYE_MB = 100

	// TFC seals a barrel for a length of time rather than a temperature. 1000 ticks is what the
	// pack's other dyeing recipes use, and a ball has no reason to be slower than a lamp block.
	const BARREL_TICKS = 1000

	global.COBBLEMON_BALL_HANDCRAFT.forEach(([ball, base, extra, apparatus]) => {
		const id = global.linuxUnfucker(ball)

		if (apparatus === 'crafting') {
			// The plainest route, for the balls whose theme is a plain material.
			event.shapeless(ball, [base, extra])
				.id(`tfg:shapeless/${id}`)

		} else if (apparatus === 'deploying') {
			// Create's deployer presses the themed item onto the shell - the right shape for the
			// ones that are a ball with something fixed to it (a plate, a clock, a feather).
			// Argument order is (output, [target, heldItem]), per the MV rework recipes.
			event.recipes.create.deploying(ball, [base, extra])
				.id(`tfg:deploying/${id}`)

		} else if (apparatus === 'mixing') {
			// Greate's mixer, for the ones that are a ball infused with a loose material.
			event.recipes.greate.mixing(ball, [base, extra])
				.id(`tfg:mixing/${id}`)

		} else if (apparatus === 'barrel') {
			// A sealed TFC barrel of dye. `extra` is a FLUID id for this branch, not an item -
			// these three balls are defined by their colour, so they are dyed rather than built.
			event.recipes.tfc.barrel_sealed(BARREL_TICKS)
				.inputItem(base)
				.inputFluid(Fluid.of(extra, DYE_MB))
				.outputItem(ball)
				.id(`tfg:barrel/${id}`)

		} else if (apparatus === 'pot') {
			// Boiled in salt water in a TFC pot. Only the Dive Ball, and only because a ball meant
			// for underwater use earning its finish in seawater is the joke worth keeping.
			event.recipes.tfc.pot([base, extra], Fluid.of('tfc:salt_water', 1000), 30 * 20, 300)
				.itemOutput(ball)
				.id(`tfg:pot/${id}`)
		}
	})
}
