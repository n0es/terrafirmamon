// priority: 0
"use strict";

/**
 * Cobblemon's cooked consumables: EV mochi, IV candies, Aprijuice, and the two
 * one-off confections (Rage Candy Bar, Sweet Heart).
 *
 * Every item in this file had NO recipe at all. Cobblemon ships all of them as
 * Campfire Pot recipes, and recipes.js opens with event.remove({ mod: 'cobblemon' }),
 * which wipes the pot recipes along with everything else - and the Campfire Pot
 * itself has no recipe in this pack, so restoring them there would have swapped one
 * dead end for another. They are rebuilt here on stations this pack actually has.
 *
 * Cobblemon's own ingredient LOGIC is kept throughout, because it is a real system
 * rather than flavour text:
 *
 *   Six berries each map to one stat, and the same six drive both families:
 *
 *     pomeg  -> HP          kelpsy -> Attack      qualot -> Defence
 *     hondew -> Sp. Attack  grepa  -> Sp. Defence tamato -> Speed
 *
 *   IV candies pair that berry with a second ingredient that decides the DIRECTION:
 *   a sweetener raises the IV, an Enigma Berry lowers it. So health/mighty/tough/
 *   smart/courage/quick are the honey ones and sickly/weak/brittle/numb/coward/slow
 *   are the enigma ones, exactly as upstream.
 *
 *   EV mochi pair the same berry with a grain and honey - they are rice cakes.
 *
 * Two substitutions, both forced by TerraFirmaGreg:
 *
 *   minecraft:honeycomb   -> firmalife:raw_honey. Vanilla bees do not exist here;
 *                            Firmalife owns beekeeping (see recipes.wax.js, which
 *                            deletes the leftover GT honeycomb extractor recipes).
 *   minecraft:honey_bottle -> firmalife:jar/honey. Same reason - a jar of honey is
 *                            this pack's bottled honey.
 *
 * The twelve stat berries and the Enigma Berry are wild rather than farmed: they
 * are among the 54 berries that stay on Cobblemon's own bushes (see
 * blocks.berries.js), which do generate here because
 * data/tfg/lithostitched/worldgen_modifier/cobblemon_agriculture.json reconnects
 * cobblemon:berry_groves to TFG's biomes. Training candy therefore costs a berry
 * hunt, which is the right price for something that edits a Pokemon's IVs.
 *
 * @param {Internal.RecipesEventJS} event
 */
