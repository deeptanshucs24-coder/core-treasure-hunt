# The Great CORE Treasure Hunt

A standalone, mobile-first college treasure hunt built with HTML, CSS, JavaScript, browser APIs, and localStorage. It includes five private route orders, one-step-at-a-time clues, persistent timers, manual and QR checkpoint verification, a local organizer screen, printable checkpoint cards, and an offline shell.

## Run locally

This is a static ES-module app. Use VS Code Live Server or any static server from this folder:

```text
Open index.html with Live Server
```

Do not use `file://` for QR links or the service worker. A local server is required.

Everything is stored in browser localStorage. There is no Firebase, backend, database, external API, or live leaderboard. Demo admin PIN: `9090`.

## Change the game

Edit `js/game-data.js`:

- Team names, colors, emojis, PINs, and routes are in `GAME_CONFIG.teams`.
- Location names, clues, and backup codes are in `GAME_CONFIG.locations`.
- The final CORE code is `GAME_CONFIG.finalCode`.
- The CORE member display name is `GAME_CONFIG.coreMember`.
- All 25 riddles and their answers are in `GAME_CONFIG.riddles`.
- The organizer PIN is `GAME_CONFIG.adminPin`.

Participants only receive the current riddle and current destination. The route arrays are used by the state engine but are never rendered as a complete route.

## Event screens

- `index.html`: event home and rules teaser
- `login.html`: team selection and PIN login
- `game.html`: participant challenge, timer, clue, and checkpoint verification
- `checkpoint.html`: QR/manual checkpoint verification
- `admin.html`: monitoring, reset controls, event settings, and printable QR cards
- `rules.html`: participant rules

## QR cards

The admin screen creates offline printable checkpoint cards containing the checkpoint URL and backup code. The core game does not depend on an online QR service. If your printer workflow needs a conventional scannable QR image, encode the printed local URL shown on each card with any QR tool before the event; scanning it still lands on the local `checkpoint.html` flow and code verification remains mandatory.

## Resetting data

Use the admin page with PIN `9090` to reset one team or all local data. You can also clear the site data for the Live Server origin in browser settings.
