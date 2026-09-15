// priority: 0
"use strict";

/**
 * Climate tables for the Cobblemon spawn integration.
 *
 * Why this exists: TFG earth biomes are LANDFORM biomes (plains, hills,
 * dolines, tuyas). TFC climate - average temperature, rainfall and forest
 * density - varies per position and is completely invisible to a biome tag.
 * tfg:earth/plains exists on the equator and in Siberia alike, so no biome tag
 * can express "fire types in hot places". The biome tags in
 * kubejs/data/cobblemon/tags/worldgen/biome therefore carry landform and water
 * semantics only, and everything climate-shaped is decided at spawn time by
 * spawns.climate.js against TFC's own numbers.
 *
 * Units match TFC exactly:
 *   temperature - the ANNUAL AVERAGE in degrees C, roughly -25 to +32.
 *   rainfall    - 0 to 500, the same scale the berry crops in constants.js use.
 *   forest      - the per-chunk ForestType, indexed 0..4 below.
 */

/** Only the overworld has a TFC climate model; every other dimension has its own pools. */
global.COBBLEMON_CLIMATE_DIMENSION = 'minecraft:overworld'

/** TFC ForestType ordinals, so a table can ask for "at least sparse woodland". */
global.COBBLEMON_FOREST_LEVELS = {
	NONE: 0,
	SPARSE: 1,
	EDGE: 2,
	NORMAL: 3,
	OLD_GROWTH: 4
}

/**
 * Elemental type -> climate envelope.
 *
 * Deliberately WIDE. The pack brief is that Cobblemon must not be hard to get,
 * so these bands are meant to make a region feel different, not to lock a
 * player out of half the dex because they spawned in the wrong latitude. Types
 * with no meaningful climate story (normal, psychic, ghost, dark, dragon,
 * electric, flying, steel) span the whole world on purpose.
 *
 * minForest could gate on TFC's per-chunk forest density, but measuring it in
 * game showed why it must not: rainfall already implies vegetation, and a
 * ForestType.NONE chunk is common enough that requiring trees vetoed six of
 * every eight grass and bug spawns on its own. The field is still honoured if
 * a table sets it; nothing does by default.
 */
global.COBBLEMON_TYPE_CLIMATE = {
	fire: { minTemp: 8, maxTemp: 40, minRain: 0, maxRain: 350 },
	ice: { minTemp: -40, maxTemp: 3, minRain: 0, maxRain: 500 },
	grass: { minTemp: -5, maxTemp: 40, minRain: 120, maxRain: 500 },
	water: { minTemp: -40, maxTemp: 40, minRain: 50, maxRain: 500 },
	bug: { minTemp: 0, maxTemp: 40, minRain: 100, maxRain: 500 },
	rock: { minTemp: -40, maxTemp: 40, minRain: 0, maxRain: 380 },
	ground: { minTemp: -20, maxTemp: 40, minRain: 0, maxRain: 380 },
	poison: { minTemp: 0, maxTemp: 40, minRain: 80, maxRain: 500 },
	fairy: { minTemp: -8, maxTemp: 35, minRain: 120, maxRain: 500 },
	fighting: { minTemp: -20, maxTemp: 40, minRain: 0, maxRain: 500 },
	steel: { minTemp: -40, maxTemp: 40, minRain: 0, maxRain: 500 },
	electric: { minTemp: -40, maxTemp: 40, minRain: 0, maxRain: 500 },
	flying: { minTemp: -40, maxTemp: 40, minRain: 0, maxRain: 500 },
	normal: { minTemp: -40, maxTemp: 40, minRain: 0, maxRain: 500 },
	psychic: { minTemp: -40, maxTemp: 40, minRain: 0, maxRain: 500 },
	ghost: { minTemp: -40, maxTemp: 40, minRain: 0, maxRain: 500 },
	dark: { minTemp: -40, maxTemp: 40, minRain: 0, maxRain: 500 },
	dragon: { minTemp: -40, maxTemp: 40, minRain: 0, maxRain: 500 }
}

/**
 * Per-species overrides, applied INSTEAD of the type envelope.
 *
 * Typing alone gets a few families badly wrong - every sea creature is "water"
 * whether it is a reef fish or a pack ice seal, and several famously desert or
 * volcano dwelling lines are plain ground or fire. These are the cases worth
 * hand-writing; everything else rides on the type table above.
 */
global.COBBLEMON_SPECIES_CLIMATE = {}

const defineSpeciesClimate = (envelope, species) => {
	species.forEach(name => { global.COBBLEMON_SPECIES_CLIMATE[name] = envelope })
}

// Pack ice and polar water: cold seas and glaciers only.
defineSpeciesClimate({ minTemp: -40, maxTemp: 5, minRain: 50, maxRain: 500 }, [
	'seel', 'dewgong', 'lapras', 'spheal', 'sealeo', 'walrein', 'cubchoo', 'beartic',
	'eiscue', 'bergmite', 'avalugg', 'amaura', 'aurorus', 'arctovish', 'arctozolt'
])

// Snowfield dwellers: cold land, not necessarily coastal.
defineSpeciesClimate({ minTemp: -40, maxTemp: 2, minRain: 0, maxRain: 500 }, [
	'snorunt', 'glalie', 'froslass', 'swinub', 'piloswine', 'mamoswine', 'sneasel',
	'weavile', 'delibird', 'cryogonal', 'snover', 'abomasnow', 'vanillite',
	'vanillish', 'vanilluxe', 'cetoddle', 'cetitan', 'frigibax', 'arctibax', 'baxcalibur'
])

