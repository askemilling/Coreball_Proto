# COREBALL sound effects

All runtime sound effects are local PCM WAV files; no third-party requests are made during gameplay.

## Glass
- File: `glass-break.wav`
- Source: **Glass Break** by Till Behrend, uploaded with permission by TinyWorlds.
- Source page: https://opengameart.org/content/glass-break
- Source file: https://opengameart.org/sites/default/files/glass_breaking.wav
- License: CC0 (public domain dedication), as stated on the source page.
- Adaptation: trimmed leading silence and tail, mono 32 kHz / 16-bit PCM, brief tail fade and peak limiting.

## Bomb
- File: `bomb-blast.wav`
- Source: **Explosion #2**, sound 1808, Joseph SARDIN / BigSoundBank.
- Source page: https://bigsoundbank.com/explosion-2-s1808.html
- Source file: https://bigsoundbank.com/UPLOAD/bwf-en/1808.wav
- License: CC0 (public domain), as stated on the source page.
- Source describes a real agricultural gas cannon at approximately 10 metres, recorded with a Sound Devices MixPre-3 and Sennheiser ME66.
- Adaptation: leading silence removed, mono 32 kHz / 16-bit PCM, peak limiting. This is a recorded blast, not a recording of a military bomb.

## Upgrade
- File: `upgrade-reward.wav`
- Original additive bell/chime composition created for COREBALL: rising C–E–G–C–E flourish, rendered to a reusable sample.
- No third-party source.

## iOS compatibility
- `unlock.wav`: 200 ms of silence, original PCM data. Used only as a media-session compatibility fallback on browsers without AudioSession playback selection.
