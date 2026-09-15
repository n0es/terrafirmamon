# The four mods that cannot be downloaded automatically

Four mods in this pack have **third-party distribution switched off by their authors**. They are
on CurseForge and can be downloaded from the site by hand, but the CurseForge API returns no
download URL for them, and packwiz-installer uses that same API — so it cannot fetch them either.

Verified against `GET /v1/mods/{id}`, which is the authoritative field:

| Mod | CurseForge project | `allowModDistribution` |
|---|---|---|
| APTweaks: Gamerules (11.x Classic) | [561137](https://www.curseforge.com/minecraft/mc-mods/adaptive-performance-tweaks-gamerules) | `false` |
| APTweaks: Items (11.x Classic) | [561439](https://www.curseforge.com/minecraft/mc-mods/adaptive-performance-tweaks-items) | `false` |
| APTweaks: Player (11.x Classic) | [563963](https://www.curseforge.com/minecraft/mc-mods/adaptive-performance-tweaks-player) | `false` |
| Soulbinding | [925229](https://www.curseforge.com/minecraft/mc-mods/soulbinding) | `false` |

Their metafiles therefore record CurseForge coordinates instead of a URL:

```toml
[download]
mode = "metadata:curseforge"
```

Two things worth knowing:

- **The APT bundle does not help.** The parent project, [Adaptive Performance Tweaks
  (450269)](https://www.curseforge.com/minecraft/mc-mods/adaptive-performance-tweaks), also has
  distribution disabled, so switching from the split modules to the bundle changes nothing.
- **APT *core* is the odd one out.** [Project 561087](https://www.curseforge.com/minecraft/mc-mods/adaptive-performance-tweaks-core)
  *does* allow distribution and resolves normally. Four sibling projects from the same author on
  the same version line, one set differently from the other three, which looks more like an
  oversight than a decision.

## What to do about it

1. **Ask.** A polite request to the author to tick "allow third-party distribution" on the three
   APTweaks modules would fix this permanently, and given core already allows it there is a fair
   chance it was never intended. Same for Soulbinding.
2. **Drop them.** All four are optional to how this pack plays — three are performance tweaks and
   the fourth is a convenience. Removing them makes a fresh install completely hands-off.
3. **Install them by hand, once.** Download the four from the links above into `mods/`.
   packwiz-installer will leave them alone, and they update rarely.

Until one of those is chosen, a fresh install is missing these four and everything else works.