// Warm reefs and tropical shallows.
defineSpeciesClimate({ minTemp: 14, maxTemp: 40, minRain: 150, maxRain: 500 }, [
	'corsola', 'luvdisc', 'mantine', 'mantyke', 'chinchou', 'lanturn', 'relicanth',
	'clamperl', 'huntail', 'gorebyss', 'carvanha', 'sharpedo', 'bruxish', 'pyukumuku',
	'mareanie', 'toxapex', 'wimpod', 'golisopod', 'tentacool', 'tentacruel', 'wailmer'
])

// True desert lines: heat plus genuinely dry ground.
defineSpeciesClimate({ minTemp: 12, maxTemp: 40, minRain: 0, maxRain: 160 }, [
	'sandshrew', 'sandslash', 'trapinch', 'vibrava', 'flygon', 'cacnea', 'cacturne',
	'hippopotas', 'hippowdon', 'sandile', 'krokorok', 'krookodile', 'maractus',
	'helioptile', 'heliolisk', 'silicobra', 'sandaconda', 'orthworm', 'sandygast',
	'palossand', 'darumaka', 'darmanitan'
])

// Volcanic: the shield volcano biomes and the hottest, driest ground.
defineSpeciesClimate({ minTemp: 18, maxTemp: 40, minRain: 0, maxRain: 250 }, [
	'slugma', 'magcargo', 'numel', 'camerupt', 'torkoal', 'heatmor', 'salandit',
	'salazzle', 'turtonator', 'magby', 'magmar', 'magmortar', 'charmander',
	'charmeleon', 'charizard', 'growlithe', 'arcanine'
])

// Rainforest canopy: hot AND genuinely wet AND wooded.
defineSpeciesClimate({ minTemp: 16, maxTemp: 40, minRain: 280, maxRain: 500 }, [
	'tropius', 'bounsweet', 'steenee', 'tsareena', 'comfey', 'oranguru', 'passimian',
	'fomantis', 'lurantis', 'morelull', 'shiinotic', 'exeggcute', 'exeggutor',
	'pansage', 'simisage', 'pansear', 'simisear', 'panpour', 'simipour', 'sewaddle',
	'swadloon', 'leavanny', 'grookey', 'thwackey', 'rillaboom'
])

/**
 * TFC Koppen climate zone -> the Pokemon region that owns it.
 *
 * TFC classifies every position into one of twelve Koppen zones from its own
 * average temperature and rainfall, which makes those zones the natural
 * "regions" for a pack like this: they are real, they are already computed, and
 * travelling far enough genuinely changes which one a player is standing in.
 *
 * home     - generation labels that spawn here freely.
 * visiting - generation labels from climatically adjacent zones. These still
 *            spawn, but only COBBLEMON_REGION_VISITOR_CHANCE of the time, so a
 *            region reads as its own place without hard walls at the border.
 */
global.COBBLEMON_CLIMATE_REGIONS = {
	ARCTIC: { region: 'Hisui', home: ['gen8', 'gen4', 'gen2'], visiting: ['gen1', 'gen5'] },
	TUNDRA: { region: 'Hisui', home: ['gen8', 'gen4', 'gen2'], visiting: ['gen1', 'gen5'] },
	SUBARCTIC: { region: 'Sinnoh', home: ['gen4', 'gen8', 'gen2'], visiting: ['gen1', 'gen5'] },
	HUMID_SUBARCTIC: { region: 'Sinnoh', home: ['gen4', 'gen8', 'gen1'], visiting: ['gen2', 'gen5'] },
	HUMID_OCEANIC: { region: 'Galar', home: ['gen8', 'gen4', 'gen1'], visiting: ['gen2', 'gen6'] },
	TEMPERATE: { region: 'Kanto and Johto', home: ['gen1', 'gen2', 'gen4'], visiting: ['gen5', 'gen6', 'gen8'] },
	HUMID_SUBTROPICAL: { region: 'Unova', home: ['gen5', 'gen1', 'gen2'], visiting: ['gen3', 'gen6', 'gen9'] },
	SUBTROPICAL: { region: 'Kalos', home: ['gen6', 'gen1', 'gen2'], visiting: ['gen5', 'gen9', 'gen3'] },
	COLD_DESERT: { region: 'Paldea', home: ['gen9', 'gen5', 'gen6'], visiting: ['gen3', 'gen4'] },
	HOT_DESERT: { region: 'Paldea', home: ['gen9', 'gen3', 'gen5'], visiting: ['gen6', 'gen7'] },
	TROPICAL_SAVANNA: { region: 'Hoenn', home: ['gen3', 'gen9', 'gen7'], visiting: ['gen5', 'gen6', 'gen1'] },
	TROPICAL_RAINFOREST: { region: 'Alola', home: ['gen7', 'gen3', 'gen1'], visiting: ['gen5', 'gen6', 'gen9'] }
}

/** How often a neighbouring region's Pokemon turns up as a visitor. */
global.COBBLEMON_REGION_VISITOR_CHANCE = 0.5

/**
 * Species carrying any of these labels ignore BOTH gates entirely - the region
 * gate and the climate envelope.
 *
 * Their rarity is already controlled by the spawn pool, and a legendary that
 * only appears in one climate band would effectively never be found. The
 * climate exemption matters more since the Legends & Myths datapack arrived:
 * its legendaries are placed by the lam:* jigsaw structures rather than by a
 * spawn pool, so a climate veto does not merely make one rarer, it deletes the
 * entire point of a structure a player travelled to find. Genesect in the iron
 * cavern is the clearest case - it reads bug/steel, and the bug envelope wants
 * 100mm of rain the cavern's badlands and mountains do not have.
 */
global.COBBLEMON_REGION_GATE_EXEMPT = [
	'legendary', 'mythical', 'ultra_beast', 'paradox', 'mega', 'gmax', 'totem'
]
