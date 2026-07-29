import sharp from "sharp";
import { readFileSync } from "node:fs";
const svg = readFileSync("public/icon.svg");
await sharp(svg).resize(192, 192).png().toFile("public/icon-192.png");
await sharp(svg).resize(512, 512).png().toFile("public/icon-512.png");
// maskable: same art scaled down onto full-bleed background (safe zone)
const inner = await sharp(svg).resize(400, 400).png().toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: "#0B0E15" } })
  .composite([{ input: inner, top: 56, left: 56 }])
  .png().toFile("public/icon-maskable-512.png");
console.log("icons done");
