// priority: 1
"use strict";

/**
 * Событие регистрации предмет-тэгов.
 */
ServerEvents.tags('item', event => {
	registerCobblemonItemTags(event)
	registerCobblemonWoodTags(event)
	registerCobblemonHiddenItems(event)
	registerAdAstraItemTags(event)
	registerAE2ItemTags(event)
	registerAFCItemTags(event)
	registerArthropocolypseItemTags(event)
	registerBeneathItemTags(event)
	registerComputerCraftItemTags(event)
	registerConstructionWandItemTags(event)
	registerCopycatsItemTags(event)
	registerCreateItemTags(event)
	registerCreateAdditionsItemTags(event)
	registerCreateConnectedItemTags(event)
	registerCreateDecoItemTags(event)
	registerCreateFluidLogisticsItemTags(event)
	registerCreateSteamPoweredItemTags(event)
	registerCreateStockBridgeItemTags(event)
	registerDomumOrnamentumItemTags(event)
	registerDiggerHelmetItemTags(event)
	registerEndermanOverhaulItemTags(event)
	registerEveryCompatItemTags(event)
	registerExposureItemTags(event)
	registerFirmaCivItemTags(event)
	registerFirmaLifeItemTags(event)
	registerFowlPlayItemTags(event)
	registerFramedBlocksItemTags(event)
	registerFTBQuestsItemTags(event)
	registerGreateItemTags(event)
	registerGTCEUItemTags(event)
	registerJelliesItemTags(event)
	registerMacawsForTFCItemTags(event)
	registerMinecraftItemTags(event)
	registerModernMarkingsItemTags(event)
	registerMTSItemTags(event)
	registerHotOrNotItemTags(event)
	registerPrimitiveCreaturesItemTags(event)
	registerRailWaysItemTags(event)
	registerRealmRpgItemTags(event)
	registerRnrItemTags(event)
	registerSoulboundItemTags(event)
	registerSNSItemTags(event)
	registerSpeciesItemTags(event)
	registerTACZItemTags(event)
	registerTFCChannelCastingItemTags(event)
	registerTFCAmbientalItemTags(event)
	registerTFCItemTags(event)
	registerTFCScrapingKnivesItemTags(event)
	registerTFGItemTags(event)
	registerTFGNuclearItemTags(event)
    registerTFCLunchboxItemTags(event)
	registerVintageImprovementsItemTags(event)
	registerWABItemTags(event)
})

/**
 * Событие регистрации блок-тэгов.
 */
ServerEvents.tags('block', event => {
	registerCobblemonBlockTags(event)
	registerAdAstraBlockTags(event)
	registerAE2BlockTags(event)
	registerAFCBlockTags(event)
	registerBeneathBlockTags(event)
	registerBlockRunnerBlockTags(event)
	registerComputerCraftBlockTags(event)
	registerCreateBlockTags(event)
	registerCreateDecoBlockTags(event)
	registerDomumOrnamentumBlockTags(event)
	registerEndermanOverhaulBlockTags(event)
	registerEveryCompatBlockTags(event)
	registerFirmaLifeBlockTags(event)
	registerFowlPlayBlockTags(event)
	registerGTCEUBlockTags(event)
	registerMinecraftBlockTags(event)
	registerRailWaysBlockTags(event)
	registerRealmRpgBlockTags(event)
	registerRnrBlockTags(event)
	registerSpeciesBlockTags(event)
	registerTACZBlockTags(event)
	registerTFCBlockTags(event)
	registerTFGBlockTags(event)
	registerTFGBlockTagsNuclear(event)
	registerVintageImprovementsBlockTags(event)
	registerWABBlockTags(event)
})

/**
 * Событие регистрации жидкость-тэгов.
 */
ServerEvents.tags('fluid', event => {
	registerCobblemonFluidTags(event)
	registerAFCFluidTags(event)
	registerAdAstraFluidTags(event)
	registerCreateFluidTags(event)
	registerCreateAdditionsFluidTags(event)
	registerCreateSteamPoweredFluidTags(event)
	registerGTCEUFluidTags(event)
	registerGreateFluidTags(event)
	registerHotOrNotFluidTags(event)
	registerFirmaLifeFluidTags(event)
	registerTFCFluidTags(event)
	registerTFCChannelCastingFluidTags(event)
	registerTFGFluidTags(event)
	registerTFGFluidTagsNuclear(event)
	registerVintageImprovementsFluidTags(event)
})

ServerEvents.tags('worldgen/configured_feature', event => {
	registerTFGConfiguredFeatures(event)
})

/**
 * Событие регистрации тегов структур.
 */
ServerEvents.tags('worldgen/placed_feature', event => {
	// Remove default veins
	event.removeAll('tfc:in_biome/veins')

	registerTFGPlacedFeatures(event)
	registerCobblemonPlacedFeatures(event)
})

