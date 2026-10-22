# Minutes Tracker

A single-page tool for tracking how many minutes you're over or under your weekly hours target, and what to do about it on the days you have left.

Open `index.html` in a browser (or enable GitHub Pages for this repo) and:

1. Tap **Load Paycom PDF** and pick your Web Time Sheet export, or type punches in by hand.
2. Set the week's target hours (defaults to 40).
3. Read the **Do this** card: it tells you what time to clock out, or how long a lunch to take, to land exactly on target.

## How it works

- Each week (Sun–Sat) is balanced on its own. Time is counted in exact minutes, with no rounding.
- Finished days show their minutes over or under the daily share of the target (target ÷ workdays).
- Unfinished days are planned from your usual start time and lunch length so each one hits its daily share. The leftover minutes from earlier days are put on the day you choose, through either a later clock-out or a shorter lunch.
- PTO hours count toward the day's total.
- Past days with no punches are treated as even.

Data stays in your browser's local storage; nothing is uploaded. Reading the PDF uses [pdf.js](https://mozilla.github.io/pdf.js/) loaded from cdnjs.
