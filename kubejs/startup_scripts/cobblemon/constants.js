// priority: 0
"use strict";

/**
 * Shared data tables for the Cobblemon integration.
 *
 * Climate ranges follow the pack brief that Cobblemon must not be hard to get:
 * staples span most of the temperate band so no player is locked out of healing
 * berries by where they spawned, while exotics are narrower and worth travelling
 * for. Nutrients are spread evenly so berry farming rotates soil properly.
 *
 * cropStage: true means the berry is registered as a real TFC crop and has
 * generated crop assets. The remaining berries are climate/food data only until
 * their art exists.
 *
 * decay is TFC's decayModifier and is INVERSE: a HIGHER number rots FASTER.
 * Apricorns sit at 0.5 - half the TFC baseline, and an eighth of the 4.0 the
 * berries use - because they are a crafting material for Poke Balls, not a snack.
 * Losing a stack to rot before you can fire the clay is pure frustration, so they
 * keep 8x longer than the berries around them.
 */

global.COBBLEMON_BERRIES = [
	{ id: 'cobblemon:aguav_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 1, saturation: 0.23, water: 4, decay: 4.48, farmland: 'NITROGEN' },
	{ id: 'cobblemon:apicot_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: -16, maxTemp: 4, minHydration: 32, maxHydration: 58, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.48, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:aspear_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 2, saturation: 0.3, water: 4, decay: 4.17, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:babiri_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: -6, maxTemp: 11, minHydration: 42, maxHydration: 66, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 4, decay: 4.47, farmland: 'NITROGEN' },
	{ id: 'cobblemon:belue_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: -16, maxTemp: 4, minHydration: 32, maxHydration: 58, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.48, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:bluk_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: -16, maxTemp: 4, minHydration: 32, maxHydration: 58, nutrient: 'fruit', hunger: 2, saturation: 0.3, water: 3, decay: 4.25, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:charti_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 10, maxTemp: 24, minHydration: 22, maxHydration: 45, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.47, farmland: 'NITROGEN' },
	{ id: 'cobblemon:cheri_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 2, saturation: 0.3, water: 4, decay: 4.17, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:chesto_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 2, saturation: 0.3, water: 4, decay: 4.17, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:chilan_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 5, maxTemp: 21, minHydration: 35, maxHydration: 58, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.47, farmland: 'NITROGEN' },
	{ id: 'cobblemon:chople_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: -6, maxTemp: 11, minHydration: 42, maxHydration: 66, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 4, decay: 4.47, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:coba_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: -12, maxTemp: 5, minHydration: 27, maxHydration: 49, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.47, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:colbur_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 0, maxTemp: 17, minHydration: 27, maxHydration: 47, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.47, farmland: 'NITROGEN' },
	{ id: 'cobblemon:cornn_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 5, maxTemp: 22, minHydration: 35, maxHydration: 60, nutrient: 'fruit', hunger: 1, saturation: 0.23, water: 3, decay: 4.48, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:custap_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 0, maxTemp: 20, minHydration: 45, maxHydration: 70, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 4, decay: 4.48, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:durin_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 0, maxTemp: 20, minHydration: 45, maxHydration: 70, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 4, decay: 4.48, farmland: 'NITROGEN' },
	{ id: 'cobblemon:enigma_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 0, maxTemp: 20, minHydration: 45, maxHydration: 70, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 4, decay: 4.48, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:figy_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 1, saturation: 0.23, water: 4, decay: 4.48, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:ganlon_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 5, maxTemp: 22, minHydration: 35, maxHydration: 60, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.48, farmland: 'NITROGEN' },
	{ id: 'cobblemon:grepa_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 0, maxTemp: 20, minHydration: 45, maxHydration: 70, nutrient: 'fruit', hunger: 1, saturation: 0.17, water: 4, decay: 4.48, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:haban_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 3, maxTemp: 18, minHydration: 33, maxHydration: 58, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.47, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:hondew_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 22, maxTemp: 35, minHydration: 0, maxHydration: 20, nutrient: 'fruit', hunger: 1, saturation: 0.17, water: 2, decay: 4.48, farmland: 'NITROGEN' },
	{ id: 'cobblemon:hopo_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: -16, maxTemp: 4, minHydration: 32, maxHydration: 58, nutrient: 'fruit', hunger: 1, saturation: 0.17, water: 3, decay: 4.48, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:iapapa_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 1, saturation: 0.23, water: 4, decay: 4.48, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:jaboca_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 5, maxTemp: 22, minHydration: 35, maxHydration: 60, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.48, farmland: 'NITROGEN' },
	{ id: 'cobblemon:kasib_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 2, maxTemp: 17, minHydration: 57, maxHydration: 82, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 4, decay: 4.47, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:kebia_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 4, maxTemp: 20, minHydration: 55, maxHydration: 80, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 4, decay: 4.47, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:kee_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 0, maxTemp: 20, minHydration: 45, maxHydration: 70, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 4, decay: 4.48, farmland: 'NITROGEN' },
	{ id: 'cobblemon:kelpsy_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: -16, maxTemp: 4, minHydration: 32, maxHydration: 58, nutrient: 'fruit', hunger: 1, saturation: 0.17, water: 3, decay: 4.48, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:lansat_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: -16, maxTemp: 4, minHydration: 32, maxHydration: 58, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.48, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:leppa_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 4, decay: 4.48, farmland: 'NITROGEN' },
	{ id: 'cobblemon:liechi_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 16, maxTemp: 30, minHydration: 75, maxHydration: 100, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 5, decay: 3.5, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:lum_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 4, decay: 4.48, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:mago_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 1, saturation: 0.23, water: 4, decay: 4.48, farmland: 'NITROGEN' },
	{ id: 'cobblemon:magost_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 16, maxTemp: 30, minHydration: 75, maxHydration: 100, nutrient: 'fruit', hunger: 1, saturation: 0.23, water: 5, decay: 4.48, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:maranga_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 16, maxTemp: 30, minHydration: 75, maxHydration: 100, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 5, decay: 4.48, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:micle_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 5, maxTemp: 22, minHydration: 35, maxHydration: 60, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.48, farmland: 'NITROGEN' },
	{ id: 'cobblemon:nanab_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 16, maxTemp: 30, minHydration: 75, maxHydration: 100, nutrient: 'fruit', hunger: 2, saturation: 0.3, water: 5, decay: 4.25, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:nomel_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: -16, maxTemp: 4, minHydration: 32, maxHydration: 58, nutrient: 'fruit', hunger: 1, saturation: 0.23, water: 3, decay: 4.48, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:occa_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 22, maxTemp: 35, minHydration: 22, maxHydration: 44, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.47, farmland: 'NITROGEN' },
	{ id: 'cobblemon:oran_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 2, saturation: 0.3, water: 4, decay: 4.08, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:pamtre_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 16, maxTemp: 30, minHydration: 75, maxHydration: 100, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 5, decay: 4.48, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:passho_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 9, maxTemp: 24, minHydration: 75, maxHydration: 99, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 5, decay: 4.47, farmland: 'NITROGEN' },
	{ id: 'cobblemon:payapa_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 10, maxTemp: 25, minHydration: 28, maxHydration: 50, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.47, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:pecha_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 2, saturation: 0.3, water: 4, decay: 4.17, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:persim_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 2, saturation: 0.3, water: 4, decay: 4.17, farmland: 'NITROGEN' },
	{ id: 'cobblemon:petaya_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 22, maxTemp: 35, minHydration: 0, maxHydration: 20, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 2, decay: 4.48, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:pinap_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 22, maxTemp: 35, minHydration: 0, maxHydration: 20, nutrient: 'fruit', hunger: 2, saturation: 0.3, water: 2, decay: 4.25, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:pomeg_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 0, maxTemp: 20, minHydration: 45, maxHydration: 70, nutrient: 'fruit', hunger: 1, saturation: 0.17, water: 4, decay: 4.48, farmland: 'NITROGEN' },
	{ id: 'cobblemon:qualot_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 16, maxTemp: 30, minHydration: 75, maxHydration: 100, nutrient: 'fruit', hunger: 1, saturation: 0.17, water: 5, decay: 4.48, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:rabuta_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 22, maxTemp: 35, minHydration: 0, maxHydration: 20, nutrient: 'fruit', hunger: 1, saturation: 0.23, water: 2, decay: 4.48, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:rawst_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 2, saturation: 0.3, water: 4, decay: 4.17, farmland: 'NITROGEN' },
	{ id: 'cobblemon:razz_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 0, maxTemp: 20, minHydration: 45, maxHydration: 70, nutrient: 'fruit', hunger: 2, saturation: 0.3, water: 4, decay: 4.25, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:rindo_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 12, maxTemp: 26, minHydration: 62, maxHydration: 86, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 4, decay: 4.47, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:roseli_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 8, maxTemp: 22, minHydration: 55, maxHydration: 80, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 4, decay: 4.48, farmland: 'NITROGEN' },
	{ id: 'cobblemon:rowap_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: -16, maxTemp: 4, minHydration: 32, maxHydration: 58, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.48, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:salac_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 22, maxTemp: 35, minHydration: 0, maxHydration: 20, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 2, decay: 4.48, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:shuca_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 15, maxTemp: 30, minHydration: 15, maxHydration: 38, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.47, farmland: 'NITROGEN' },
	{ id: 'cobblemon:sitrus_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 4, decay: 4.48, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:spelon_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 22, maxTemp: 35, minHydration: 0, maxHydration: 20, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 2, decay: 4.48, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:starf_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 5, maxTemp: 22, minHydration: 35, maxHydration: 60, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.48, farmland: 'NITROGEN' },
	{ id: 'cobblemon:tamato_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 5, maxTemp: 22, minHydration: 35, maxHydration: 60, nutrient: 'fruit', hunger: 1, saturation: 0.17, water: 3, decay: 4.48, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:tanga_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 11, maxTemp: 26, minHydration: 65, maxHydration: 90, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 4, decay: 4.47, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:touga_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 0, maxTemp: 20, minHydration: 45, maxHydration: 70, nutrient: 'fruit', hunger: 1, saturation: 0.23, water: 4, decay: 4.48, farmland: 'NITROGEN' },
	{ id: 'cobblemon:wacan_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: -3, maxTemp: 13, minHydration: 27, maxHydration: 50, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.47, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:watmel_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 16, maxTemp: 30, minHydration: 75, maxHydration: 100, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 5, decay: 4.48, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:wepear_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: 5, maxTemp: 22, minHydration: 35, maxHydration: 60, nutrient: 'fruit', hunger: 2, saturation: 0.3, water: 3, decay: 4.25, farmland: 'NITROGEN' },
	{ id: 'cobblemon:wiki_berry', tier: 'staple', crop: true, apricorn: false, minTemp: -10, maxTemp: 30, minHydration: 20, maxHydration: 90, nutrient: 'fruit', hunger: 1, saturation: 0.23, water: 4, decay: 4.48, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:yache_berry', tier: 'exotic', crop: false, apricorn: false, minTemp: -22, maxTemp: -3, minHydration: 35, maxHydration: 62, nutrient: 'fruit', hunger: 1, saturation: 0.2, water: 3, decay: 4.47, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:black_apricorn', tier: 'staple', crop: false, apricorn: true, minTemp: -10, maxTemp: 25, minHydration: 10, maxHydration: 45, nutrient: 'fruit', hunger: 1, saturation: 0.15, water: 2, decay: 0.5, farmland: 'NITROGEN' },
	{ id: 'cobblemon:blue_apricorn', tier: 'staple', crop: false, apricorn: true, minTemp: -5, maxTemp: 20, minHydration: 55, maxHydration: 100, nutrient: 'fruit', hunger: 1, saturation: 0.15, water: 2, decay: 0.5, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:green_apricorn', tier: 'staple', crop: false, apricorn: true, minTemp: 5, maxTemp: 28, minHydration: 55, maxHydration: 95, nutrient: 'fruit', hunger: 1, saturation: 0.15, water: 2, decay: 0.5, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:pink_apricorn', tier: 'staple', crop: false, apricorn: true, minTemp: 0, maxTemp: 22, minHydration: 35, maxHydration: 70, nutrient: 'fruit', hunger: 1, saturation: 0.15, water: 2, decay: 0.5, farmland: 'NITROGEN' },
	{ id: 'cobblemon:red_apricorn', tier: 'staple', crop: false, apricorn: true, minTemp: 5, maxTemp: 30, minHydration: 25, maxHydration: 70, nutrient: 'fruit', hunger: 1, saturation: 0.15, water: 2, decay: 0.5, farmland: 'PHOSPHOROUS' },
	{ id: 'cobblemon:white_apricorn', tier: 'staple', crop: false, apricorn: true, minTemp: -15, maxTemp: 10, minHydration: 30, maxHydration: 70, nutrient: 'fruit', hunger: 1, saturation: 0.15, water: 2, decay: 0.5, farmland: 'POTASSIUM' },
	{ id: 'cobblemon:yellow_apricorn', tier: 'staple', crop: false, apricorn: true, minTemp: 10, maxTemp: 32, minHydration: 10, maxHydration: 45, nutrient: 'fruit', hunger: 1, saturation: 0.15, water: 2, decay: 0.5, farmland: 'NITROGEN' }
]

/** Non-berry Cobblemon edibles that still need TFC food capabilities. */
global.COBBLEMON_FOODS = [
	{ id: 'cobblemon:vivichoke', hunger: 2, saturation: 0.2, water: 3, nutrient: 'vegetables', decay: 3.0 },
	{ id: 'cobblemon:braised_vivichoke', hunger: 4, saturation: 0.4, water: 2, nutrient: 'vegetables', decay: 1.5 },
	{ id: 'cobblemon:vivichoke_dip', hunger: 2, saturation: 0.3, water: 1, nutrient: 'vegetables', decay: 2.0 },
	{ id: 'cobblemon:roasted_leek', hunger: 3, saturation: 0.3, water: 2, nutrient: 'vegetables', decay: 2.0 },
	{ id: 'cobblemon:medicinal_leek', hunger: 2, saturation: 0.2, water: 2, nutrient: 'vegetables', decay: 3.0 },
	{ id: 'cobblemon:leek_and_potato_stew', hunger: 6, saturation: 0.6, water: 4, nutrient: 'vegetables', decay: 1.0 },
	{ id: 'cobblemon:berry_juice', hunger: 1, saturation: 0.1, water: 6, nutrient: 'fruit', decay: 3.0 }
]

// Apricorn-coloured balls: [ball, apricorn]
//
// Every one of these is made the way the Poke Ball is - clay plus the apricorn, fired in a pit kiln
// (see recipes.js) - so the whole family shares one shape and one tier, and each of the seven
// apricorn colours has exactly one ball it belongs to. Red is the Poke Ball itself; the six below
// take the rest.
//
// The Premier Ball is here rather than with the specialty balls on purpose: it is cosmetically a
// plain ball, so building it out of a white apricorn like its siblings reads better than the GT
// assembler recipe it used to have. The Master Ball no longer claims the white apricorn.
global.COBBLEMON_APRICORN_BALLS = [
	['cobblemon:azure_ball', 'cobblemon:blue_apricorn'],
	['cobblemon:citrine_ball', 'cobblemon:yellow_apricorn'],
	['cobblemon:roseate_ball', 'cobblemon:pink_apricorn'],
	['cobblemon:slate_ball', 'cobblemon:black_apricorn'],
	['cobblemon:verdant_ball', 'cobblemon:green_apricorn'],
	['cobblemon:premier_ball', 'cobblemon:white_apricorn']
	// No ivory_ball in 1.5.2 despite the ancient_ivory_ball relic existing.
]

// Evolution stones from TFC gems. Gems turn up while mining from the very first
// stone age tunnels, so evolution is never blocked behind electricity.
// [stone, gem]
// NOTE: TFG replaces TFC's cut gems (tfc:gem/*) with GregTech equivalents, so the
// tfc: ids do not exist in this pack even though they are in TerraFirmaCraft's own
// lang file. Every id below was checked against the live EMI registry.
// Pyrite and emerald have no gtceu gem form, hence yellow garnet and vanilla emerald.
global.COBBLEMON_EVOLUTION_STONES = [
	['cobblemon:fire_stone', 'gtceu:ruby_gem'],
	['cobblemon:water_stone', 'gtceu:sapphire_gem'],
	['cobblemon:leaf_stone', 'minecraft:emerald'],
	['cobblemon:thunder_stone', 'gtceu:topaz_gem'],
	['cobblemon:moon_stone', 'gtceu:opal_gem'],
	['cobblemon:sun_stone', 'gtceu:yellow_garnet_gem'],
	['cobblemon:dusk_stone', 'minecraft:lapis_lazuli'],
	['cobblemon:dawn_stone', 'minecraft:amethyst_shard'],
	['cobblemon:shiny_stone', 'minecraft:diamond']
]

// Specialty balls, all LV assembler from a Great Ball.
// Themed items are all verified against the LIVE registry: TFG removes a number of
// vanilla items (gravel, coal, kelp) in favour of tfc:/gtceu: equivalents, and a
// recipe naming a missing item is dropped silently with no error in the log. The circuit number keeps
// each recipe distinct in EMI even where the item inputs overlap.
// [ball, themed item, circuit]
global.COBBLEMON_SPECIALTY_BALLS = [
	['cobblemon:dive_ball', 'tfc:plant/leafy_kelp', 1],
	['cobblemon:dusk_ball', 'minecraft:charcoal', 2],
	['cobblemon:fast_ball', 'minecraft:feather', 3],
	['cobblemon:heal_ball', 'minecraft:bone_meal', 4],
	['cobblemon:heavy_ball', 'gtceu:lead_ingot', 5],
	['cobblemon:level_ball', 'minecraft:paper', 6],
	['cobblemon:love_ball', 'minecraft:pink_dye', 7],
	['cobblemon:lure_ball', 'minecraft:string', 8],
	['cobblemon:luxury_ball', 'minecraft:gold_ingot', 9],
	['cobblemon:moon_ball', 'minecraft:bone', 10],
	['cobblemon:nest_ball', 'tfc:straw', 11],
	['cobblemon:net_ball', 'minecraft:cobweb', 12],
	// premier_ball moved to COBBLEMON_APRICORN_BALLS - it is a white-apricorn kiln ball now.
	['cobblemon:quick_ball', 'minecraft:sugar', 14],
	['cobblemon:repeat_ball', 'minecraft:redstone', 15],
	['cobblemon:timer_ball', 'minecraft:clock', 16],
	['cobblemon:friend_ball', 'tfc:food/wheat', 17],
	['cobblemon:sport_ball', 'minecraft:flint', 18],
	['cobblemon:safari_ball', 'minecraft:green_dye', 19],
	['cobblemon:park_ball', 'tfc:jute_fiber', 20],
	['cobblemon:beast_ball', 'minecraft:ender_pearl', 21],
	['cobblemon:cherish_ball', 'minecraft:red_dye', 22],
	['cobblemon:dream_ball', 'minecraft:phantom_membrane', 23]
]

/**
 * Ancient balls - [ball, apricorn, tumblestone, tier material].
 *
 * Cobblemon ships a recipe for each of these; recipes.js wipes them with
 * event.remove({ mod: 'cobblemon' }) like everything else, so they are rebuilt in
 * recipes.ancient.js on the jar's own shape (two apricorns, two tumblestones, one tier
 * material in the middle, four balls out).
 *
 * The tier material is the one change. Cobblemon keys the centre slot on
 * #c:ingots/{copper,iron,gold}; this pack has no plain iron, so tier 2 uses wrought iron -
 * TFC's equivalent and what the pack's own iron-age recipes use.
 *
 * ancient_origin_ball is deliberately absent: Cobblemon ships no recipe for it either. It is
 * the legendary of the set and stays a reward item, which is why its rod is the one Pokerod
 * still hidden in tags.hidden.js.
 */
global.COBBLEMON_ANCIENT_BALLS = [
	['cobblemon:ancient_poke_ball', 'cobblemon:red_apricorn', 'cobblemon:tumblestone', '#forge:ingots/copper'],
	['cobblemon:ancient_great_ball', 'cobblemon:red_apricorn', 'cobblemon:tumblestone', '#forge:ingots/wrought_iron'],
	['cobblemon:ancient_ultra_ball', 'cobblemon:yellow_apricorn', 'cobblemon:tumblestone', '#forge:ingots/gold'],
	['cobblemon:ancient_azure_ball', 'cobblemon:blue_apricorn', 'cobblemon:tumblestone', '#forge:ingots/copper'],
	['cobblemon:ancient_citrine_ball', 'cobblemon:yellow_apricorn', 'cobblemon:tumblestone', '#forge:ingots/copper'],
	['cobblemon:ancient_roseate_ball', 'cobblemon:pink_apricorn', 'cobblemon:tumblestone', '#forge:ingots/copper'],
	['cobblemon:ancient_slate_ball', 'cobblemon:black_apricorn', 'cobblemon:tumblestone', '#forge:ingots/copper'],
	['cobblemon:ancient_verdant_ball', 'cobblemon:green_apricorn', 'cobblemon:tumblestone', '#forge:ingots/copper'],
	['cobblemon:ancient_ivory_ball', 'cobblemon:white_apricorn', 'cobblemon:tumblestone', '#forge:ingots/copper'],
	['cobblemon:ancient_feather_ball', 'cobblemon:blue_apricorn', 'cobblemon:sky_tumblestone', '#forge:ingots/copper'],
	['cobblemon:ancient_wing_ball', 'cobblemon:blue_apricorn', 'cobblemon:sky_tumblestone', '#forge:ingots/wrought_iron'],
	['cobblemon:ancient_jet_ball', 'cobblemon:blue_apricorn', 'cobblemon:sky_tumblestone', '#forge:ingots/gold'],
	['cobblemon:ancient_heavy_ball', 'cobblemon:black_apricorn', 'cobblemon:black_tumblestone', '#forge:ingots/copper'],
	['cobblemon:ancient_leaden_ball', 'cobblemon:black_apricorn', 'cobblemon:black_tumblestone', '#forge:ingots/wrought_iron'],
	['cobblemon:ancient_gigaton_ball', 'cobblemon:black_apricorn', 'cobblemon:black_tumblestone', '#forge:ingots/gold']
]

/**
 * Early-game routes for the specialty balls - [ball, base ball, extra, apparatus].
 *
 * Every one of these already had exactly one recipe: an LV GregTech assembler, great_ball plus
 * two themed items. That put the whole specialty line behind electricity, which is a long way
 * from the pack's brief that catching is easy and early. These add a hand/apparatus route in
 * front of it. **The assembler recipes are deliberately kept** (see recipes.js) as the bulk,
 * automatable option - one ball here, two there.
 *
 * The base is no longer always great_ball. Each specialty ball is built from the apricorn ball
 * whose colour it shares, which is what the six coloured shells are for: roseate for the Love
 * Ball, verdant for the Safari Ball, slate for the Dusk Ball, and so on.
 *
 * Apparatus is spread on purpose rather than funnelled through one machine - the pack has a lot
 * of workstations and the old layer used none of them. Only apparatuses that do NOT require
 * worked metal are used here: the unfired shells are registered with
 * event.itemHeat(id, 1, null, null) in data.js, i.e. no forging and no welding temperature, so
 * a TFC anvil or welding recipe on a ball is impossible by construction.
 */
global.COBBLEMON_BALL_HANDCRAFT = [
	// --- azure (blue apricorn): water, fishing and netting
	['cobblemon:dive_ball', 'cobblemon:azure_ball', 'tfc:plant/leafy_kelp', 'pot'],
	['cobblemon:net_ball', 'cobblemon:azure_ball', 'minecraft:cobweb', 'crafting'],
	['cobblemon:lure_ball', 'cobblemon:azure_ball', 'minecraft:string', 'crafting'],

	// --- citrine (yellow apricorn)
	['cobblemon:quick_ball', 'cobblemon:citrine_ball', 'minecraft:sugar', 'mixing'],
	['cobblemon:level_ball', 'cobblemon:citrine_ball', 'minecraft:paper', 'crafting'],
	['cobblemon:fast_ball', 'cobblemon:citrine_ball', 'minecraft:feather', 'deploying'],

	// --- roseate (pink apricorn): affection and healing
	['cobblemon:love_ball', 'cobblemon:roseate_ball', 'tfc:pink_dye', 'barrel'],
	['cobblemon:heal_ball', 'cobblemon:roseate_ball', 'minecraft:bone_meal', 'mixing'],
	['cobblemon:dream_ball', 'cobblemon:roseate_ball', 'minecraft:phantom_membrane', 'deploying'],

	// --- slate (black apricorn): night, weight and metal
	['cobblemon:dusk_ball', 'cobblemon:slate_ball', 'minecraft:charcoal', 'mixing'],
	['cobblemon:luxury_ball', 'cobblemon:slate_ball', '#forge:plates/gold', 'deploying'],
	['cobblemon:heavy_ball', 'cobblemon:slate_ball', 'gtceu:lead_ingot', 'mixing'],
	['cobblemon:repeat_ball', 'cobblemon:slate_ball', 'minecraft:redstone', 'deploying'],
	['cobblemon:moon_ball', 'cobblemon:slate_ball', 'minecraft:bone', 'crafting'],

	// --- verdant (green apricorn): the outdoors
	['cobblemon:safari_ball', 'cobblemon:verdant_ball', 'tfc:green_dye', 'barrel'],
	['cobblemon:nest_ball', 'cobblemon:verdant_ball', 'tfc:straw', 'crafting'],
	['cobblemon:friend_ball', 'cobblemon:verdant_ball', 'tfc:food/wheat', 'crafting'],
	['cobblemon:sport_ball', 'cobblemon:verdant_ball', 'minecraft:flint', 'crafting'],

	// --- premier (white apricorn): the ceremonial ones
	['cobblemon:timer_ball', 'cobblemon:premier_ball', 'minecraft:clock', 'deploying'],
	['cobblemon:park_ball', 'cobblemon:premier_ball', 'tfc:jute_fiber', 'crafting'],
	['cobblemon:cherish_ball', 'cobblemon:premier_ball', 'tfc:red_dye', 'barrel'],
	['cobblemon:beast_ball', 'cobblemon:premier_ball', 'minecraft:ender_pearl', 'mixing']
]