ServerEvents.tags('worldgen/biome', event => {
	registerAdAstraBiomeTags(event)
	registerCosyCrittersBiomeTags(event)
	registerCreatePickyWheelsBiomeTags(event)
	registerFowlPlayBiomeTags(event)
	registerTFGBiomeTags(event)
	registerRealmRpgBiomeTags(event)
	registerWansAncientBeastsBiomeTags(event)
})

ServerEvents.tags('entity_type', event => {
	registerFowlPlayEntityTags(event)
	registerJelliesEntityTags(event)
	registerTFGEntityTypeTags(event)
	registerWABEntityTypeTags(event)
})

ServerEvents.tags('block_entity_type', event => {
	registerCraftingStationBlockEntityTags(event)
})

/**
 * Fires once the server is up, which is the first point at which Forge server
 * configs are loaded. Runtime config tuning that ships with the pack goes here
 * rather than in config/ files, so it applies on every instance and server.
 */
ServerEvents.loaded(event => {
	applyCobblemonSpawnTuning(event)
	applyTFCFoodTuning(event)
})

/**
 * Событие регистрации датапаков (Здесь можно регистрировать теги, данные, рецепты, общий метод короче).
 * Срабатывает до инициализации рецептов, но после тегов.
 */
ServerEvents.highPriorityData(event => {
	registerComputerCraftData(event)
})

/**
 * Событие регистрации датапаков для TFC (Здесь можно регистрировать теги, данные, рецепты, общий метод короче).
 * Срабатывает до инициализации рецептов, но после тегов.
 */
TFCEvents.data(event => {
	registerCobblemonData(event)
	registerTFCDataForAdAstra(event);
	registerTFCDataForArborFirmaCraft(event)
	registerTFCDataForChalk(event);
	registerTFCDataForChimes(event);
	registerTFCDataForCreateAddition(event);
	registerCreateDecoData(event);
	registerTFCDataForFirmalife(event)
	registerTFCDataForGTCEU(event)
	registerTFCDataForImmersiveAircraft(event);
	registerTFCDataForMinecraft(event)
	registerTFCDataForMTS(event)
	registerTFCDataForMTSOCP(event)
	registerTFCDataForSophisticatedBackpacks(event)
	registerTFCDataForTACZ(event)
	registerTFCDataForTFC(event)
	registerTFCDataForTFCBetterBF(event)
	registerTFCDataForTFCLunchbox(event)
	registerTFCDataForTFG(event)
	registerTFCDataForWaterFlasks(event)
	registerTFCDataForRailways(event)
	registerWABData(event)
	registerSpeciesData(event)
})

/**
 * Событие регистрации лут-тейблов.
 * Срабатывает до инициализации рецептов, но после датапаков и тегов.
 */
LootJS.modifiers((event) => {
	registerCobblemonLoots(event)
	registerAdAstraLoots(event)
	registerBeneathLoots(event)
	registerTFGRockLoots(event)
	registerTFGOreLoots(event)
	registerMinecraftLoots(event)
	registerLootrLoots(event)
	registerPrimitiveCreaturesLoots(event)
	registerSpeciesLoots(event)
	registerTFCLoots(event)
	registerTFGLoots(event)
	registerWansAncientBeastsLoots(event)
});

/**
 * Событие регистрации рудных жил.
 * Не представляю когда срабатывает, но явно после тегов и датапаков.
 */
GTCEuServerEvents.oreVeins(event => {
	event.removeAll()
})

GTCEuServerEvents.fluidVeins(event => {
	registerGTCEUBedrockFluidVeins(event)
})


/**
 * Событие регистрации рецептов.
 * Срабатывает после инициализации датапаков и тегов.
 */
