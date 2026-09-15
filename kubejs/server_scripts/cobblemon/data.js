// priority: 0
"use strict";

/**
 * TFC capability data for Cobblemon content.
 *
 * This file is load-bearing. TFC's food system is capability-driven: an edible
 * item carrying no food capability ignores the nutrition wheel entirely and
 * stacks freely. Cobblemon adds ~70 berries plus apricorns and other edibles, so
 * without this none of them would feed a player properly or count towards
 * nutrition.
 *
 * They are, however, deliberately NON-PERISHABLE - see DECAY_NEVER below.
 *
 * @param {Internal.TFCDataEventJS} event
 */
const registerCobblemonData = (event) => {

	const $Nutrient = Java.loadClass('net.dries007.tfc.common.capabilities.food.Nutrient')

	/**
	 * Cobblemon food does not rot, by design.
	 *
	 * TFC reads this through FoodHandler.getDecayDateModifier(), which is
	 *     mod == 0 ? Infinity : 1 / mod
	 * and calculateRottenDate() returns NEVER_DECAY_DATE when it sees Infinity. So zero here is
	 * the supported "never expires" value, not an instant-rot edge case - and it is much better
	 * than dropping the food capability, which would also cost these items their nutrition and
	 * hunger values.
	 *
	 * The per-item `decay` numbers in constants.js are left in place but are no longer applied;
	 * they are what to restore if this is ever reverted.
	 *
	 * Worth knowing: this does make Cobblemon berries the one food in the pack with an infinite
	 * shelf life, so they sidestep TFC's preservation chain - salting, cellars, the lot. That is
	 * the accepted trade: a Poke Ball berry is a game item, not a perishable.
	 */
	const DECAY_NEVER = 0

	//#region Berries, apricorns and other edibles

	global.COBBLEMON_BERRIES.forEach(berry => {

		event.itemHeat(berry.id, 1, null, null)

		event.foodItem(berry.id, food => {
			food.hunger(berry.hunger)
			food.saturation(berry.saturation)
			food.water(berry.water)
			food.decayModifier(DECAY_NEVER)

			// TFC exposes each nutrient as its own builder method, e.g. food.fruit(0.5)
			$Nutrient.VALUES.forEach(nutrient => {
				const nutrientName = nutrient.getSerializedName()
				if (nutrientName === berry.nutrient) {
					food[nutrientName](0.5)
				}
			})
		})

		// Berries and apricorns are small and light - they must not be a free
		// way to stuff a vessel.
		event.itemSize(berry.id, 'very_small', 'very_light')
	})

	global.COBBLEMON_FOODS.forEach(item => {

		event.itemHeat(item.id, 1, null, null)

		event.foodItem(item.id, food => {
			food.hunger(item.hunger)
			food.saturation(item.saturation)
			food.water(item.water)
			food.decayModifier(DECAY_NEVER)

			$Nutrient.VALUES.forEach(nutrient => {
				const nutrientName = nutrient.getSerializedName()
				if (nutrientName === item.nutrient) {
					food[nutrientName](0.5)
				}
			})
		})

		event.itemSize(item.id, 'small', 'light')
	})

	//#endregion

	//#region Climate ranges for the registered berry crops

	global.COBBLEMON_BERRIES.filter(berry => berry.crop).forEach(berry => {

		const name = berry.id.split(':')[1]

		event.climateRange(climate => {
			climate.minTemperature(berry.minTemp)
			climate.maxTemperature(berry.maxTemp)
			climate.minHydration(berry.minHydration)
			climate.maxHydration(berry.maxHydration)
			climate.temperatureWiggle(3)
			climate.hydrationWiggle(5)
		}, `tfg:${name}`)
	})

	//#endregion

	//#region Wood fuel

	// TFC gates what may be put in a firepit with #tfc:firepit_fuel (which Cobblemon
	// logs are already in, via #minecraft:logs) but takes the burn temperature and
	// duration from a fuel definition, which only exists for TFC's own woods. Without
	// this a Cobblemon log is accepted by a firepit, forge or pit kiln and then does
	// nothing useful in it.
	//
	// Values are TFC's, matched to the nearest analogue - see global.COBBLEMON_WOOD.
	// Purity 0.95 is what every TFC wood except pine uses.
	global.COBBLEMON_WOOD.forEach(wood => {
		event.fuel(wood.logs, wood.burnTemperature, wood.burnDuration, 0.95)
	})

	//#endregion

	//#region Item sizes for everything else

	// Balls are pocketable; the machines emphatically are not.
	;['cobblemon:poke_ball', 'cobblemon:great_ball', 'cobblemon:ultra_ball', 'cobblemon:master_ball']
		.forEach(id => event.itemSize(id, 'small', 'light'))

	global.COBBLEMON_APRICORN_BALLS.forEach(([ball]) => event.itemSize(ball, 'small', 'light'))
	global.COBBLEMON_SPECIALTY_BALLS.forEach(([ball]) => event.itemSize(ball, 'small', 'light'))
	global.COBBLEMON_EVOLUTION_STONES.forEach(([stone]) => event.itemSize(stone, 'small', 'medium'))

	event.itemSize('cobblemon:ice_stone', 'small', 'medium')
	event.itemSize('cobblemon:healing_machine', 'very_large', 'very_heavy')
	event.itemSize('cobblemon:pc', 'very_large', 'very_heavy')
	event.itemSize('cobblemon:link_cable', 'very_small', 'very_light')
	// The unfired shells, like the fired balls, are pocketable but heavier - wet clay.
	//
	// The itemHeat is load-bearing, not decoration. A TFC forge (and firepit) validates its input
	// slots with HeatCapability.has(stack), so an item carrying no heat capability cannot be put in
	// at all - the slot simply refuses it. Shipping only the tfc.heating recipe in recipes.js is not
	// enough: the recipe describes what happens once the item is hot, and the item never gets that
	// far. This is why TFG does the same for its own unfired clay (tfg:decorative_vase/unfired).
	//
	// Heat capacity 1 matches TFG's unfired vases - clay, heats at an ordinary rate. The two nulls
	// are forging and welding temperatures, which do not apply: these are fired, not worked.
	event.itemSize('tfg:unfired_poke_ball', 'small', 'medium')
	event.itemHeat('tfg:unfired_poke_ball', 1, null, null)
	global.COBBLEMON_APRICORN_BALLS.forEach(([ball]) => {
		const name = ball.split(':')[1].replace('_ball', '')
		event.itemSize(`tfg:unfired_${name}_ball`, 'small', 'medium')
		event.itemHeat(`tfg:unfired_${name}_ball`, 1, null, null)
	})

	//#endregion
}
