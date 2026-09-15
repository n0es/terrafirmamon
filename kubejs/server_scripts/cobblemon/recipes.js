// priority: 0
"use strict";

/**
 * Cobblemon recipe integration.
 *
 * Governing brief: catching is EASY and EARLY. The first Poke Ball is a stone-age
 * consumable (clay + apricorn, fired in a pit kiln or a charcoal forge), not a
 * metalworking reward. Later balls are upgrades, never gates.
 *
 * Progression:
 *   Poke Ball        stone age    clay + red apricorn -> pit kiln or charcoal forge
 *   Apricorn balls   stone age    clay + the matching apricorn -> pit kiln, same as the Poke Ball
 *                                 (azure, citrine, roseate, slate, verdant, premier)
 *   Great Ball       copper       poke ball + copper double sheet + blue apricorn
 *   Ultra Ball       wrought iron great ball + wrought iron sheet + black apricorn
 *   Master Ball      MV           GT assembler, white apricorn + MV circuit
 *   Specialty balls  LV           GT assembler from great balls
 *   Ancient balls    none         deliberately left unobtainable (relics)
 *
 * Utility blocks:
 *   PC               bronze       tin alloy plates + glass + redstone (bench)
 *   PC               LV           GT assembler, for automation
 *   Healing Machine  bronze       tin alloy plates + heal powder + glass (bench)
 *   Healing Machine  LV           GT assembler, for automation
 */

