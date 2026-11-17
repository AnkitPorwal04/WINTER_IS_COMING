#!/usr/bin/env node
const { execFileSync, spawn } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

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
  console.log("   Snow piles up on windows, the Dock, and the ground.");
  console.log("   When the ground fills up, an avalanche sweeps it clean — forever.");
  console.log("   Stop anytime:  winter-is-coming stop");
}

function stop() {
  try {
    execFileSync("pkill", ["-x", "WinterIsComing"], { stdio: "ignore" });
    console.log("❄︎  Snow stopped. Spring has arrived.");
  } catch {
    console.log("❄︎  No snow was falling.");
  }
}

if (process.platform !== "darwin") fail("winter-is-coming only runs on macOS.");

const cmd = process.argv[2] || "start";
if (cmd === "start") start();
else if (cmd === "stop") stop();
else if (cmd === "rebuild") {
  if (fs.existsSync(binary)) fs.rmSync(binary);
  build();
  console.log("❄︎  Rebuilt. Run `winter-is-coming` to start.");
} else fail(`Unknown command: ${cmd}\nUsage: winter-is-coming [start|stop|rebuild]`);
