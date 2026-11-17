#!/usr/bin/env node
const { execFileSync, spawn } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { version: localVersion } = require("../package.json");

const pkgRoot = path.join(__dirname, "..");
const source = path.join(pkgRoot, "WinterIsComing.swift");
const cacheDir = path.join(os.homedir(), "Library", "Caches", "winter-is-coming");
const binary = path.join(cacheDir, "WinterIsComing");

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function isStale() {
  if (!fs.existsSync(binary)) return true;
  return fs.statSync(source).mtimeMs > fs.statSync(binary).mtimeMs;
}

function isNewerVersion(remote, local) {
  const next = remote.split(".").map(Number);
  const current = local.split(".").map(Number);
  if (next.some(Number.isNaN) || current.some(Number.isNaN)) return false;
  for (let i = 0; i < Math.max(next.length, current.length); i++) {
    const a = next[i] || 0;
    const b = current[i] || 0;
    if (a !== b) return a > b;
  }
  return false;
}

async function checkForUpdate() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const response = await fetch("https://registry.npmjs.org/winter-is-coming/latest", {
      signal: controller.signal,
    });
    if (!response.ok) return;
    const latest = (await response.json()).version;
    if (typeof latest === "string" && isNewerVersion(latest, localVersion)) {
      console.log(
        `Update available: ${latest} → npm update -g winter-is-coming && winter-is-coming rebuild`
      );
    }
  } catch {
    // Update checks are best-effort and stay silent offline.
  } finally {
    clearTimeout(timer);
  }
}

function build() {
  try {
    execFileSync("xcode-select", ["-p"], { stdio: "ignore" });
  } catch {
    fail(
      "Swift compiler not found. Install the Xcode Command Line Tools first:\n\n  xcode-select --install\n"
    );
  }
  fs.mkdirSync(cacheDir, { recursive: true });
  console.log("❄︎  Building WinterIsComing (first run only)...");
  execFileSync("swiftc", ["-O", source, "-o", binary], { stdio: "inherit" });
}

function start() {
  if (isStale()) build();
  const child = spawn(binary, [], { detached: true, stdio: "ignore" });
  child.unref();
  console.log("❄︎  Let it snow. Look for the ❄︎ icon in your menu bar.");
  console.log("   Click the ❄︎ to stop/start snowing; right-click it for options.");
  console.log("   Snow piles up on windows, the Dock, and the ground.");
  console.log("   When the ground fills up, a little sweeper walks out and cleans it — forever.");
  console.log("   Stop anytime:  winter-is-coming stop");
  void checkForUpdate();
}

function makeApp() {
  try {
    execFileSync("xcode-select", ["-p"], { stdio: "ignore" });
  } catch {
    fail(
      "Swift compiler not found. Install the Xcode Command Line Tools first:\n\n  xcode-select --install\n"
    );
  }
  execFileSync("zsh", [path.join(pkgRoot, "make-app.sh")], { stdio: "inherit" });
  void checkForUpdate();
}

function stop() {
  try {
    execFileSync("pkill", ["-x", "WinterIsComing"], { stdio: "ignore" });
    console.log("❄︎  Snow stopped. Spring has arrived.");
  } catch {
    console.log("❄︎  No snow was falling.");
  }
}

if (require.main === module) {
  if (process.platform !== "darwin") fail("winter-is-coming only runs on macOS.");

  const cmd = process.argv[2] || "start";
  if (cmd === "start") start();
  else if (cmd === "stop") stop();
  else if (cmd === "app") makeApp();
  else if (cmd === "rebuild") {
    if (fs.existsSync(binary)) fs.rmSync(binary);
    build();
    console.log("❄︎  Rebuilt. Run `winter-is-coming` to start.");
  } else fail(`Unknown command: ${cmd}\nUsage: winter-is-coming [start|stop|app|rebuild]`);
}

module.exports = { isNewerVersion };