function registerCobblemonRecipes(event) {

	/**
	 * Firing temperature for every Poke Ball shell.
	 *
	 * TFC fires its own ceramics at 1399C, which is a hair under the pit kiln's 1400
	 * (ServerConfig.pitKilnTemperature) and so can ONLY be done in a pit kiln. A charcoal forge is
	 * capped by its fuel, and charcoal burns at 1350 - it could never reach 1399, no matter how long
	 * it ran.
	 *
	 * 1200 clears charcoal's 1350 with enough margin that the forge actually gets there in practice
	 * rather than hovering just short, and the pit kiln still fires these at 1400 exactly as before.
	 * Any other device that reaches 1200 works too, which suits a ball that is meant to be the
	 * easy, early part of the progression.
	 */
	const BALL_FIRING_TEMPERATURE = 1200

	// Wipe every Cobblemon recipe. Everything obtainable is rebuilt below, so any
	// item with no recipe here is deliberately unobtainable.
	event.remove({ mod: 'cobblemon' })

	//#region Poke Ball - stone age

	// 3 clay + an apricorn forms the unfired shell.
	event.shapeless('tfg:unfired_poke_ball', [
		'3x minecraft:clay_ball',
		'cobblemon:red_apricorn'
	]).id('tfg:shapeless/unfired_poke_ball')

	// Fired in a pit kiln or a charcoal forge - see BALL_FIRING_TEMPERATURE.
	event.recipes.tfc.heating('tfg:unfired_poke_ball', BALL_FIRING_TEMPERATURE)
		.resultItem('cobblemon:poke_ball')
		.id('tfg:heating/poke_ball')

	//#endregion

	//#region Cobblemon wood - log to log-wood only

	// event.remove({ mod: 'cobblemon' }) above wipes Cobblemon's own recipes. The
	// worked forms are rebuilt by TFGWoodBuilder in the Cobblemon region of
	// tfg/natural_blocks/recipes.wood.js, on the pack's lumber chain, so the only
	// thing left to restore here is squaring four logs into log wood - the builder
	// only lathes log wood into its stripped form, it never makes it.
	global.COBBLEMON_WOOD.forEach(wood => {
		event.shaped(`3x ${wood.log_wood}`, [
			'AA',
			'AA'
		], {
			A: wood.log
		}).id(`tfg:shaped/${wood.name}_wood`)
	})

	//#endregion

	//#region Apricorn balls - copper age

	// Each of these is the Poke Ball recipe with a different apricorn: three clay and the apricorn
	// form an unfired shell, fired the same way the Poke Ball is. They are no longer built out of a finished Poke Ball plus a copper plate, which made
	// them a metal-age upgrade of a stone-age item for no reason - a Citrine Ball is not a better
	// Poke Ball, it is the same ball made from a different fruit.
	global.COBBLEMON_APRICORN_BALLS.forEach(([ball, apricorn]) => {
		const name = ball.split(':')[1].replace('_ball', '')

		event.shapeless(`tfg:unfired_${name}_ball`, [
			'3x minecraft:clay_ball',
			apricorn
		]).id(`tfg:shapeless/unfired_${name}_ball`)

		event.recipes.tfc.heating(`tfg:unfired_${name}_ball`, BALL_FIRING_TEMPERATURE)
			.resultItem(ball)
			.id(`tfg:heating/${global.linuxUnfucker(ball)}`)
	})

	// Built from the Azure Ball, not the Poke Ball: a Great Ball is blue, and the blue-apricorn
	// shell is what a blue ball should be made of. Before this the coloured shells were a
	// cosmetic dead end - nothing in the pack consumed them - while every better ball was a
	// Poke Ball with metal added. Now the apricorn a player farms decides what they can build.
	event.shapeless('cobblemon:great_ball', [
		'cobblemon:azure_ball',
		'#forge:double_plates/copper'
	]).id('tfg:shapeless/great_ball')

	//#endregion

	//#region Ultra Ball - wrought iron

	// Same idea as the Great Ball above: the Ultra Ball's yellow band comes from the
	// yellow-apricorn shell rather than from a loose apricorn stuck to a Great Ball.
	event.shapeless('cobblemon:ultra_ball', [
		'cobblemon:great_ball',
		'cobblemon:citrine_ball',
		'#forge:plates/wrought_iron'
	]).id('tfg:shapeless/ultra_ball')

	//#endregion

	//#region Master Ball - MV

	event.recipes.gtceu.assembler('tfg:master_ball')
		.itemInputs('cobblemon:ultra_ball', '2x #forge:plates/stainless_steel', 'cobblemon:white_apricorn', '#gtceu:circuits/mv')
		.itemOutputs('cobblemon:master_ball')
		.duration(600)
		.EUt(GTValues.VA[GTValues.MV])

	//#endregion

	//#region Specialty balls - LV assembler (the BULK route)

	// These are no longer the only way to get a specialty ball. recipes.balls.handcraft.js adds
	// an early-game hand/apparatus route for all 22, each built from the apricorn ball whose
	// colour it shares. These assembler recipes are kept on purpose as the automatable bulk
	// option - they output two balls where the hand route gives one.

	global.COBBLEMON_SPECIALTY_BALLS.forEach(([ball, themed, circuit]) => {
		event.recipes.gtceu.assembler(`tfg:${global.linuxUnfucker(ball)}`)
			.itemInputs('cobblemon:great_ball', `2x ${themed}`)
			.itemOutputs(`2x ${ball}`)
			.duration(200)
			.EUt(GTValues.VA[GTValues.LV])
			.circuit(circuit)
	})

	//#endregion

	//#region Evolution stones - gems, available from first mining

	global.COBBLEMON_EVOLUTION_STONES.forEach(([stone, gem]) => {
		event.shapeless(stone, [gem, 'minecraft:flint'])
			.id(`tfg:shapeless/${global.linuxUnfucker(stone)}`)
	})

	// Ice Stone needs a tenth source; sapphire plus actual ice is the obvious one.
	event.shapeless('cobblemon:ice_stone', ['gtceu:sapphire_gem', 'minecraft:ice'])
		.id('tfg:shapeless/ice_stone')

	//#endregion

	//#region Machines

	// Healing Machine, bronze age - same tier as the PC below. Its charge mechanic
	// is hardcoded and cannot be made to draw GTEU from KubeJS, so the recipe cost
	// is the only lever available here. Gating it at LV stranded players with no
	// way to heal a party for many hours, which is worse than the machine being
	// cheap; heal powder is a revival herb ground in a quern, so this is reachable
	// as soon as tin alloy is. The LV assembler recipe below stays for automation.
	event.shaped('cobblemon:healing_machine', [
		'GHG',
		'PRP',
		'PPP'
	], {
		P: '#forge:plates/tin_alloy',
		G: '#forge:glass',
		H: 'cobblemon:heal_powder',
		R: 'minecraft:redstone'
	}).id('tfg:shaped/healing_machine')

	event.recipes.gtceu.assembler('tfg:healing_machine')
		.itemInputs('4x #forge:plates/aluminium', '2x #gtceu:circuits/lv', '2x gtceu:lv_electric_pump', '#forge:glass')
		.itemOutputs('cobblemon:healing_machine')
		.duration(400)
		.EUt(GTValues.VA[GTValues.LV])

	// PC, bronze age. Catching overflows into PC storage from the very first
	// full party, but without the block none of it can be reached - so a player
	// is locked to their first six until LV, which lands many hours after they
	// hit that cap. This crude tin alloy box unlocks team management when it is
	// actually needed. The LV assembler recipe below stays for automation.
	event.shaped('cobblemon:pc', [
		'PPP',
		'PGP',
		'PRP'
	], {
		P: '#forge:plates/tin_alloy',
		G: '#forge:glass',
		R: 'minecraft:redstone'
	}).id('tfg:shaped/cobblemon_pc')

	event.recipes.gtceu.assembler('tfg:cobblemon_pc')
		.itemInputs('4x #forge:plates/aluminium', '2x #gtceu:circuits/lv', 'create:precision_mechanism', '#forge:glass')
		.itemOutputs('cobblemon:pc')
		.duration(400)
		.EUt(GTValues.VA[GTValues.LV])

	event.shapeless('cobblemon:link_cable', [
		'gtceu:red_alloy_single_wire',
		'#forge:plates/copper'
	]).id('tfg:shapeless/link_cable')

	//#endregion
}
