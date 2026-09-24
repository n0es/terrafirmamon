#!/usr/bin/env python3
"""Guard against the pack rewriting a player's key bindings.

Run before publishing a pack change:

    python scripts/check_keybinds.py

WHY THIS EXISTS
---------------
A player complained that the pack moved their keys. The only file that can do
that is config/defaultoptions/keybindings.txt, read by the DefaultOptions mod.

DefaultOptions rewrites a binding only when ALL THREE hold
(KeyMappingDefaultsHandler, verified against defaultoptions-forge-1.20.1-18.0.5):

  1. the binding was never "seen" -- KeyMappingMixin sets that flag inside
     KeyMapping.setKey, which Minecraft calls for every key it reads out of
     options.txt, so any key already in a player's options.txt is protected
  2. the key still sits on the mod's own original default
  3. the pack's default differs from that original

So an established player is safe: every key they have is in their options.txt,
customised or not. Evidence, from this instance's logs:

    12Sep2026 19:17  Applied 118 defaults to key mappings (33 keys were reconfigured)   <- first run
    every run since  Applied 118 defaults to key mappings (0 keys were reconfigured)

THE ONE REMAINING WAY TO BURN SOMEONE
-------------------------------------
Add a mod, and its keys are not in anybody's options.txt yet. Condition 1 is
satisfied for every existing player, so the pack's entry wins over the mod's
own default -- silently, on their next launch. If that lands on a key they
already use for something else, they get a conflict they never asked for.

That is what this script is for: it fails when keybindings.txt gains entries,
so adding a mod cannot quietly ship new bindings to everyone. If the new
entries are intended, update the baseline below in the same commit and say so
in the message.
"""
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
KEYBINDS = os.path.join(HERE, '..', 'config', 'defaultoptions', 'keybindings.txt')

# Entry count at the last deliberate review. Bump only with intent.
BASELINE = 136

VANILLA = {
    'attack', 'use', 'forward', 'left', 'back', 'right', 'jump', 'sneak',
    'sprint', 'drop', 'inventory', 'chat', 'playerlist', 'pickItem', 'command',
    'socialInteractions', 'screenshot', 'togglePerspective', 'smoothCamera',
    'fullscreen', 'spectatorOutlines', 'swapOffhand', 'saveToolbarActivator',
    'loadToolbarActivator', 'advancements', 'hotbar',
}


def load():
    with open(KEYBINDS, encoding='utf-8') as fh:
        return [ln.strip() for ln in fh if ln.strip()]


def main():
    if not os.path.isfile(KEYBINDS):
        print('keybindings.txt is absent: the pack ships no bindings at all.')
        print('That is the maximally safe state. Nothing to check.')
        return 0

    lines = load()
    names = [ln.split(':')[0] for ln in lines]
    dupes = {n for n in names if names.count(n) > 1}

    mod_keys = []
    for name in names:
        body = name[len('key_key.'):] if name.startswith('key_key.') else name
        if body.split('.')[0] not in VANILLA:
            mod_keys.append(name)

    print('entries            :', len(lines), '(baseline %d)' % BASELINE)
    print('vanilla-key entries:', len(lines) - len(mod_keys))
    print('mod-key entries    :', len(mod_keys), '<- these are the ones that can')
    print('                      claim a key on a player who does not have it yet')

    failed = False
    if dupes:
        print()
        print('FAIL: duplicate entries, last one silently wins:', sorted(dupes))
        failed = True

    if len(lines) > BASELINE:
        print()
        print('FAIL: %d new entries since the baseline.' % (len(lines) - BASELINE))
        print('New bindings reach every existing player, because a key they have')
        print('never had is not in their options.txt and so is not protected.')
        print('If this is intended, raise BASELINE in this file in the same commit.')
        failed = True
    elif len(lines) < BASELINE:
        print()
        print('NOTE: %d fewer entries than the baseline. Removing entries is safe' % (BASELINE - len(lines)))
        print('for players; it only means new installs fall back to mod defaults.')
        print('Lower BASELINE to match once that is deliberate.')

    print()
    print('PASS: no new bindings' if not failed else 'FAILED')
    return 1 if failed else 0


if __name__ == '__main__':
    sys.exit(main())
