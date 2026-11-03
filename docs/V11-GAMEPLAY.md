# V11 — turn control, cave entrance and shockwave damage

## Turn control

The fixed 1,400-physics-tick turn cutoff is removed. A normal turn ends when the balls return and pending blast waves finish. The new top-left lightning button toggles 4× simulation speed. Rendering remains separately capped; physics uses the same collision substeps instead of increasing the distance moved per step.

Only while fast-forward is enabled, 10 seconds of foreground time without crystal damage ends a stalled turn. Damage restarts this timer. Turning fast-forward off restores ordinary play without an idle reset. Starting a shot, ending a shot and resetting the game clear fast-forward state. Paused/background time does not consume the entire watchdog period.

## Cave and placement

A new original raster ceiling sprite is layered above the arena. The physics ceiling is one flat horizontal boundary at game coordinate y=42; decorative crystal points do not create additional colliders.

New wave crystals start fully inside the arena and emerge visually below the cave mouth over 18 fixed ticks. A new shot is blocked during that brief emergence so the visible target and its collider are aligned before firing. The 30-unit crystal descent is preserved.

Point-to-segment clearance checks account for the full width and end caps of each rail. Spawning avoids rails, and old crystals are checked again after crystals and rails move different distances. Dense layouts use a bounded fallback to keep crystals out of solid rails. Gold crystals reserve their larger footprint and displace nearby ordinary crystals if necessary. Normal wave spawn counts are preserved in the regression layout test.

## Bombs

Each expanding shockwave applies 24 HP damage exactly once to each affected crystal. It uses a per-wave set, so a surviving crystal is not damaged repeatedly by adjacent animation frames. Black crystals with 25 HP survive one wave with 1 HP; a 100-HP gold crystal survives with 76 HP. Different bombs still deal separate damage and can chain.

Shockwave expansion is reduced from 2.8 to 0.9 game units per fixed tick. The radius remains 74. Blast damage updates HP colors, hit effects and rewards through the same damage path as the ball.

## Validation

`npm test` in Chromium at a 393 × 852 viewport checks:

- Normal horizontal flight remains active after 2,500 physics ticks.
- Fast-forward runs four ordinary physics steps per simulation frame.
- No early fast-forward reset, hits restart the watchdog, and 10 idle seconds end the turn.
- The lightning button toggles and emergence blocks premature shots.
- A flat ceiling reflects the ball downward.
- A blast kills a 20-HP crystal, leaves black at 1 HP and gold at 76 HP after 90 wave ticks.
- Twenty wave transitions retain full spawn counts, keep crystal bounds visible and clear of rails, spawn the gold crystal and finish emergence.
- Previous edge-dragging, audio-output/recovery, upgrade, collision, reward and opening-wave HP regressions pass.

Mobile-layout screenshots were inspected locally. The cave sprite was generated as an actual transparent environment asset with the built-in image tool and saved at `assets/cave-mouth-v11.png`.
