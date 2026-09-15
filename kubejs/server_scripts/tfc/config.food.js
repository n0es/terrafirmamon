// priority: 0
"use strict";

/**
 * TFC survival tuning - food decay, hunger, thirst and regeneration.
 *
 * foodDecayModifier is a Forge SERVER config. Forge reads it from
 * saves/<world>/serverconfig/tfc-server.toml, falling back to defaultconfigs/,
 * so editing a file only covers one instance. Setting it here means the number
 * ships with the pack and reaches every instance, server and existing world.
 *
 * DANGER, learned the hard way: ForgeConfigSpec values are generic, so the cast
 * to Integer or Double happens at the CALLER, not inside set() or get(). Rhino
 * hands a plain JS number over as a Double, so set(24) on an IntValue silently
 * stores 24.0 and writes it back to the toml. Reading it back from KubeJS looks
 * perfectly fine - Rhino inserts no checkcast - but the moment TFC's own Java
 * does `int w = ...get()` the JVM throws a bare ClassCastException. That surfaced
 * as "Invalid player data" on login and locked the world out entirely.
 *
 * So: every value below is explicitly boxed to the exact type the config
 * declares, and verified by class name rather than by value.
 */
const $Integer = Java.loadClass('java.lang.Integer')
const $Double = Java.loadClass('java.lang.Double')

const TFC_FOOD_TUNING = {
	// TFC default 1.0. LOWER means food lasts LONGER: 0.5 is double shelf life.
	// NEVER set this to 0. TFC strips creation dates off food at zero and that
	// is explicitly not reversible.
	decayModifier: 0.5,
	// TFC default 6 hours. How far apart two stacks can be created and still
	// stack together. Must stay a whole number: this one is an IntValue.
	decayStackWindow: 24,

	// The three below make survival a little gentler without removing the
	// mechanic. Each is a straight multiplier, so they are cheap to retune -
	// change the number, /reload, done.

	// TFC default 1.0, written to the toml as passiveExhaustionMultiplier.
	// Exhaustion is the hidden stat that decides when you get hungry, and TFC
	// accrues it just for existing: 1.0 burns a full hunger bar every 2.5 days.
	// 0.65 stretches that to a little under 4.
	passiveExhaustion: 0.65,
	// TFC default 5.0, written to the toml as thirstModifier1. Thirst is spent
	// in lockstep with hunger, so this is how much of the bar goes per tick of
	// hunger loss. Cut slightly harder than exhaustion (-40% against -35%), so
	// water outlasts food rather than both emptying together - running dry far
	// from a source is the harsher of the two failure modes.
	thirst: 3.0,
	// TFC default 1.0. Passive regeneration is 0.2 HP/s, rising to 0.6 HP/s
	// while both hunger and thirst are above 80%. Raising this rewards keeping
	// them topped up rather than just softening the penalty for not.
	naturalRegeneration: 1.25
}

/** Set a config value and confirm the stored object is the expected Java type. */
const setConfigChecked = (configValue, boxedValue, expectedClass, label) => {
	configValue.set(boxedValue)
	var actualClass = configValue.get().getClass().getName()
	if (actualClass !== expectedClass) {
		console.error(`[tfg] REFUSING ${label}: stored ${actualClass}, expected ${expectedClass}`)
		return false
	}
	return true
}

/** @param {Internal.ServerEventJS} event */
const applyTFCFoodTuning = (event) => {

	const $TFCConfig = Java.loadClass('net.dries007.tfc.config.TFCConfig')

	try {
		// Server configs load with the world, so this must not run earlier.
		if (!$TFCConfig.isServerConfigLoaded()) return

		var okModifier = setConfigChecked(
			$TFCConfig.SERVER.foodDecayModifier,
			$Double.valueOf(TFC_FOOD_TUNING.decayModifier),
			'java.lang.Double', 'foodDecayModifier')

		var okWindow = setConfigChecked(
			$TFCConfig.SERVER.foodDecayStackWindow,
			// String() first: Rhino treats JS numbers as doubles, so passing 24
			// straight in makes it pick Integer.valueOf(String) with "24.0".
			$Integer.valueOf(String(TFC_FOOD_TUNING.decayStackWindow)),
			'java.lang.Integer', 'foodDecayStackWindow')

		// All three are DoubleValue, so they avoid the Integer boxing trap above.
		var okExhaustion = setConfigChecked(
			$TFCConfig.SERVER.passiveExhaustionModifier,
			$Double.valueOf(TFC_FOOD_TUNING.passiveExhaustion),
			'java.lang.Double', 'passiveExhaustionModifier')

		var okThirst = setConfigChecked(
			$TFCConfig.SERVER.thirstModifier,
			$Double.valueOf(TFC_FOOD_TUNING.thirst),
			'java.lang.Double', 'thirstModifier')

		var okRegen = setConfigChecked(
			$TFCConfig.SERVER.naturalRegenerationModifier,
			$Double.valueOf(TFC_FOOD_TUNING.naturalRegeneration),
			'java.lang.Double', 'naturalRegenerationModifier')

		if (okModifier && okWindow) {
			console.info(`[tfg] TFC food decay: modifier ${$TFCConfig.SERVER.foodDecayModifier.get()}, `
				+ `stack window ${$TFCConfig.SERVER.foodDecayStackWindow.get()}h (types verified)`)
		}

		if (okExhaustion && okThirst && okRegen) {
			console.info(`[tfg] TFC survival: exhaustion x${$TFCConfig.SERVER.passiveExhaustionModifier.get()}, `
				+ `thirst x${$TFCConfig.SERVER.thirstModifier.get()}, `
				+ `regen x${$TFCConfig.SERVER.naturalRegenerationModifier.get()} (types verified)`)
		}

	} catch (error) {
		console.error(`[tfg] could not apply TFC food decay tuning: ${error}`)
	}
}

// Apply at script load too, so /reload is enough to retune. The
// isServerConfigLoaded() guard makes this a no-op during initial datapack load.
applyTFCFoodTuning()
