# Audio Assets

This directory contains audio files for Car Battle Chase.

## Expected Files

Audio files will be generated via GCP Lyria API or Web Audio API synthesis:

### BGM (Background Music)
- `bgm_title.wav` - Title screen music (upbeat 8-bit style)
- `bgm_game.wav` - Main gameplay music (energetic chiptune)
- `bgm_gameover.wav` - Game over music (sad 8-bit tune)
- `bgm_victory.wav` - Victory fanfare

### SFX (Sound Effects)
- `sfx_bomb_throw.wav` - Bomb launch sound
- `sfx_bomb_explode.wav` - Explosion sound
- `sfx_missile_launch.wav` - Missile fire sound
- `sfx_missile_explode.wav` - Missile impact
- `sfx_enemy_hit.wav` - Enemy taking damage
- `sfx_enemy_destroy.wav` - Enemy destroyed
- `sfx_player_hit.wav` - Player taking damage
- `sfx_powerup.wav` - Power-up collection
- `sfx_countdown.wav` - Countdown beep
- `sfx_button.wav` - UI button press

## Fallback

If audio files are not available, the game uses Web Audio API oscillator-based synthesis for all sound effects, ensuring the game remains playable without external audio files.
