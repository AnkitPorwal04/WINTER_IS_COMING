# ❄︎ Winter Is Coming ❄︎

Let it snow on your Mac! ☃️

A cozy, endless snowfall for your desktop — snow drifts down over **everything**, piles up on your windows and Dock, lets you roll snowballs and build snowmen, and when things get too snowy… a tiny cartoon sweeper walks across your screen and tidies it all up. 🧹

It's all **one Swift file**. Every flake is drawn in code. No assets, no frameworks, no nonsense.

<!-- ![demo](docs/demo.gif) -->

---

## 🌨️ The Experience

Here's what happens after you start it:

1. **Snow begins to fall.** Three layers of flakes (near, middle, far) drift down in a gentle wind — over every app, every window, even fullscreen video. It's purely visual: your mouse and keyboard pass right through it, so nothing ever gets in your way.
2. **Snow piles up.** Little snowdrifts form on top of your windows, along the Dock, and at the bottom of the screen. With a fullscreen or maximized app in front, the snow quietly collects at the bottom instead.
3. **You play with it.**
   - **Drag a window** and *whoosh* — the snow on it flies off. The faster you drag, the farther it flies.
   - **Move your mouse sideways** through a snowdrift (no clicking!) and it rolls into a snowball that grows as it goes.
   - **Snowballs push each other** around; one nudged off an edge falls, and goes *poof* into a soft heap.
   - **Hold a snowball** with the left mouse button and carry it anywhere.
   - **Stack three snowballs** → ⛄ a snowman appears, carrot nose, red scarf and all.
4. **The sweepers arrive.** It never stops snowing — instead, when the ground fills up (and on a timer you pick — **Sweep Every 1 / 3 / 5 / 10 minutes**, no matter which screen or Space you're on), little guys in red coats and beanies clean every snowy window ledge, the Dock, and the ground, sweep each pile into a flurry, and walk off. A sweep clears every ledge completely; snow knocked loose by dragging or closing a window still tumbles down and settles naturally below. ✨
5. **A reindeer-drawn sleigh flies by.** Every so often, a red-nosed team pulls an empty gift-filled sleigh through the sky from either direction — and optional jingle bells can make the flyby extra festive. 🦌🔔
6. **You stay in control.** One click on the ❄︎ in your menu bar pauses or resumes the whole thing instantly.

Switching desktops/Spaces? The snow rides along seamlessly — it lives above everything, on every Space, and never restarts.

---

## 📦 Download & Install

### Option 1 — npm (recommended)

Requires macOS 13+ and Node 18+.

```sh
npm install -g winter-is-coming
winter-is-coming          # ❄︎ let it snow
```

The first run compiles the Swift file (~7 seconds) and caches the binary — after that it starts instantly.

> **No Swift compiler?** Install the (free, small) Xcode Command Line Tools first:
> ```sh
> xcode-select --install
> ```

All CLI commands:

| Command | What it does |
|---|---|
| `winter-is-coming` / `winter-is-coming start` | Start the snow |
| `winter-is-coming stop` | Spring has arrived — stop the snow |
| `winter-is-coming app` | Build a real **Winter Is Coming.app** into `~/Applications` |
| `winter-is-coming rebuild` | Force a recompile (after editing the source) |

### Option 2 — a real Mac app

Want to launch it from Spotlight, or have it start automatically at login?

```sh
winter-is-coming app
```

This installs **Winter Is Coming.app** into `~/Applications`. Open it like any app, and optionally add it to **System Settings → General → Login Items** so winter greets you at every boot. ☀️→❄︎

### Option 3 — build from source

```sh
git clone https://github.com/AnkitPorwal04/WINTER_IS_COMING.git
cd WINTER_IS_COMING
zsh build.sh        # compiles and runs
zsh make-app.sh     # or: build the .app bundle into ~/Applications
```

---

## 🕹️ Controls

Everything lives in the ❄︎ icon in your menu bar:

| Action | Result |
|---|---|
| **Left-click ❄︎** | Start / stop instantly; stopping leaves every desktop completely clean |
| **Right-click ❄︎** | Open the full menu |
| Snow Amount → Light / Medium / Heavy | 120 / 260 / 500 flakes |
| **Sweep Now 🧹** | Send the sweeper out right now |
| **Sweep Every → 1 / 3 / 5 / 10 min** | How often the sweeper comes out on his own (default: 3 min) |
| **Sweeper Auto-Clean** | Toggle the automatic sweeper (full ground / timed visits) |
| **Fly Now 🦌** | Send the reindeer across the sky right now |
| **Reindeer Every → 1 / 5 / 10 / 30 min** | How often the reindeer flies past (default: 10 min) |
| **Jingle Bells** | Toggle the short flyby jingle (off by default) |
| **Update to X…** | The app checks daily and offers fresh snow-code here; you also get a notification when a new version lands, and the ❄︎ wears a small dot until you update. The CLI prints a notice too |
| Clear Snow | Instantly remove every flake and pile everywhere |
| Quit | Goodbye, winter 👋 |

**Extra:** want snow to pile up on the Dock too? Grant Accessibility permission to Terminal (or the app) in **System Settings → Privacy & Security → Accessibility**.

---

## 🎨 Make It Yours

Every tunable lives at the top of `WinterIsComing.swift` in `enum Cfg` — how many flakes fall, how fast, how tall the piles grow, how big snowballs get, how often the sweeper comes out (`sweepInterval`, seconds), and more. Change a number, run `winter-is-coming rebuild` (or `zsh build.sh`), and enjoy your custom winter.

---

## 🧰 Troubleshooting

- **"swiftc: command not found"** → `xcode-select --install`, then try again.
- **No snow on the Dock** → grant Accessibility permission (see Controls above).
- **Snow didn't start** → it's single-instance; run `winter-is-coming stop` then `start`.
- **Performance** → use Snow Amount → Light on older Macs. The overlay is fully GPU-rendered (SpriteKit) and idles when your screen sleeps.

---

## License

[MIT](LICENSE) · Made with 💙 and a little help from Claude · Original by [yike-shi](https://github.com/yike-shi/WINTER_IS_COMING)
