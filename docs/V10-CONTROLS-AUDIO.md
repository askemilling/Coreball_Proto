# V10 — edge aiming and sample audio

## Aiming

Dragging can start anywhere on the arena. The shot uses the displacement between pointer-down and pointer-up, independently of the ball's position. Dragging from the ball still works; when the ball is at either edge, the same gesture may instead start safely near the screen centre. A single shared function computes the displayed trajectory and the actual launch vector. Primary-pointer tracking, pointer capture and cancellation prevent secondary touches or interrupted gestures from launching a shot.

Ball position, speed, damage, collision geometry, wave rules and economy are unchanged.

## Sound

`audio-v10.js` preloads three local PCM WAV samples and decodes them once. AudioContext resume is called synchronously from user gestures; playback waits for the asynchronous resume and decoding to finish. A short bounded queue preserves the initial effect. iOS AudioSession playback routing is selected where available; older browsers use a silent HTML media compatibility loop. No microphone permission is requested. Playback stops when the page is hidden, and the next interaction reactivates the session.

The SOUND control previews the upgrade flourish, glass break and blast in sequence. Failed downloads show RETRY SOUND; another tap fetches and decodes the samples again. Short per-effect rate limits, a voice cap, and a master compressor control the mix during chain explosions. See `assets/audio/CREDITS.md` for the actual sources and licenses.

## Validation

Real Chromium browser tests at a 393 × 852 mobile viewport:

- A centre-screen drag launches in the expected direction from both left and right ball positions.
- Predicted and actual direction agree, and pointer cancellation never fires a shot.
- All 3 sound files decode and schedule playback after a trusted gesture.
- An analyser at the master audio graph measures a nonzero waveform, peak approximately 0.505 in the test.
- A queued first effect plays after the AudioContext is deliberately suspended and resumed.
- A simulated initial HTTP 503 for the glass sample recovers through RETRY SOUND.
- Existing opening-wave HP, upgrades, collision, rewards, bomb-chain, color-tier and mobile rendering checks still pass.

These tests verify the browser audio graph and interactions; they do not establish the physical loudspeaker output of an iPhone or reproduce every iOS Safari interruption state.
