// priority: 0
"use strict";

/**
 * WaterFrames integration.
 *
 * Stock recipes are vanilla-shaped - iron ingots, iron blocks, note blocks - none of
 * which fit a pack where iron is an anvil-tier material and electronics come from
 * GregTech. These are displays, so they sit where displays belong: the wooden Box
 * Television at ULV, the Frame at LV, the larger screens and the Projector at MV.
 *
 * Every ingredient below is a tag or id already used elsewhere in this pack.
 */
function registerWaterFramesRecipes(event) {

	event.remove({ mod: 'waterframes' })

	//#region ULV / LV - the cabinet set, the frame, and the wall TV

	// Box Television: a wooden cabinet CRT. ULV, no assembler — lumber, glass,
	// a circuit, and a screwdriver and hammer.
	event.shaped('waterframes:tv_box', [
		'LGL',
		'SCW',
		'LHL'
	], {
		L: '#tfc:lumber',
		G: '#forge:glass',
		C: '#gtceu:circuits/ulv',
		W: 'gtceu:red_alloy_single_wire',
		S: '#forge:tools/screwdrivers',
		H: '#forge:tools/hammers'
	}).id('tfg:shaped/waterframes_tv_box')

	// Frame: a pane of glass in a wrought iron surround, driven by one LV circuit.
	event.shaped('waterframes:frame', [
		'IGI',
		'GCG',
		'IWI'
	], {
		I: '#forge:plates/wrought_iron',
		G: '#forge:glass',
		C: '#gtceu:circuits/lv',
		W: 'gtceu:red_alloy_single_wire'
	}).id('tfg:shaped/waterframes_frame')

	event.recipes.gtceu.assembler('tfg:waterframes_tv')
		.itemInputs('4x #forge:plates/aluminium', '2x #forge:glass', '#gtceu:circuits/lv', '2x gtceu:red_alloy_single_wire')
		.itemOutputs('waterframes:tv')
		.duration(300)
		.EUt(GTValues.VA[GTValues.LV])

	// Remote: a handful of copper and a circuit.
	event.shaped('waterframes:remote', [
		'CRC',
		'CKC',
		'CCC'
	], {
		C: '#forge:plates/copper',
		R: 'minecraft:redstone',
		K: '#gtceu:circuits/lv'
	}).id('tfg:shaped/waterframes_remote')

	//#endregion

	//#region MV - the large screen and the projector

	event.recipes.gtceu.assembler('tfg:waterframes_big_tv')
		.itemInputs('6x #forge:plates/aluminium', '4x #forge:glass', '#gtceu:circuits/mv', '4x gtceu:red_alloy_single_wire')
		.itemOutputs('waterframes:big_tv')
		.duration(600)
		.EUt(GTValues.VA[GTValues.MV])

	// Projector needs real optics, hence the precision mechanism.
	event.recipes.gtceu.assembler('tfg:waterframes_projector')
		.itemInputs('4x #forge:plates/stainless_steel', '2x #forge:glass', '#gtceu:circuits/mv', 'create:precision_mechanism')
		.itemOutputs('waterframes:projector')
		.duration(600)
		.EUt(GTValues.VA[GTValues.MV])

	//#endregion
}
