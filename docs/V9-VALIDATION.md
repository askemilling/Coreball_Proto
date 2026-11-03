# V9 rendering correction

The V8 implementation did not closely match the reference and was not adequately tested for mobile frame times.

V9 uses a CSS-composited static cavern, a cached gemstone layer invalidated on damage, destruction and wave movement, 64-pixel precolored image sprites, a maximum 2x canvas backing scale, baked rail/orb textures, fixed-step effect animation, and HUD writes only when values change. The game renders at up to 60 FPS independently of a 120 Hz display. Health, rewards, spawn count, tier progression, collisions, upgrade costs, bombs and aiming are preserved. Artwork size is reduced to create visual space without changing hitboxes.

## Verification

Real headless Chromium 153, 393 x 852 viewport, emulated device scale 3, software rendering, same host for both versions. These are browser test results, **not measurements on an iPhone**.

- V8: 60 complete idle render samples, median 48.2 ms, p95 61.5 ms (3x backing scale).
- V9: 60 complete idle render samples, median 0.3 ms, p95 0.4 ms (2x backing scale).
- Both synchronous render comparisons force a canvas readback so drawing is complete before timing ends.
- Ordinary interactive shot: 120 displayed frames at 60.0 FPS, frame interval p95 16.8 ms, measured JS CPU p95 3.7 ms.
- Stress: 8 balls, 400 initial gems, 330 initial fragments; 180 physics/effect/render samples, median 2.1 ms, p95 10.2 ms, max 17.5 ms. Synchronous CPU timing does not measure every GPU/compositor cost.
- No game JavaScript errors during the browser test.
- Regression tests: opening wave count and HP, wave 2 HP, all upgrades, collision/destruction, loot arrival, chain explosions, exact HP tiers, mobile overflow and canvas scale, compact sprite dimensions.

Run `npm install`, `npx playwright install chromium`, then `npm test`. `COREBALL_CHROMIUM` may select an already installed browser executable. Add `?perf=1` to the game URL to display sampled live frame and CPU statistics; these statistics are hidden in normal play.

## Art

`assets/jewels-v9.png` and `assets/button-v9.png` were generated with the built-in image tool as production assets using the user's reference. They are integrated into gameplay, not screenshots. The gemstone prompt specified four transparent isolated cuts in a 2 x 2 grid, 12–24 large clean refractive facets, no grain, no halos and no UI. The button prompt specified one empty beveled octagonal crystal frame, dark empty center, cyan upper-left and magenta lower-right refraction, no text or icons. Rail and orb sources are `assets/rail-v9.svg` and `assets/orb-v9.svg`, rasterized once for gameplay.

The reference's full rainbow cannot appear in waves 1–2 without violating the user's 1-HP color rule. Those waves intentionally remain silver. Overall reference fidelity still has room for refinement; desktop test FPS does not guarantee the same results in iOS Safari.