ServerEvents.recipes(event => {
	registerWaterFramesRecipes(event)
	registerCobblemonRecipes(event)
	// MUST stay after registerCobblemonRecipes: that function begins with
	// event.remove({ mod: 'cobblemon' }), which wipes recipes added earlier in
	// this same event. Listing these first silently deleted all of them.
	registerCobblemonMintsMulchRecipes(event)
	registerCobblemonMedicineRecipes(event)
	registerCobblemonWoodFossilRecipes(event)
	registerCobblemonHeldItemRecipes(event)
	registerCobblemonUtilityRecipes(event)
	registerCobblemonFishingRecipes(event)
	registerCobblemonAncientRecipes(event)
	registerCobblemonBallHandcraftRecipes(event)
	// Guarded for the same reason the automation block below is: this file is newer
	// than the rest, and an undefined function here aborts the WHOLE recipe event.
	if (typeof registerCobblemonCookingRecipes === 'function') {
		registerCobblemonCookingRecipes(event)
	} else {
		console.error('[tfg] cobblemon cooking recipes not loaded - skipped')
	}

	// Pass 2 automation layer (Create sequenced assembly + GregTech routes).
	// Guarded: these files are newer than the rest, and an undefined function here
	// would abort the ENTIRE recipe event, taking every other mod's recipes with it.
	;[
		['ball automation', typeof registerCobblemonBallAutomation],
		['consumable automation', typeof registerCobblemonConsumableAutomation],
		['gear automation', typeof registerCobblemonGearAutomation]
	].forEach(([label, kind]) => {
		if (kind !== 'function') console.error(`[tfg] cobblemon ${label} not loaded - skipped`)
	})
	if (typeof registerCobblemonBallAutomation === 'function') registerCobblemonBallAutomation(event)
	if (typeof registerCobblemonConsumableAutomation === 'function') registerCobblemonConsumableAutomation(event)
	if (typeof registerCobblemonGearAutomation === 'function') registerCobblemonGearAutomation(event)
	registerAdAstraRecipes(event)
	registerAdvancedPeripheralsRecipes(event)
	registerAlekishipsRecipes(event)
	registerAE2Recipes(event)
	registerAFCRecipes(event)
	registerArthropocolypseRecipes(event)
	registerAsticorCartsRecipes(event)
	registerAE2InsertExportCardRecipes(event)
	registerAE2NetworkAnalyzerRecipes(event)
	registerAE2WTLibRecipes(event)
	registerBeneathRecipes(event)
	registerBuildingGadgetsRecipes(event)
	registerChalkRecipes(event);
	registerChimesRecipes(event);
	registerComfortsRecipes(event);
	registerComputerCraftRecipes(event)
	//registerCccBridgeRecipes(event)
	registerConstructionwandRecipes(event)
	registerCreateRecipes(event)
	registerCreateAdditionsRecipes(event)
	registerCreateConnectedRecipes(event)
	registerCreateCopycatsRecipes(event)
	registerCreatedecoRecipes(event)
	registerCreateExtraGaugesRecipes(event)
	registerCreateFluidLogisticsRecipes(event)
	registerCreateHorsePowerBlockRecipes(event)
	registerCreateHypertubeRecipes(event)
	registerCreateSoundOfSteamRecipes(event)
	registerCreateSteamPoweredRecipes(event)
	registerCreateStockBridgeRecipes(event)
	registerDeaFissionRecipes(event)
	registerDiggerHelmetRecipes(event)
	registerDomumOrnamentumRecipes(event)
	registerEndermanOverhaulRecipes(event)
	registerEveryCompatRecipes(event)
	registerExtendedAE2Recipes(event)
	registerExposureRecipes(event)
	registerEtchedRecipes(event)
	registerFirmaCivRecipes(event)
	registerFirmaLifeRecipes(event)
	registerFramedBlocksRecipes(event)
	registerFTBQuestsRecipes(event)
	registerGrapplingHookRecipes(event);
	registerGreateRecipes(event)
	registerGTCEURecipes(event);
	registerGTCEUTerminalRecipes(event)
	registerGTModernUtilitiesRecipes(event)
	registerHandGliderRecipes(event)
	registerHotOrNotRecipes(event)
	registerImmersiveAircraftRecipes(event)
	registerJelliesRecipes(event)
	registerMacawsForTFCRecipes(event)
	registerMeasurementsRecipes(event)
	registerMegaCellsRecipes(event)
	registerMERequesterRecipes(event)
	registerMinecraftRecipes(event)
	registerModernMarkingRecipes(event)
	registerMoreRedRecipes(event)
	registerMTSRecipes(event)
	registerMTSOCPRecipes(event)
	registerPrimitiveCreaturesRecipes(event)
	registerRailWaysRecipes(event)
	registerRailwaysNavigatorRecipes(event)
	registerRnrRecipes(event)
	registerSandwormRecipes(event)
	registerSophisticatedBackpacksRecipes(event)
	registerSoulboundRecipes(event)
	registerSimplylightRecipes(event)
	registerSNSRecipes(event)
	registerSpeciesRecipes(event)
	registerTACZRecipes(event)
	registerTFCRecipes(event)
	registerTFCAmbientalRecipes(event)
	registerTFCBetterBFRecipes(event)
	registerTFCLunchBoxRecipes(event)
	registerTFCGroomingStationRecipes(event)
	registerTFGRecipes(event)
	registerTFCTextileRecipes(event)
	registerToolBeltRecipes(event)
	registerVintageImprovementsRecipes(event)
	registerWaterFlasksRecipes(event)
	registerWABRecipes(event)
	registerTFCScrapingKnivesRecipes(event)
	registerTFGCircuitBoardsRecipes(event)
})

TaCZServerEvents.gunIndexLoad((event) => {
	gunIndexLogic(event)
})

TaCZServerEvents.ammoIndexLoad((event) => {
	ammoIndexLogic(event)
})

TaCZServerEvents.attachmentIndexLoad((event) => {
	attachmentIndexLogic(event)
})

TaCZServerEvents.gunDataLoad((event) => {
	gunDataLogic(event)
})

TaCZServerEvents.attachmentDataLoad((event) => {
	attachmentDataLogic(event)
})
