// priority: 0
"use strict";

/*
 * Berry crops, registered as real TerraFirmaCraft crops.
 *
 * This is Route B of the integration plan: rather than leaving Cobblemon's own
 * berry-soil/mulch agriculture running alongside TFC's, the berries become TFC
 * crops outright, so there is ONE farming system. Climate decides WHERE a berry
 * grows, never WHETHER it can be had - the staples registered here all carry
 * deliberately wide climate ranges (see constants.js).
 *
 * Only the 15 mechanically important berries are registered as crops. The
 * remaining 54 keep their food and climate data but stay on Cobblemon's own
 * bushes until their art exists.
 *
 * @param {Registry.Block} event
 */
const registerCobblemonBerryCrops = (event) => {

	const $FarmlandBlockEntity = Java.loadClass("net.dries007.tfc.common.blockentities.FarmlandBlockEntity")

	const NUTRIENTS = {
		NITROGEN: $FarmlandBlockEntity.NutrientType.NITROGEN,
		PHOSPHOROUS: $FarmlandBlockEntity.NutrientType.PHOSPHOROUS,
		POTASSIUM: $FarmlandBlockEntity.NutrientType.POTASSIUM
	}

	global.COBBLEMON_BERRIES.filter(berry => berry.crop).forEach(berry => {

		// 'cobblemon:cheri_berry' -> 'cheri_berry', so the block lands on
		// tfg:cheri_berry and picks up tfg:block/crop/cheri_berry_age_N.
		const name = berry.id.split(':')[1]

		event.create(`tfg:${name}`, 'tfc:crop')
			.translationKey(`block.tfg.${name}`)
			.mapColor('plant')
			.soundType('crop')
			.nutrient(NUTRIENTS[berry.farmland])
			// 5, not 6. kubejs_tfc's stages(N) registers N+1 age states (0..N) - TFG's radish uses
			// stages(5) and has age=0..5 with six textures to match. The berry art only goes to
			// <name>_age_4, and the blockstates only declare age=0..4, so stages(5) gave the block a
			// sixth state with no model behind it: the crop rendered as missing-texture at exactly
			// the point it matured. stages(4) lines the block up with the art that exists.
			.stages(4)
			.hardness(0.4)
			.growthModifier(0.9)
			.tagBlock('tfc:plants')
			.tagBlock('minecraft:mineable/hoe')
			.tagBlock('tfc:mineable_with_sharp_tool')
			.tagBlock('tfc:crops')
			.existingProductItem(berry.id)
			.seedItem(seed => {
				seed.texture(`tfg:item/${name}_seed`)
				// TFG tags its own crop seeds; without these the seed is not a seed as far as
				// anything else is concerned - #forge:seeds is what the mulch recipes in
				// recipes.mints_mulch.js take, among others.
				seed.tag('tfc:seeds')
				seed.tag('forge:seeds')
			})
			.deadBlock(dead => {
				dead.hardness(0.2)
				dead.soundType('crop')
				dead.tagBlock('minecraft:mineable/hoe')
				dead.tagBlock('tfg:dead_crops')
			})

		// The wild variant, and the only way to obtain the first seed.
		//
		// A TFC crop is self-sustaining once planted - harvesting returns seed as well as food -
		// but nothing bootstraps it. TFC's own crops are started from wild plants found in the
		// world, and every TFG crop registers one for exactly that reason (tfg:sunflower_wild and
		// friends, see tfg/blocks.crops.js). These fifteen did not, so the crop blocks and their
		// seed items existed with no way to reach either: Route B moved the berries onto TFC
		// farming and left the door locked.
		//
		// 'default' rather than 'double': these are single-block crops, unlike TFG's sunflower.
		event.create(`tfg:${name}_wild`, 'tfc:wild_crop')
			.type('default')
			.soundType('crop')
			.seeds(`tfg:${name}_seeds`)
			.food(berry.id)
			.hardness(0.2)
			.tagBoth('tfc:wild_crops')
			.tagBlock('tfc:plants')
			.tagBlock('minecraft:mineable/hoe')
			.tagBlock('tfc:mineable_with_sharp_tool')
			.tagBlock('tfc:can_be_snow_piled')
			// Hidden like TFG hides its own wild crops: it is a worldgen plant, not a craftable.
			.tagItem('c:hidden_from_recipe_viewers')
	})
}
