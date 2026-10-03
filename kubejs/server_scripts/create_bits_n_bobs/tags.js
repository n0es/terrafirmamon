// priority: 0
"use strict";

// Bits 'n' Bobs ships as a TerraFirmaMon fork (0.0.41-tfm.1) for one feature only: chain drives
// wrapped around cogwheels. Every other feature is switched off in config/bits_n_bobs-common.toml.

// Greate's cogwheel tiers that exist in this pack; the higher tiers are removed by reliable_remover.
const BNB_CHAIN_DRIVE_COGWHEEL_MATERIALS = ['andesite_alloy', 'steel', 'aluminium', 'stainless_steel', 'titanium']
const BNB_CHAIN_DRIVE_CASINGS = ['andesite', 'brass']
// Greate's pump tiers in this pack (the andesite alloy pump is removed too).
const BNB_CHAIN_DRIVE_PUMP_MATERIALS = ['steel', 'aluminium', 'stainless_steel', 'titanium']

const registerCreateBitsNBobsItemTags = (event) => {

	// TFC's metal chains stand in for vanilla chain, which this pack removes. The chain drive
	// refunds and draws whichever metal the loop was built from.
	event.add('bits_n_bobs:cogwheel_chains', '#tfg:metal_chains')

	// Nothing else from the mod is enabled, so nothing should show in EMI
	event.add('c:hidden_from_recipe_viewers', /^bits_n_bobs:/)
}

const registerCreateBitsNBobsBlockTags = (event) => {

	// Greate's cogwheels replace Create's here, bare and encased. While chained, a cogwheel is
	// swapped for the fork's chain cogwheel, which keeps its Greate tier, looks and casing.
	BNB_CHAIN_DRIVE_COGWHEEL_MATERIALS.forEach(material => {
		event.add('bits_n_bobs:chain_drive_cogwheels', `greate:${material}_cogwheel`)
		event.add('bits_n_bobs:chain_drive_cogwheels', `greate:large_${material}_cogwheel`)
		BNB_CHAIN_DRIVE_CASINGS.forEach(casing => {
			event.add('bits_n_bobs:chain_drive_cogwheels', `greate:${casing}_encased_${material}_cogwheel`)
			event.add('bits_n_bobs:chain_drive_cogwheels', `greate:${casing}_encased_large_${material}_cogwheel`)
		})
	})

	// Pumps are never swapped (they have to keep pumping); the chain drives them in place, and
	// needs at least one real cogwheel in the loop to hold it.
	BNB_CHAIN_DRIVE_PUMP_MATERIALS.forEach(material => {
		event.add('bits_n_bobs:chain_drive_attachments', `greate:${material}_mechanical_pump`)
	})
}
