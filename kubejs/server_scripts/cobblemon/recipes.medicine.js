// priority: 0
"use strict";

/**
 * Cobblemon medicine, vitamins and battle-item recipes.
 *
 * Tier logic:
 *   Herbs      - stone age. Wild plants (minecraft:flowers tag) plus one
 *                cheap thematic reagent. Nothing here needs a bench.
 *   Healing    - stone age / primitive. Built as explicit progressions so the
 *                stronger item always costs the weaker item plus a reagent:
 *                  heal_powder -> potion -> super_potion -> hyper_potion -> max_potion
 *                  remedy -> superb_remedy -> fine_remedy
 *                  ether -> max_ether ; elixir -> max_elixir
 *                  revive -> max_revive
 *                Status cures (antidote/awakening/burn_heal/ice_heal/paralyze_heal)
 *                each use the canon Pokemon berry for that ailment (pecha cures
 *                poison, chesto cures sleep, rawst cures burn, aspear cures
 *                freeze, cheri cures paralysis). full_heal and full_restore sit
 *                above them, combining cures.
 *                Every healing/medicine item also takes a glass bottle
 *                (#tfc:glass_bottles, covers all 4 TFC bottle variants) per the
 *                pack owner's request - except heal_powder, which is a dry
 *                milled powder, and revive, which keeps Cobblemon's own
 *                heal powder + honey recipe.
 *   Vitamins   - mid tier, refined goods (sugar-coated dusts, meats, honey).
 *                exp_candy_xs..xl is an explicit chain like the potion line.
 *   Feathers   - one shared shape (minecraft:feather + themed reagent) so the
 *                whole family visually rhymes.
 *   X-items    - one shared shape (a TerraFirmaGreg medicine powder + the TFG
 *                effect-ingredient tag for the stat it raises), battle boosters,
 *                mid tier alongside vitamins.
 *
 * Cobblemon berry items (registered.txt confirms all of these exist) are used
 * throughout the healing chain as the thematically correct reagent: oran_berry
 * for basic healing, sitrus_berry for the strong end of the potion/revive
 * lines, leppa_berry for PP restoratives, lum_berry (cures every status) for
 * the remedy line, and the five canon cure-berries for the status cures.
 */
