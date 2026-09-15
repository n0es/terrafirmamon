# Mods that cannot ship a download URL

Four mods in this pack have third-party distribution switched off by their authors, so
CurseForge returns no download URL for them and none may be published here. Their metafiles
record the CurseForge project and file IDs instead of a URL:

```toml
[download]
mode = "metadata:curseforge"
```

- `adaptive_performance_tweaks_gamerules`
- `adaptive_performance_tweaks_items`
- `adaptive_performance_tweaks_player`
- `SoulBinding`

Worth checking on the first fresh install whether packwiz-installer fetches these
automatically or whether they need dropping into `mods/` by hand. If they turn out to need
manual installation and that is annoying, all four are optional to the pack - three are
performance tweaks and the fourth is a convenience - and could be dropped rather than made
someone else's problem.

Every other mod resolves to a real download: 200 from Modrinth by file hash, 64 from
CurseForge, and 2 built for this pack and published on this repo's releases.
