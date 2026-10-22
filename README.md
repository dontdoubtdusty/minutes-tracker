# Timecard Balancer

Tracks how many minutes you're over or under your weekly hours target, and tells you exactly when to clock out (or how long a lunch to take) to land on it. One file (`index.html`), no build step, no server.

## Using it

Turn on GitHub Pages for this repo (**Settings → Pages → Deploy from a branch → `main` / root**) and open the link it gives you.

### Install it as an app (Android)

Open the Pages link in Chrome and tap **Install app** in the page header (or ⋮ → **Install app**). Once installed it opens full screen, works offline, and shows up in the share menu.

### Loading your timesheet

- **From the Paycom app:** share the Web Time Sheet PDF and pick **Timecard Balancer**. (Needs the installed app.)
- **From a file:** tap **Load Paycom PDF**.
- **By hand:** type punches into each day.

Loading a PDF replaces the weeks you had, and you can undo it from the message that appears.

## How it works

- Each week (Sun–Sat) is balanced on its own, in exact minutes with no rounding.
- Finished days show their minutes over or under the daily share of the target (target ÷ workdays).
- Unfinished days are planned from your usual start time and lunch so each hits its daily share, minus any PTO. The leftover minutes from earlier days go on the day you choose, through a later clock-out or a shorter lunch.
- **PTO:** enter hours in a day's **PTO hrs** box. For example, 4 hours of PTO on an 8-hour day plans 4 hours of work (8:00, a 30-minute lunch, out at 12:30), plus any minutes you need to make up.
- On a day you're working, a countdown shows how long until you clock out.
- Confetti when a week lands exactly on target.
- Only the current pay period is kept.

## Files

| File | What it does |
| --- | --- |
| `index.html` | The whole app |
| `feedback.js` | Haptic ticks and button press feedback (shared with the Big apps) |
| `manifest.webmanifest` | Name, colors, icons, and the share-menu entry for PDFs |
| `sw.js` | Offline copy of the app and the PDF reader, and receives shared PDFs |
| `icon-*.png`, `apple-touch-icon.png` | App icons |

## Your data

Everything is saved in your browser's `localStorage` on your device. Nothing is uploaded, and none of it is stored in this repository. Reading PDFs uses [pdf.js](https://mozilla.github.io/pdf.js/), loaded from cdnjs.
