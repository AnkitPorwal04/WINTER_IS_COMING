#           ❄︎ WinterIsComing ❄︎

Let it snow on your Mac! ☃️

Snow falls on your desktop and piles up on your windows and Dock. Roll it into snowballs and build a little snowman. It's all one Swift file, and every flake is drawn in code.

<!-- ![demo](docs/demo.gif) -->

## What it can do ✨

- 🌨️ **Cozy snowfall**: three layers of flakes (near, middle and far) drifting in a gentle wind
- 🏔️ **Snow piles up** on top of your windows, along the Dock and at the bottom of the screen
- 🪟 **Drag a window and *whoosh*!** The snow flies off. The faster you drag, the farther it goes
- ⚪ **Roll snowballs** just by moving your mouse sideways over the snow (no clicking!). They grow as they roll
- 🎳 **Snowballs push each other** along, and one that's pushed off the edge falls down
- 🖐️ **Hold a snowball** with the left mouse button and carry it anywhere
- ⛄ **Stack three snowballs** and they turn into a snowman with a carrot nose and a red scarf
- 💥 **A falling snowball goes *poof*** into a soft heap of snow, ready to be rolled again
- 🌬️ **It never stops snowing** — and when the ground fills up, an avalanche gust sweeps across the screen, blasting every pile and snowball away in a wave, then the snow starts over. Toggle it with **Auto-Clear When Full** in the menu

## Install with npm 📦

```sh
npm install -g @ankitporwal04/winter-is-coming
winter-is-coming        # let it snow
winter-is-coming stop   # spring has arrived
```

> Published on GitHub Packages, so point npm at it once:
> `echo "@ankitporwal04:registry=https://npm.pkg.github.com" >> ~/.npmrc`
> (GitHub Packages also needs a GitHub token with `read:packages` in your npm auth.)

The first run compiles the Swift file (needs Xcode Command Line Tools: `xcode-select --install`) and caches the binary. After that it starts instantly.

## Or build from source 🚀

```sh
git clone https://github.com/AnkitPorwal04/WINTER_IS_COMING.git
cd WINTER_IS_COMING
zsh build.sh
```

Use the ❄︎ in the menu bar to pause, pick light, medium or heavy snow, clear the snow, or quit.

- No `swiftc`? Run `xcode-select --install` first.
- Want snow on the Dock too? Turn on **Terminal** in System Settings → Privacy & Security → Accessibility.

## Make it yours 🎨

Every setting lives at the top of `WinterIsComing.swift` (`enum Cfg`): how many flakes fall, how fast they fall, how tall the piles get, how big a snowball can grow… Change a number and run `zsh build.sh` again.

## License

[MIT](LICENSE) · Made with 💙 and a little help from Claude
