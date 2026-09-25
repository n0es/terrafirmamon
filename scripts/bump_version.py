"""Bump the pack version and push it to the main menu.

The version lives in two places that must never drift:

  pack.toml                            what packwiz reports
  config/fancymenu/assets/version.txt  what the main menu shows, read at
                                       runtime by FancyMenu's file_text
                                       placeholder

Clients get version.txt through the normal packwiz sync, so the menu updates
itself on the same run that installs the update -- nothing to edit in the
layout editor per release.

Usage, from the repo root:

    python scripts/bump_version.py            # 1.2.1 -> 1.2.2
    python scripts/bump_version.py minor      # 1.2.1 -> 1.3.0
    python scripts/bump_version.py 2.0.0      # explicit

Run it as the last step before committing a release, then commit pack.toml,
index.toml and version.txt together.
"""
import hashlib
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VERSION_FILE = 'config/fancymenu/assets/version.txt'


def read(path):
    with open(os.path.join(ROOT, path), 'rb') as fh:
        return fh.read()


def write(path, data):
    with open(os.path.join(ROOT, path), 'wb') as fh:
        fh.write(data)


def next_version(current, arg):
    if arg and re.fullmatch(r'\d+\.\d+\.\d+', arg):
        return arg
    major, minor, patch = (int(p) for p in current.split('.'))
    if arg in (None, 'patch'):
        return '%d.%d.%d' % (major, minor, patch + 1)
    if arg == 'minor':
        return '%d.%d.0' % (major, minor + 1)
    if arg == 'major':
        return '%d.0.0' % (major + 1)
    raise SystemExit('usage: bump_version.py [patch|minor|major|X.Y.Z]')


pack = read('pack.toml').decode()
current = re.search(r'^version = "([^"]+)"', pack, re.M).group(1)
new = next_version(current, sys.argv[1] if len(sys.argv) > 1 else None)
print('%s -> %s' % (current, new))

# No trailing newline: the placeholder renders the file's text verbatim.
write(VERSION_FILE, new.encode())
pack = re.sub(r'^version = "[^"]+"', 'version = "%s"' % new, pack, count=1, flags=re.M)

# Refresh this one file's entry in the index, then the index hash pack.toml
# carries -- that hash is what makes a client notice there is an update at all.
index = read('index.toml').decode()
entry = re.search(
    r'file = "%s"\nhash = "([0-9a-f]+)"' % re.escape(VERSION_FILE), index)
digest = hashlib.sha256(new.encode()).hexdigest()
if entry:
    index = index[:entry.start(1)] + digest + index[entry.end(1):]
else:
    raise SystemExit('%s is not in index.toml -- add it with the reindexer first'
                     % VERSION_FILE)
write('index.toml', index.encode())

index_hash = hashlib.sha256(index.encode()).hexdigest()
pack = re.sub(r'(\[index\][^\[]*hash = ")[0-9a-f]+',
              lambda m: m.group(1) + index_hash, pack)
write('pack.toml', pack.encode())

print('index hash:', index_hash)
print('now commit pack.toml, index.toml and', VERSION_FILE)