const registerCobblemonMedicineRecipes = (event) => {

	//#region Herbs - stone age, wild plants

	const herbs = [
		['cobblemon:big_root', 'tfc:straw'],
		['cobblemon:energy_root', 'tfc:powder/wood_ash'],
		['cobblemon:mental_herb', 'minecraft:paper'],
		['cobblemon:mirror_herb', '#forge:glass_panes'],
		['cobblemon:pep_up_flower', 'tfc:powder/saltpeter'],
		['cobblemon:power_herb', 'minecraft:gunpowder'],
		['cobblemon:revival_herb', 'cobblemon:oran_berry'],
		['cobblemon:white_herb', 'tfc:powder/kaolinite']
	]

	herbs.forEach(([herb, reagent]) => {
		event.shapeless(herb, [
			'#minecraft:flowers',
			reagent
		]).id(`tfg:shapeless/${global.linuxUnfucker(herb)}`)
	})

	//#endregion

	//#region Healing - potion line

	// Heal Powder is a GROUND HERB, so it is milled rather than mixed. Bone meal
	// and salt were a placeholder that said nothing about what the item is;
	// Cobblemon's own recipe is a single revival herb, and TFC's quern is this
	// pack's way of turning a plant into a powder.
	event.recipes.tfc.quern('cobblemon:heal_powder', 'cobblemon:revival_herb')
		.id('tfg:quern/heal_powder')

	// The batch route, built exactly like TerraFirmaGreg's own medicine powders
	// (see tfg/primitive/medicine/recipes.medicine.js): two effect-ingredient
	// tags bound together with conifer pitch in a mixing bowl. Heal Powder
	// restores HP, so it draws on the same two tags recovery powder does -
	// instant health and regeneration - with the revival herb as its own
	// signature ingredient.
	event.recipes.firmalife.mixing_bowl()
		.ingredients([
			'cobblemon:revival_herb',
			'#tfg:instant_health_ingredients',
			'#tfg:regeneration_ingredients'
		], Fluid.of('tfg:conifer_pitch', 100))
		.outputItem('4x cobblemon:heal_powder')
		.id('tfg:mixing_bowl/heal_powder')

	// Herbal slime ball stands in for the pitch, same as every TFG powder.
	event.recipes.firmalife.mixing_bowl()
		.itemIngredients([
			'cobblemon:revival_herb',
			'#tfg:instant_health_ingredients',
			'#tfg:regeneration_ingredients',
			'jellies:jellie/slime_ball/herbal'
		])
		.outputItem('8x cobblemon:heal_powder')
		.id('tfg:mixing_bowl/heal_powder_with_herbal_slime_ball')

	event.shapeless('cobblemon:potion', [
		'cobblemon:heal_powder',
		'cobblemon:oran_berry',
		'#tfc:glass_bottles'
	]).id('tfg:shapeless/potion')

	event.shapeless('cobblemon:super_potion', [
		'cobblemon:potion',
		'minecraft:sugar',
		'tfc:powder/wood_ash',
		'#tfc:glass_bottles'
	]).id('tfg:shapeless/super_potion')

	// #tfc:milks is a FLUID tag - the pack only ever uses it via
	// TFC.fluidStackIngredient or as '#tfc:milks 500'. As a crafting item it
	// resolves to nothing, so this recipe could never be made. #tfc:foods/dairy
	// is the real ITEM tag (cheese and curds).
	event.shapeless('cobblemon:hyper_potion', [
		'cobblemon:super_potion',
		'#tfc:foods/dairy',
		'#tfc:glass_bottles'
	]).id('tfg:shapeless/hyper_potion')

	event.shapeless('cobblemon:max_potion', [
		'cobblemon:hyper_potion',
		'#forge:dusts/silver',
		'cobblemon:sitrus_berry',
		'#tfc:glass_bottles'
	]).id('tfg:shapeless/max_potion')

	//#endregion

	//#region Healing - remedy line

	event.shapeless('cobblemon:remedy', [
		'#minecraft:flowers',
		'tfc:powder/salt',
		'#tfc:glass_bottles'
	]).id('tfg:shapeless/remedy')

	// Lum berry cures every status condition in canon, so it is the natural
	// upgrade reagent for the remedy line.
	event.shapeless('cobblemon:superb_remedy', [
		'cobblemon:remedy',
		'cobblemon:lum_berry',
		'#tfc:glass_bottles'
	]).id('tfg:shapeless/superb_remedy')

	event.shapeless('cobblemon:fine_remedy', [
		'cobblemon:superb_remedy',
		'firmalife:raw_honey',
		'#tfc:glass_bottles'
	]).id('tfg:shapeless/fine_remedy')

	//#endregion

	//#region Healing - PP restoratives

	event.shapeless('cobblemon:ether', [
		'minecraft:sugar',
		'tfc:powder/soda_ash',
		'cobblemon:leppa_berry',
		'#tfc:glass_bottles'
	]).id('tfg:shapeless/ether')

	event.shapeless('cobblemon:max_ether', [
		'cobblemon:ether',
		'#forge:dusts/silver',
		'#tfc:glass_bottles'
	]).id('tfg:shapeless/max_ether')

	event.shaped('cobblemon:elixir', [
		'PEB'
	], {
		P: 'cobblemon:potion',
		E: 'cobblemon:ether',
		B: '#tfc:glass_bottles'
	}).id('tfg:shaped/elixir')

	event.shaped('cobblemon:max_elixir', [
		'PEB'
	], {
		P: 'cobblemon:max_potion',
		E: 'cobblemon:max_ether',
		B: '#tfc:glass_bottles'
	}).id('tfg:shaped/max_elixir')

	//#endregion

	//#region Healing - revives

	// Cobblemon's own Revive recipe, kept as-is: heal powder stirred into honey.
	// (Upstream it is a campfire-pot craft, but event.remove({ mod: 'cobblemon' })
	// in recipes.js wipes the pot recipes and the pot itself has no recipe in this
	// pack, so it runs on a bench here.) minecraft:honey_bottle does not exist in
	// TerraFirmaGreg - vanilla bees are gone and Firmalife owns beekeeping - so
	// firmalife:jar/honey stands in for it: a jar of honey is the bottled honey
	// of this pack, where firmalife:raw_honey is the comb it is pressed from.
	event.shapeless('cobblemon:revive', [
		'cobblemon:heal_powder',
		'firmalife:jar/honey'
	]).id('tfg:shapeless/revive')

	event.shaped('cobblemon:max_revive', [
		'RPO'
	], {
		R: 'cobblemon:revive',
		P: 'cobblemon:max_potion',
		O: '#tfc:glass_bottles'
	}).id('tfg:shaped/max_revive')

	//#endregion

	//#region Healing - status cures

	// Each cure uses the canon Pokemon berry for that ailment: pecha cures
	// poison, chesto cures sleep, rawst cures burn, aspear cures freeze,
	// cheri cures paralysis.
	const statusCures = [
		['cobblemon:antidote', 'cobblemon:pecha_berry'],
		['cobblemon:awakening', 'cobblemon:chesto_berry'],
		['cobblemon:burn_heal', 'cobblemon:rawst_berry'],
		['cobblemon:ice_heal', 'cobblemon:aspear_berry'],
		['cobblemon:paralyze_heal', 'cobblemon:cheri_berry']
	]

	statusCures.forEach(([cure, reagent]) => {
		event.shapeless(cure, [
			'#minecraft:flowers',
			reagent,
			'#tfc:glass_bottles'
		]).id(`tfg:shapeless/${global.linuxUnfucker(cure)}`)
	})

	// All five status cure berries combined into one general cure.
	event.shapeless('cobblemon:full_heal', [
		'cobblemon:pecha_berry',
		'cobblemon:chesto_berry',
		'cobblemon:rawst_berry',
		'cobblemon:aspear_berry',
		'cobblemon:cheri_berry',
		'#tfc:glass_bottles'
	]).id('tfg:shapeless/full_heal')

	//#endregion

	//#region Healing - top tier and misc

	event.shapeless('cobblemon:medicinal_brew', [
		'#minecraft:flowers',
		'firmalife:raw_honey',
		'tfc:powder/salt',
		'cobblemon:oran_berry',
		'#tfc:glass_bottles'
	]).id('tfg:shapeless/medicinal_brew')

	// Full restore is the max potion and the full heal fused together.
	event.shaped('cobblemon:full_restore', [
		'MHO'
	], {
		M: 'cobblemon:max_potion',
		H: 'cobblemon:full_heal',
		O: '#tfc:glass_bottles'
	}).id('tfg:shaped/full_restore')

	//#endregion

	//#region Vitamins

	event.shapeless('cobblemon:protein', [
		'tfc:food/beef',
		'#tfc:foods/dairy'
	]).id('tfg:shapeless/protein')

	event.shapeless('cobblemon:iron', [
		'#forge:dusts/iron',
		'minecraft:sugar'
	]).id('tfg:shapeless/iron_vitamin')

	// Calcium uses dairy (not sugar) so it no longer collides with
	// exp_candy_xs, which is bone_meal + sugar.
	event.shapeless('cobblemon:calcium', [
		'minecraft:bone_meal',
		'#tfc:foods/dairy'
	]).id('tfg:shapeless/calcium')

	event.shapeless('cobblemon:zinc', [
		'#forge:dusts/zinc',
		'minecraft:sugar'
	]).id('tfg:shapeless/zinc_vitamin')

	event.shapeless('cobblemon:carbos', [
		'tfc:food/potato',
		'minecraft:sugar'
	]).id('tfg:shapeless/carbos')

	event.shaped('cobblemon:hp_up', [
		'PC',
		' S'
	], {
		P: 'cobblemon:protein',
		C: 'cobblemon:calcium',
		S: 'minecraft:sugar'
	}).id('tfg:shaped/hp_up')

	event.shapeless('cobblemon:pp_up', [
		'minecraft:sugar',
		'firmalife:raw_honey'
	]).id('tfg:shapeless/pp_up')

	event.shapeless('cobblemon:pp_max', [
		'cobblemon:pp_up',
		'#forge:dusts/silver'
	]).id('tfg:shapeless/pp_max')

	// No diamond: rare candy stays the most expensive candy through sheer
	// ingredient count (four sugar, honey and silver dust), not a gem.
	event.shaped('cobblemon:rare_candy', [
		'SHS',
		'SIS'
	], {
		S: 'minecraft:sugar',
		H: 'firmalife:raw_honey',
		I: '#forge:dusts/silver'
	}).id('tfg:shaped/rare_candy')

	//#endregion

	//#region Vitamins - exp candy chain

	event.shapeless('cobblemon:exp_candy_xs', [
		'minecraft:sugar',
		'minecraft:bone_meal'
	]).id('tfg:shapeless/exp_candy_xs')

	// Mago berry, not glow berries. Glow berries are only obtainable in this pack
	// through a Nether greenhouse (see tfg/aquaponics/recipes.greenhouse.js), which
	// is absurd for the second rung of the cheapest candy ladder. Mago is the SWEET
	// berry in Pokemon's flavour system and a farmable staple, so a candy made of
	// sugar and a sweet berry is both cheaper and more obviously a candy.
	event.shapeless('cobblemon:exp_candy_s', [
		'cobblemon:exp_candy_xs',
		'cobblemon:mago_berry'
	]).id('tfg:shapeless/exp_candy_s')

	event.shapeless('cobblemon:exp_candy_m', [
		'cobblemon:exp_candy_s',
		'#forge:dusts/iron'
	]).id('tfg:shapeless/exp_candy_m')

	event.shapeless('cobblemon:exp_candy_l', [
		'cobblemon:exp_candy_m',
		'#forge:dusts/silver'
	]).id('tfg:shapeless/exp_candy_l')

	// No diamond: lapis powder is the top-tier sparkle instead.
	event.shapeless('cobblemon:exp_candy_xl', [
		'cobblemon:exp_candy_l',
		'tfc:powder/lapis_lazuli'
	]).id('tfg:shapeless/exp_candy_xl')

	//#endregion

	//#region Feathers - feather + its stat's berry + that stat's herbs

	// Feathers are EV training items: each one trains exactly one stat. The old
	// recipes were a feather plus an unrelated prop (a book for genius, a plate
	// for resist, beef for muscle), which trained nothing and told the player
	// nothing. These are built like the pills and the X-items instead - a berry
	// for the stat, and the TerraFirmaGreg effect-ingredient tag for the
	// matching effect - so a feather reads as a dose, not a souvenir.
	//
	// The berries are Pokemon's own flavour-to-stat mapping, the one the Poffin
	// and Pokeblock systems run on:
	//
	//   figy   spicy   -> Attack        muscle_feather
	//   wiki   dry     -> Sp. Attack    genius_feather
	//   mago   sweet   -> Speed         swift_feather
	//   aguav  bitter  -> Sp. Defence   clever_feather
	//   iapapa sour    -> Defence       resist_feather
	//
	// HP has no flavour of its own, so health_feather takes oran, the berry that
	// restores HP. Every one of these six is a STAPLE berry - one of the fifteen
	// registered as a real TFC crop in blocks.berries.js - so the whole family is
	// farmable rather than gated on finding the right wild bush.
	//
	// fairy_feather is the odd one out and is treated as such: it is not an EV
	// item at all but a Fairy-type damage booster, so it keeps a dust (glowstone,
	// for the fae glow) and takes persim, the staple berry that clears confusion.
	//
	// [feather, berry, TFG effect-ingredient tag or dust]
	const feathers = [
		['cobblemon:muscle_feather', 'cobblemon:figy_berry', '#tfg:strength_ingredients'],
		['cobblemon:genius_feather', 'cobblemon:wiki_berry', '#tfg:haste_ingredients'],
		['cobblemon:swift_feather', 'cobblemon:mago_berry', '#tfg:speed_ingredients'],
		['cobblemon:clever_feather', 'cobblemon:aguav_berry', '#tfg:absorption_ingredients'],
		['cobblemon:resist_feather', 'cobblemon:iapapa_berry', '#tfg:resistance_ingredients'],
		['cobblemon:health_feather', 'cobblemon:oran_berry', '#tfg:instant_health_ingredients'],
		['cobblemon:fairy_feather', 'cobblemon:persim_berry', '#forge:dusts/glowstone']
	]

	feathers.forEach(([feather, berry, reagent]) => {
		event.shapeless(feather, [
			'minecraft:feather',
			berry,
			reagent
		]).id(`tfg:shapeless/${global.linuxUnfucker(feather)}`)
	})

	//#endregion

	//#region X-items and battle boosters - TFG medicine powder + matching herb tag

	// These used to be gunpowder plus an arbitrary dust, which made every battle
	// item the same explosive sachet and said nothing about what it does.
	// TerraFirmaGreg already has a family of medicine powders that buff the
	// player (see tfg/primitive/medicine/recipes.medicine.js), and each one maps
	// cleanly onto a stat an X-item raises:
	//
	//   combat_powder   strength + resistance   -> attack, defence, crit
	//   acrobat_powder  jump boost + slow fall  -> speed
	//   mining_powder   haste + night vision    -> special attack, accuracy
	//   recovery_powder instant health + regen  -> special defence, guarding
	//
	// The powder alone cannot tell two X-items apart, so each also takes the
	// TFG effect-ingredient tag for the exact stat it boosts. That keeps every
	// recipe distinct and makes the second ingredient the one that names the
	// effect - x_defence is literally a combat powder cut with resistance herbs.
	//
	// [item, TFG powder, TFG effect-ingredient tag]
	const xItems = [
		['cobblemon:x_attack', 'tfg:combat_powder', '#tfg:strength_ingredients'],
		['cobblemon:x_defence', 'tfg:combat_powder', '#tfg:resistance_ingredients'],
		['cobblemon:x_speed', 'tfg:acrobat_powder', '#tfg:speed_ingredients'],
		['cobblemon:x_special_attack', 'tfg:mining_powder', '#tfg:haste_ingredients'],
		['cobblemon:x_special_defence', 'tfg:recovery_powder', '#tfg:absorption_ingredients'],
		['cobblemon:x_accuracy', 'tfg:mining_powder', '#tfg:night_vision_ingredients'],
		// Dire Hit raises the critical-hit rate, which is the luck stat in all
		// but name - so combat powder cut with the luck herbs rather than the
		// gtceu:diamond_grinding_head (a GregTech MACHINE PART) this once used.
		['cobblemon:dire_hit', 'tfg:combat_powder', '#tfg:luck_ingredients'],
		// Guard Spec blocks stat reduction rather than adding a stat, so it takes
		// the defensive powder with absorption's opposite number, resistance.
		['cobblemon:guard_spec', 'tfg:recovery_powder', '#tfg:resistance_ingredients']
	]

	xItems.forEach(([item, powder, herbs]) => {
		event.shapeless(item, [
			powder,
			herbs
		]).id(`tfg:shapeless/${global.linuxUnfucker(item)}`)
	})

	//#endregion

}
