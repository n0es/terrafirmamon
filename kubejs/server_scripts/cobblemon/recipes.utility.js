// priority: 0
"use strict";

/**
 * Cobblemon utility, evolution-trade and ability items.
 *
 * Tier logic:
 *   - Electronics-flavoured evolution items (Upgrade, Dubious Disc, Electirizer,
 *     Magmarizer) and tech-flavoured held items (Cell Battery, Exp Share, Metronome)
 *     are LV GregTech assembler builds - they are machines, not trinkets.
 *   - Organic/natural evolution items (scales, teeth, augurite, sachets, wreaths,
 *     stones) are bench-tier shapeless/shaped crafts from TFC-native materials.
 *   - Ability items (Capsule/Patch/Shield) are late, deliberately pricier than a
 *     plain held item since they rewrite a mon's ability.
 *   - Held/utility gear is spread copper -> wrought iron -> steel by how "tech" or
 *     "armoured" each one reads thematically.
 *   - Functional blocks (Pasture, Restoration Tank) get real multi-material recipes;
 *     cosmetic/marker blocks (Monitor, Shiny Marker) stay simple.
 *   - The two Alcremie sweets are bench tier and rhyme with each other.
 */
const registerCobblemonUtilityRecipes = (event) => {

	//#region Evolution trade items - electronics (LV assembler)

	// Each evolution item gets a distinct flavour of LV assembler build instead of
	// a copy-pasted copper+circuit+redstone recipe: electirizer is a coiled
	// electrical build, magmarizer runs on heat, upgrade is data/circuit heavy,
	// and dubious disc is literally a disc bolted to a circuit.
	const COBBLEMON_ELECTRONIC_EVOLUTION_ITEMS = [
		['cobblemon:electirizer', ['2x #forge:wires/copper', '#gtceu:circuits/lv', '2x minecraft:redstone']],
		['cobblemon:magmarizer', ['2x #forge:plates/copper', '#gtceu:circuits/lv', 'minecraft:magma_cream']],
		['cobblemon:upgrade', ['#forge:plates/copper', '2x #gtceu:circuits/lv', 'minecraft:redstone']],
		['cobblemon:dubious_disc', ['#forge:plates/copper', '#gtceu:circuits/lv', 'etched:blank_music_disc']]
	]

	// NOTE: no spread operator here. KubeJS runs on Rhino, which does not support
	// ES6 spread - `.itemInputs(...inputs)` is a hard SYNTAX ERROR that aborts the
	// WHOLE file, taking every recipe in it down. node --check does not catch this
	// because Node accepts the syntax. itemInputs happily takes an array instead.
	COBBLEMON_ELECTRONIC_EVOLUTION_ITEMS.forEach(([item, inputs]) => {
		event.recipes.gtceu.assembler(`tfg:${global.linuxUnfucker(item)}`)
			.itemInputs(inputs)
			.itemOutputs(item)
			.duration(300)
			.EUt(GTValues.VA[GTValues.LV])
	})

	//#endregion

	//#region Evolution trade items - organic/natural (bench)

	event.shapeless('cobblemon:protector', [
		'#forge:plates/wrought_iron',
		'minecraft:leather'
	]).id('tfg:shapeless/protector')

	event.shapeless('cobblemon:deep_sea_tooth', [
		'minecraft:flint',
		'#forge:dusts/calcite'
	]).id('tfg:shapeless/deep_sea_tooth')

	event.shapeless('cobblemon:sachet', [
		'#forge:cloth',
		'#forge:dyes/red'
	]).id('tfg:shapeless/sachet')

	event.shapeless('cobblemon:whipped_dream', [
		'tfc:wool',
		'firmalife:raw_honey'
	]).id('tfg:shapeless/whipped_dream')

	event.shapeless('cobblemon:galarica_cuff', [
		'#forge:rods/wooden',
		'#forge:plates/copper'
	]).id('tfg:shapeless/galarica_cuff')

	event.shapeless('cobblemon:galarica_wreath', [
		'3x #forge:rods/wooden',
		'#forge:string'
	]).id('tfg:shapeless/galarica_wreath')

	event.shapeless('cobblemon:auspicious_armor', [
		'#forge:plates/gold',
		'#forge:dyes/yellow',
		'minecraft:flint'
	]).id('tfg:shapeless/auspicious_armor')

	event.shapeless('cobblemon:malicious_armor', [
		'#forge:plates/black_steel',
		'#forge:dyes/black',
		'minecraft:flint'
	]).id('tfg:shapeless/malicious_armor')

	event.shapeless('cobblemon:black_augurite', [
		'#forge:dusts/black_steel',
		'minecraft:flint'
	]).id('tfg:shapeless/black_augurite')

	event.shapeless('cobblemon:light_clay', [
		'2x minecraft:clay',
		'#forge:dusts/calcite'
	]).id('tfg:shapeless/light_clay')

	//#endregion

	//#region Ability items - late, deliberately costly

	event.shapeless('cobblemon:ability_capsule', [
		'#forge:plates/titanium',
		'#gtceu:circuits/mv',
		'#forge:dusts/diamond'
	]).id('tfg:shapeless/ability_capsule')

	event.shapeless('cobblemon:ability_patch', [
		'cobblemon:ability_capsule',
		'minecraft:nether_star'
	]).id('tfg:shapeless/ability_patch')

	event.shapeless('cobblemon:ability_shield', [
		'#forge:double_plates/titanium',
		'#gtceu:circuits/mv'
	]).id('tfg:shapeless/ability_shield')

	//#endregion

	//#region Tech-flavoured held items (LV assembler)

	event.recipes.gtceu.assembler('tfg:cell_battery')
		.itemInputs('#gtceu:batteries/lv', '#forge:plates/copper')
		.itemOutputs('cobblemon:cell_battery')
		.duration(200)
		.EUt(GTValues.VA[GTValues.LV])

	event.recipes.gtceu.assembler('tfg:exp_share')
		.itemInputs('#forge:plates/brass', '#gtceu:circuits/lv', 'minecraft:redstone')
		.itemOutputs('cobblemon:exp_share')
		.duration(300)
		.EUt(GTValues.VA[GTValues.LV])

	// cobblemon:metronome is NOT registered in this pack - the Cobblemon jar ships
	// an item model for it but no actual item, so EMI has no such id and any recipe
	// producing it aborts the builder chain (the symptom is a GT recipe that ends up
	// with no duration key). Deliberately left with no recipe.


	//#endregion

	//#region Held/utility gear - copper age (light, cheap accessories)

	event.shapeless('cobblemon:destiny_knot', [
		'2x #forge:string',
		'#forge:dyes/red'
	]).id('tfg:shapeless/destiny_knot')

	event.shapeless('cobblemon:everstone', [
		'minecraft:flint',
		'#tfc:rock_knapping'
	]).id('tfg:shapeless/everstone')

	event.shapeless('cobblemon:charcoal_stick', [
		'minecraft:charcoal',
		'#forge:rods/wooden'
	]).id('tfg:shapeless/charcoal_stick')

	event.shapeless('cobblemon:focus_sash', [
		'#forge:cloth',
		'#forge:string'
	]).id('tfg:shapeless/focus_sash')

	// Leftovers heal a Pokemon a little each turn by being FOOD, so gunpowder was
	// nonsense. Scraps of a vegetable and a meat wrapped in cloth reads right and
	// uses tags so any vegetable or meat works.
	event.shapeless('cobblemon:leftovers', [
		'#tfc:foods/vegetables',
		'#tfc:foods/meats',
		'#forge:cloth'
	]).id('tfg:shapeless/leftovers')



	event.shapeless('cobblemon:absorb_bulb', [
		'#forge:glass',
		'#forge:dusts/calcite'
	]).id('tfg:shapeless/absorb_bulb')


	//#endregion

	//#region Held/utility gear - wrought iron age (mechanical, sprung, armoured)

	// Every item here used to be the same wrought-iron-plate + cloth + string
	// filler recipe. Each now has its own thematic secondary ingredient - red
	// card is literally a red card (red dye + cardboard, per owner request), the
	// rest keep a wrought iron anchor but read like what they are.
	const COBBLEMON_IRON_AGE_GEAR = [
		['cobblemon:air_balloon', ['#forge:plates/wrought_iron', 'waterflasks:bladder', '#forge:string']],
		['cobblemon:blunder_policy', ['#forge:plates/wrought_iron', 'minecraft:paper', '#forge:dyes/gray']],
		['cobblemon:covert_cloak', ['#forge:plates/wrought_iron', '#forge:cloth', '#forge:dyes/black']],
		['cobblemon:loaded_dice', ['#forge:plates/wrought_iron', '#forge:bones', '#forge:string']],
		['cobblemon:red_card', ['#forge:dyes/red', '#forge:plates/cardboard']],
		['cobblemon:ring_target', ['#forge:plates/wrought_iron', '#forge:rings/wrought_iron', '#forge:dyes/red']],
		['cobblemon:weakness_policy', ['#forge:plates/wrought_iron', 'minecraft:paper', '#forge:dyes/white']]
	]

	COBBLEMON_IRON_AGE_GEAR.forEach(([item, ingredients]) => {
		event.shapeless(item, ingredients)
			.id(`tfg:shapeless/${global.linuxUnfucker(item)}`)
	})

	//#endregion

	//#region Held/utility gear - steel age (armour, protective, heavy)

	// Safety goggles want glass lenses, rocky helmet wants actual stone, reaper
	// cloth wants dark-dyed cloth, and assault vest wants doubled plating for
	// padding - so each keeps the 3x3 shape but swaps in its own materials.
	const COBBLEMON_STEEL_AGE_GEAR = [
		['cobblemon:assault_vest', { P: '#forge:double_plates/steel', S: '#forge:cloth', C: '#forge:string' }],
		['cobblemon:reaper_cloth', { P: '#forge:plates/steel', S: '#forge:cloth', C: '#forge:dyes/black' }],
		['cobblemon:rocky_helmet', { P: '#forge:plates/steel', S: '#forge:stone', C: '#forge:string' }],
		['cobblemon:safety_goggles', { P: '#forge:plates/steel', S: '#forge:cloth', C: '#forge:glass' }]
	]

	COBBLEMON_STEEL_AGE_GEAR.forEach(([item, key]) => {
		event.shaped(item, [
			'PSP',
			'SCS',
			'PSP'
		], key).id(`tfg:shaped/${global.linuxUnfucker(item)}`)
	})

	//#endregion

	//#region Power items - steel age training gear family

	// Differentiate by body part and how much steel each carries: the anklet is
	// the lightest (single plate, strapped on), the bracer is mid-weight and
	// strapped, and the weight is the heaviest with no strap at all.
	const COBBLEMON_POWER_ITEMS = [
		['cobblemon:power_anklet', ['#forge:plates/steel', '#forge:cloth', '#forge:string']],
		['cobblemon:power_bracer', ['#forge:double_plates/steel', '#forge:cloth', '#forge:string']],
		['cobblemon:power_weight', ['2x #forge:double_plates/steel', '#forge:cloth']]
	]

	COBBLEMON_POWER_ITEMS.forEach(([item, ingredients]) => {
		event.shapeless(item, ingredients)
			.id(`tfg:shapeless/${global.linuxUnfucker(item)}`)
	})

	//#endregion

	//#region Evolution/held misc - eviolite, smithing template

	event.shapeless('cobblemon:eviolite', [
		'#forge:gems/certus_quartz',
		'#forge:dusts/diamond'
	]).id('tfg:shapeless/eviolite')

	event.shapeless('cobblemon:automaton_armor_trim_smithing_template', [
		'minecraft:paper',
		'#forge:plates/black_steel'
	]).id('tfg:shapeless/automaton_armor_trim_smithing_template')

	event.shapeless('cobblemon:black_sludge', [
		'#forge:dusts/dark_ash',
		'#forge:dusts/sulfur'
	]).id('tfg:shapeless/black_sludge')

	//#endregion

	//#region Blocks

	// Pasture. A functional Cobblemon block that lets mons roam - it earns a real
	// bench recipe: a wooden-fenced enclosure with a copper feed trough.
	event.shaped('cobblemon:pasture', [
		'FFF',
		'FCF',
		'FFF'
	], {
		F: '#forge:fences/wooden',
		C: '#forge:plates/copper'
	}).id('tfg:shaped/pasture')

	// Restoration Tank. The fossil system's incubator - a fossil goes in, a
	// Pokemon comes out - and the partner block to the Fossil Analyzer in
	// recipes.wood_fossils.js. Like the analyzer it had only an LV assembler
	// route, which gated hand-dug fossils behind electricity, so it now also has
	// a bench recipe at the same tin-alloy tier as the PC, healing machine and
	// data monitor.
	//
	// Built as what it is: a glass tank on a metal frame, plumbed with tin alloy
	// pipe, with a Revive suspended in it - the same Revive Cobblemon's own
	// recipe asks for, which keeps the medicine line feeding the fossil line.
	event.shaped('cobblemon:restoration_tank', [
		'GGG',
		'PRP',
		'PIP'
	], {
		G: '#forge:glass',
		P: '#forge:plates/tin_alloy',
		R: 'cobblemon:revive',
		I: '#forge:small_fluid_pipes/tin_alloy'
	}).id('tfg:shaped/restoration_tank')

	// The LV route, for automation - aluminium shell, LV electronics, a glass
	// viewport, same as the healing machine.
	event.recipes.gtceu.assembler('tfg:restoration_tank')
		.itemInputs('4x #forge:plates/aluminium', '#gtceu:circuits/lv', 'gtceu:lv_electric_pump', '#forge:glass')
		.itemOutputs('cobblemon:restoration_tank')
		.duration(400)
		.EUt(GTValues.VA[GTValues.LV])

	// Data Monitor. NOT decorative, despite where an earlier version of this file filed it: it is a
	// metal machine block (strength 5.0, requiresCorrectToolForDrops) with a lit screen and a whole
	// set of scanning blockstates, and it emits light 13 while running. So it gets a machine's
	// recipe rather than the three-ingredient shapeless it used to have - which also leaned on
	// minecraft:redstone_lamp, an item this pack gives no recipe of its own.
	//
	// Shaped like the thing it is: a glass screen set in a metal case with the wiring behind it,
	// standing on a pair of legs with a pipe between them for the cabling to run through. Tin alloy
	// throughout - plates, rods and pipe - keeps it reachable in the bronze age alongside the PC and
	// healing machine, since a Data Monitor displays information the player already has, not a gate.
	//
	// Tin alloy's only pipe form is the small fluid pipe; GregTech generates pipe sizes per material
	// and tin alloy gets no normal or large variant, which is why the tag is small_fluid_pipes.
	event.shaped('cobblemon:monitor', [
		'PGP',
		'PWP',
		'RIR'
	], {
		P: '#forge:plates/tin_alloy',
		G: '#forge:glass',
		W: 'gtceu:red_alloy_single_wire',
		R: '#forge:rods/tin_alloy',
		I: '#forge:small_fluid_pipes/tin_alloy'
	}).id('tfg:shaped/monitor')

	// The LV route, for automation - same shape as the PC and healing machine above.
	event.recipes.gtceu.assembler('tfg:automation/monitor')
		.itemInputs('4x #forge:plates/aluminium', '#gtceu:circuits/lv', '#forge:glass', '2x #forge:fine_wires/copper')
		.itemOutputs('cobblemon:monitor')
		.duration(300)
		.EUt(GTValues.VA[GTValues.LV])

	//#endregion

	//#region Pokedex - all seven colours

	// Cobblemon 1.8's Pokedex is a real progression item, not a trophy: it is how
	// a player scans a Pokemon, reads its data and tracks what they have caught,
	// and several of the mod's own systems key off owning one. It had no recipe
	// at all here - event.remove({ mod: 'cobblemon' }) in recipes.js wiped
	// Cobblemon's, and nothing replaced it - so all seven colours were dead
	// entries in EMI.
	//
	// The shape is Cobblemon's own, retiered onto the pack's worked metal: a tin
	// alloy case with a copper fascia, two apricorns of the matching colour set
	// into the shell, a glass pane screen, and the red alloy wiring that drives
	// it running down either side of that screen. Colour is decided by the
	// apricorn and by nothing else, exactly as upstream - so the Pokedex a
	// player carries is the apricorn tree they chose to farm.
	//
	// Tin alloy rather than wrought iron puts this at the same bronze-age tier as
	// the PC, healing machine and data monitor, which is where a handheld screen
	// belongs - and it is the same wire the monitor uses, so the two read as the
	// same generation of Cobblemon electronics.
	//
	// Cobblemon's own #cobblemon:pokedex_screen tag is deliberately not used: a
	// pane of glass is the screen, plainly, rather than a tag whose only reliable
	// member on 1.20.1 is bright powder.
	;['black', 'blue', 'green', 'pink', 'red', 'white', 'yellow'].forEach(colour => {
		event.shaped(`cobblemon:pokedex_${colour}`, [
			'IAC',
			'WSW',
			'IAC'
		], {
			I: '#forge:plates/tin_alloy',
			C: '#forge:plates/copper',
			A: `cobblemon:${colour}_apricorn`,
			S: '#forge:glass_panes',
			W: 'gtceu:red_alloy_single_wire'
		}).id(`tfg:shaped/pokedex_${colour}`)
	})

	//#endregion

	//#region Technical Machines - Cobblemon's own system
	//
	// Cobblemon 1.8 brings its own complete TM system: a Blank TM, a TM Machine that prints a move
	// onto one, and a Disc Shelf to rack the results. The pack used to run SimpleTMs alongside it,
	// which meant two parallel TM systems and two "Blank TM" items sitting next to each other in
	// EMI. SimpleTMs has been dropped; this is now the only one.
	//
	// Blank TM - a blank optical disc, so it is made the way a disc actually is.
	//
	// Cobblemon's own recipe (two amethyst shards + two glass on a bench) is gone: recipes.js opens
	// with event.remove({ mod: 'cobblemon' }), which wiped it and left the whole TM line
	// unobtainable. Rather than restore a bench craft, this follows real CD manufacture, which is a
	// pressing process, not an assembly one - and glassworking is the pack's pressing process.
	//
	// The four operations map onto the four real stages, in order:
	//   flatten (paddle)  - the molten gather is pressed flat against a stamper, as polycarbonate is
	//   pinch   (jacks)   - the centre hole
	//   roll    (cloth)   - the surface is polished, standing in for the lacquer coat
	//   saw     (gem saw) - the edge is trimmed to a circle
	//
	// Silica deliberately, not the #tfc:glass_batches tag: silica is TFC's clearest glass and the
	// only batch its own lens is made from, and a CD is an optical medium for the same reason a lens
	// is. It also means white sand, which is a real sourcing step rather than a free one.
	event.custom({
		type: 'tfc:glassworking',
		operations: ['flatten', 'pinch', 'roll', 'saw'],
		batch: { item: 'tfc:silica_glass_batch' },
		result: { item: 'cobblemon:blank_tm' }
	}).id('tfg:glassworking/blank_tm')

	// The industrial route. Real discs are stamped, then given a reflective metal layer - which is
	// exactly a forming press plus aluminium foil, so the automated version reads as the same
	// process scaled up rather than a different one. Four discs a cycle, since a press does not
	// produce one at a time.
	event.recipes.gtceu.forming_press('tfg:automation/blank_tm')
		.itemInputs('4x #forge:glass', '#forge:foils/aluminium')
		.itemOutputs('4x cobblemon:blank_tm')
		.duration(200)
		.EUt(GTValues.VA[GTValues.LV])

	// TM Machine. The bench that prints moves onto blank discs. The bench recipe exists so the whole
	// TM system is not locked behind GregTech; it is deliberately the pricier of the two in
	// materials, which is the trade the pack makes everywhere else.
	event.shaped('cobblemon:tm_machine', [
		'PGP',
		'PMP',
		'PWP'
	], {
		P: '#forge:plates/wrought_iron',
		G: '#forge:glass',
		M: 'create:precision_mechanism',
		W: 'gtceu:red_alloy_single_wire'
	}).id('tfg:shaped/tm_machine')

	event.recipes.gtceu.assembler('tfg:automation/tm_machine')
		.itemInputs('4x #forge:plates/aluminium', '2x #gtceu:circuits/lv', 'gtceu:lv_electric_motor', '#forge:glass')
		.itemOutputs('cobblemon:tm_machine')
		.duration(400)
		.EUt(GTValues.VA[GTValues.LV])

	// Disc Shelf. Furniture: fourteen slots to rack up technical machines, no power and no logic.
	// So it is a bench craft and nothing more - lumber for the carcass, a little metal for the
	// rails the discs sit in. Any of the pack's woods will do, hence the #tfc:lumber tag.
	event.shaped('2x cobblemon:disc_shelf', [
		'LLL',
		'PPP',
		'LLL'
	], {
		L: '#tfc:lumber',
		P: '#forge:plates/copper'
	}).id('tfg:shaped/disc_shelf')

	// NOTE: cobblemon:technical_machine - a printed TM - deliberately gets no recipe and is NOT
	// hidden. It comes out of the TM Machine's own interface rather than a crafting recipe, so it is
	// genuinely obtainable; hiding it would be a lie, and giving it a bench recipe would bypass the
	// machine the rest of this region exists to make.

	//#endregion

	//#region Alcremie sweets - bench tier, rhyme with each other

	// Sweet leans on honey and sugar; tart gets soured with vinegar instead.
	const COBBLEMON_SWEET_APPLES = [
		['cobblemon:sweet_apple', ['create:honeyed_apple', 'firmalife:raw_honey', 'minecraft:sugar']],
		// tfc:vinegar is a FLUID - as a crafting item it matches nothing and the
		// recipe dies with "Item array cannot be empty". Aspear is canonically the
		// SOUR berry in Pokemon, so it is both a real item and a better fit.
		['cobblemon:tart_apple', ['create:honeyed_apple', 'cobblemon:aspear_berry']]
	]

	COBBLEMON_SWEET_APPLES.forEach(([item, ingredients]) => {
		event.shapeless(item, ingredients)
			.id(`tfg:shapeless/${global.linuxUnfucker(item)}`)
	})

	//#endregion
}