const registerCobblemonCookingRecipes = (event) => {

	// The six stat berries, in Cobblemon's own order. Shared by both families
	// below so the two can never drift apart.
	// [stat name (for comments), berry, mochi, raising candy, lowering candy]
	const COBBLEMON_STAT_BERRIES = [
		['hp', 'cobblemon:pomeg_berry', 'health_mochi', 'health_candy', 'sickly_candy'],
		['attack', 'cobblemon:kelpsy_berry', 'muscle_mochi', 'mighty_candy', 'weak_candy'],
		['defence', 'cobblemon:qualot_berry', 'resist_mochi', 'tough_candy', 'brittle_candy'],
		['special_attack', 'cobblemon:hondew_berry', 'genius_mochi', 'smart_candy', 'numb_candy'],
		['special_defence', 'cobblemon:grepa_berry', 'clever_mochi', 'courage_candy', 'coward_candy'],
		['speed', 'cobblemon:tamato_berry', 'swift_mochi', 'quick_candy', 'slow_candy']
	]

	//#region EV mochi - pounded rice, in a mixing bowl

	// Mochi is pounded steamed rice, so it is made where this pack does its
	// pounding and blending: Firmalife's mixing bowl, the same station TFG's own
	// medicine pills and powders come out of.
	//
	// #tfg:mochi_grains (built in tags.js) is cooked rice OR Cobblemon's own
	// hearty grains. Rice is the reliable half - it is farmed, and it is what the
	// pack owner asked these run on - while hearty grains is accepted as well so
	// Cobblemon's grain crop is not a dead item where it does generate.
	//
	// Three per bowl, matching Cobblemon's own output.
	const mochi = COBBLEMON_STAT_BERRIES.map(([, berry, mochiItem]) => [mochiItem, berry])
		.concat([
			// Fresh Start Mochi clears EVs rather than training one, so it takes
			// the Enigma Berry - the same berry the IV-lowering candies use.
			['fresh_start_mochi', 'cobblemon:enigma_berry'],
			// Potato Mochi is food, not training. Plain potato, as upstream.
			['potato_mochi', 'tfc:food/potato']
		])

	mochi.forEach(([item, flavour]) => {
		event.recipes.firmalife.mixing_bowl()
			.itemIngredients([
				'#tfg:mochi_grains',
				'firmalife:jar/honey',
				flavour
			])
			.outputItem(`3x cobblemon:${item}`)
			.id(`tfg:mixing_bowl/${item}`)
	})

	//#endregion

	//#region IV candies - Cobblemon's own 3x3, on a bench

	// Cobblemon's shape, kept exactly:
	//
	//     BRB     B = the stat's berry  (x4, corners)
	//     RCR     R = the direction     (x4, edges)
	//     BRB     C = an exp candy      (centre)
	//
	// The centre candy sets the yield: an L candy makes one, an XL makes three.
	// That is upstream's own scaling and it is why the exp candy chain in
	// recipes.medicine.js has a top end at all.

	// Sweetened raises the IV, soured with an Enigma Berry lowers it.
	const CANDY_RAISE = 'firmalife:raw_honey'
	const CANDY_LOWER = 'cobblemon:enigma_berry'

	// [size suffix for the recipe id, exp candy in the centre, candies produced]
	const CANDY_SIZES = [
		['l', 'cobblemon:exp_candy_l', 1],
		['xl', 'cobblemon:exp_candy_xl', 3]
	]

	COBBLEMON_STAT_BERRIES.forEach(([, berry, , raising, lowering]) => {
		;[[raising, CANDY_RAISE], [lowering, CANDY_LOWER]]
			.forEach(([candy, reagent]) => {
				CANDY_SIZES.forEach(([size, expCandy, count]) => {
					event.shaped(`${count}x cobblemon:${candy}`, [
						'BRB',
						'RCR',
						'BRB'
					], {
						B: berry,
						R: reagent,
						C: expCandy
					}).id(`tfg:shaped/${candy}_${size}`)
				})
			})
	})

	//#endregion

	//#region Aprijuice - one per apricorn colour

	// Cobblemon's own recipe, unchanged: the apricorn plus the two herbs that make
	// it a ride-stat drink. Both herbs are craftable here (see the herbs block at
	// the top of recipes.medicine.js), so this needed no substitution at all.
	;['black', 'blue', 'green', 'pink', 'red', 'white', 'yellow'].forEach(colour => {
		event.shapeless(`cobblemon:aprijuice_${colour}`, [
			`cobblemon:${colour}_apricorn`,
			'cobblemon:pep_up_flower',
			'cobblemon:energy_root'
		]).id(`tfg:shapeless/aprijuice_${colour}`)
	})

	//#endregion

	//#region One-off confections

	// Rage Candy Bar - Mahogany Town's souvenir. Upstream is wheat, milk, sugar and
	// cocoa; #tfc:foods/grains and #tfc:foods/dairy are this pack's wheat and milk,
	// and Firmalife's cocoa powder is its cocoa.
	event.shapeless('cobblemon:rage_candy_bar', [
		'#tfc:foods/grains',
		'#tfc:foods/dairy',
		'minecraft:sugar',
		'firmalife:food/cocoa_powder'
	]).id('tfg:shapeless/rage_candy_bar')

	// Sweet Heart - a chocolate. Upstream pairs two cocoa with sugar and an Eggant
	// Berry, which is not an item in this version, so the sweet berry (mago) takes
	// its place. The doubled cocoa keeps this distinct from love_sweet in
	// recipes.held_items.js, which is one cocoa powder and one sugar.
	event.shapeless('cobblemon:sweet_heart', [
		'2x firmalife:food/cocoa_powder',
		'minecraft:sugar',
		'cobblemon:mago_berry'
	]).id('tfg:shapeless/sweet_heart')

	//#endregion
}
