// priority: 0
"use strict";

/**
 * Ancient balls - the Hisui line.
 *
 * Cobblemon ships a crafting recipe for fifteen of the sixteen; recipes.js wipes them along
 * with everything else via event.remove({ mod: 'cobblemon' }), and nothing rebuilt them, so
 * the whole ancient line - balls AND the sixteen Pokerods that take one - was unobtainable.
 *
 * These are Cobblemon's own recipes re-emitted on the jar's shape:
 *
 *     ' t '      t, b = that ball's apricorn        -> 4 balls
 *     'lcr'      l, r = its tumblestone variant
 *     ' b '      c    = the tier material
 *
 * with one deliberate change. Cobblemon keys the centre slot on #c:ingots/{copper,iron,gold};
 * this pack has no plain iron, so tier 2 uses wrought iron - TFC's equivalent, and what the
 * pack's own iron-age recipes already use. See global.COBBLEMON_ANCIENT_BALLS in
 * startup_scripts/cobblemon/constants.js for the full table.
 *
 * **cobblemon:ancient_origin_ball is deliberately absent.** Cobblemon ships no recipe for it
 * either - it is the legendary of the set and stays a reward item. Its rod is consequently the
 * one Pokerod still listed in tags.hidden.js.
 *
 * On tumblestone, which is what these cost: it is NOT craftable and is not meant to be. It is
 * brushed out of suspicious blocks in Cobblemon's ruins, which do generate in this pack - the
 * pack overrides 57 of Cobblemon's biome tags with TFG biomes, so the ruins gated on
 * cobblemon:is_lush (rooted_arch -> tumblestone) and cobblemon:is_deep_dark (deep_crypt ->
 * black tumblestone) both place. That makes these recipes an expedition cost rather than a
 * bench cost, which is the point of an ancient ball.
 *
 * Two ruins are still dead, both gated on minecraft:is_overworld, which has no TFG biome in it:
 * crumbling_arch and lost_ruins. Sky tumblestone is the variant most exposed by that, so if the
 * feather/wing/jet line turns out to be unreachable in practice, the fix is another
 * lithostitched add_features modifier next to cobblemon_agriculture.json - NOT a craft here.
 *
 * @param {Internal.RecipesEventJS} event
 */
const registerCobblemonAncientRecipes = (event) => {

	//#region Ancient balls - apricorn, tumblestone and a tier metal

	global.COBBLEMON_ANCIENT_BALLS.forEach(([ball, apricorn, tumblestone, tier]) => {
		event.shaped(`4x ${ball}`, [
			' t ',
			'lcr',
			' b '
		], {
			t: apricorn,
			b: apricorn,
			l: tumblestone,
			r: tumblestone,
			c: tier
		}).id(`tfg:shaped/${global.linuxUnfucker(ball)}`)
	})

	//#endregion
}
