// priority: 0
"use strict";

/**
 * Automation layer for the Cobblemon ball progression, on top of the hand recipes
 * in recipes.js (which stays untouched). Three tiers, per the owner's brief:
 *
 *   1. Hand    - recipes.js, already done.
 *   2. Machine - a GregTech assembler route for the four core balls
 *                (poke/great/ultra/master), comparable cost to hand-crafting but
 *                automatable. Also a GT route for the apricorn-coloured balls,
 *                driven by global.COBBLEMON_APRICORN_BALLS.
 *   3. Bulk    - poke_ball and great_ball only (the ones players burn through by
 *                the hundred): one voltage step up, several balls per run.
 *
 * There were once Create sequenced-assembly lines here too, each with its own
 * tfg:unfinished_<ball> transitional item. They were removed: the four transitional
 * items had no textures and showed up in EMI as recipeless clutter, and the GT
 * routes below already cover every ball the assemblies did.
 */
const registerCobblemonBallAutomation = (event) => {

	//#region Poke Ball - humble: clay, red apricorn, a lick of copper


	event.recipes.gtceu.assembler('tfg:automation/poke_ball')
		.itemInputs('3x minecraft:clay_ball', 'cobblemon:red_apricorn', '#forge:plates/copper')
		.itemOutputs('cobblemon:poke_ball')
		.duration(100)
		.EUt(GTValues.VA[GTValues.ULV])

	//#endregion

	//#region Great Ball - copper age, a bit more work


	event.recipes.gtceu.assembler('tfg:automation/great_ball')
		.itemInputs('cobblemon:poke_ball', '#forge:double_plates/copper', 'cobblemon:blue_apricorn')
		.itemOutputs('cobblemon:great_ball')
		.duration(120)
		.EUt(GTValues.VA[GTValues.LV])

	//#endregion

	//#region Ultra Ball - wrought iron, more loops


	event.recipes.gtceu.assembler('tfg:automation/ultra_ball')
		.itemInputs('cobblemon:great_ball', '#forge:plates/wrought_iron', 'cobblemon:black_apricorn')
		.itemOutputs('cobblemon:ultra_ball')
		.duration(160)
		.EUt(GTValues.VA[GTValues.LV])

	//#endregion

	//#region Master Ball - the showpiece: white apricorn, circuits, the most steps


	// NOTE: recipes.js already ships a GT assembler for the master ball, id
	// tfg colon master_ball (ultra_ball + 2x stainless steel plate + white apricorn +
	// MV circuit, MV voltage). That already IS the machine-tier GT route for this
	// ball, so no second GT assembler recipe is added here - it would just be a
	// near-duplicate competing for the same inputs.

	//#endregion

	//#region Bulk tier - poke_ball and great_ball only, one voltage step up

	// Ultra and master intentionally get no bulk recipe: they are meant to stay
	// precious, not something a player automates a chest of.

	event.recipes.gtceu.assembler('tfg:automation/bulk/poke_ball')
		.itemInputs('12x minecraft:clay_ball', '4x cobblemon:red_apricorn', '4x #forge:plates/copper')
		.itemOutputs('4x cobblemon:poke_ball')
		.duration(160)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.assembler('tfg:automation/bulk/great_ball')
		.itemInputs('4x cobblemon:poke_ball', '4x #forge:double_plates/copper', '4x cobblemon:blue_apricorn')
		.itemOutputs('4x cobblemon:great_ball')
		.duration(200)
		.EUt(GTValues.VA[GTValues.MV])

	//#endregion

	//#region Apricorn-coloured balls - GT assembler, mirrors the hand recipe

	// COBBLEMON_APRICORN_BALLS is [ball, apricorn]. The hand recipe in recipes.js is now clay plus
	// the apricorn fired in a kiln, so this mirrors it: the same three clay and apricorn, with a
	// copper plate standing in for the kiln, exactly as the poke_ball machine tier above does.
	// Includes the Premier Ball, which moved into this family.
	global.COBBLEMON_APRICORN_BALLS.forEach(([ball, apricorn]) => {
		event.recipes.gtceu.assembler(`tfg:automation/${global.linuxUnfucker(ball)}`)
			.itemInputs('3x minecraft:clay_ball', apricorn, '#forge:plates/copper')
			.itemOutputs(ball)
			.duration(100)
			.EUt(GTValues.VA[GTValues.ULV])
	})

	// Specialty balls (COBBLEMON_SPECIALTY_BALLS) are NOT touched here: recipes.js
	// already gives every one of them an LV GT assembler recipe
	// (great_ball + 2x themed item, circuit-numbered). Adding a second one would
	// just be a duplicate competing for the same inputs, so it is skipped.

	//#endregion
}
