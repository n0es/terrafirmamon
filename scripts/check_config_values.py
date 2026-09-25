"""Fail if a tuned config value has been reset to its mod default.

Twice now the pack's own settings have silently reverted: once when the repo
was first built from an export that captured stock defaults rather than the
tuned files, and again when the move to packwiz made the repo authoritative
and pushed those defaults onto the live server. Both times it surfaced as
gameplay breaking -- 100 mB ingot moulds instead of 144, Create machines
overstressing -- rather than as anything a diff review caught.

These are the values that define how the pack plays. If one of them changes,
it should be because someone meant it, and then this table changes in the same
commit.

    python scripts/check_config_values.py        # exits non-zero on drift
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

EXPECTED = {
    'defaultconfigs/tfc-server.toml': {
        # TFG runs GregTech's 144 mB ingot, not TFC's stock 100.
        'moldIngotCapacity': '144',
        'moldPickaxeHeadCapacity': '144',
        'moldPropickHeadCapacity': '144',
        'moldAxeHeadCapacity': '144',
        'moldShovelHeadCapacity': '144',
        'moldHoeHeadCapacity': '144',
        'moldChiselHeadCapacity': '144',
        'moldHammerHeadCapacity': '144',
        'moldSawBladeCapacity': '144',
        'moldJavelinHeadCapacity': '144',
        'moldKnifeBladeCapacity': '144',
        'moldScytheBladeCapacity': '144',
        'moldSwordBladeCapacity': '288',
        'moldMaceHeadCapacity': '288',
        'crucibleCapacity': '4608',
        'smallVesselCapacity': '3024',
        'itemCoolingModifier': '0.5',
        'passiveExhaustionMultiplier': '0.65',
        'thirstModifier1': '3.0',
        'naturalRegenerationModifier': '1.25',
    },
    # Create's stress table is rebalanced for TFG; stock values overstress
    # every build in the world.
    'defaultconfigs/create-server.toml': {
        'mediumStressImpact': '1.0',
        'highStressImpact': '2.0',
        'mediumCapacity': '32.0',
        'highCapacity': '128.0',
        'large_water_wheel': '32.0',
        'windmill_bearing': '16.0',
        'hand_crank': '2.0',
        'water_wheel': '4.0',
        'copper_valve_handle': '2.0',
        'steam_engine': '16.0',
        'deployer': '0.25',
        'maxBeltLength': '5',
        'windmillSailsPerRPM': '4',
    },
    'defaultconfigs/vintageimprovements-server.toml': {
        'laser': '0.25',
        'belt_grinder': '0.25',
        'vacuum_chamber': '0.5',
        'lathe': '0.25',
        'lathe_moving': '0.25',
        'vibrating_table': '0.5',
        'helve_kinetic': '0.5',
        'curving_press': '0.5',
        'spring_coiling_machine': '0.5',
        'centrifuge': '0.5',
    },
    'defaultconfigs/createhorsepower-server.toml': {
        'creatureRPMRange': '16',
        'smallCreatureStressRange': '16',
        'mediumCreatureStressRange': '24',
        'largeCreatureStressRange': '32',
    },
    'defaultconfigs/tfg-server.toml': {
        # The world was generated with worldgen version 1; losing this makes
        # TFG warn every op on login.
        'worldgenOverrides': '["minecraft:overworld=1"]',
    },
    'defaultconfigs/firmalife-server.toml': {
        'usePipesForSprinklers': 'false',
        'ovenRequirePeel': 'false',
        'mechanicalPowerCheatMode': 'true',
    },
    'defaultconfigs/framedblocks-server.toml': {
        'glowstoneLightLevel': '3',
    },
    'defaultconfigs/constructionwand-server.toml': {
        'durability': '12286',
    },
}

KV = re.compile(r'^\s*([A-Za-z_][\w.\-]*)\s*=\s*(.+?)\s*$')


def values(path):
    out = {}
    with open(os.path.join(ROOT, path), 'rb') as fh:
        for line in fh.read().decode('utf-8', 'replace').splitlines():
            if line.strip().startswith('#'):
                continue
            m = KV.match(line)
            if m:
                out[m.group(1)] = m.group(2).strip()
    return out


def same(a, b):
    if a == b:
        return True
    try:
        return abs(float(a) - float(b)) < 1e-6
    except ValueError:
        return False


bad = 0
checked = 0
for rel, wanted in EXPECTED.items():
    try:
        got = values(rel)
    except OSError as e:
        print('MISSING  %s (%s)' % (rel, e))
        bad += len(wanted)
        continue
    for key, want in wanted.items():
        checked += 1
        have = got.get(key)
        if have is None:
            print('MISSING  %s: %s' % (rel, key))
            bad += 1
        elif not same(have, want):
            print('DRIFTED  %s: %s = %s  (expected %s)' % (rel, key, have, want))
            bad += 1

if bad:
    print('\n%d of %d tuned values are wrong.' % (bad, checked))
    print('If the change was deliberate, update EXPECTED in this file in the '
          'same commit. If not, the pack just lost tuning again -- the last '
          'known-good source is the generic-pack snapshot on the server '
          'volume (data/terrafirmamon.zip).')
    sys.exit(1)

print('%d tuned config values all correct.' % checked)
