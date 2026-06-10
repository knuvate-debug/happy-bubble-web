import fs from "node:fs";
import path from "node:path";

const required = [
  "public/assets/theater/HBE_BT_S01_FINAL.mp4",
  "public/assets/singing/HBE_SB_Hello.mp3",
  "public/assets/singing/HBE_SB_S01.mp3",
  "public/assets/singing/HBE_SB_Goodbye.mp3",
  "public/assets/worksheets/HBE_WS_S01.pdf",
  "public/assets/flashcards/HBE_FC_S01.pdf"
];

console.log("HBE S1 Filename Check");
console.log("=====================");
let missing = 0;

for (const file of required) {
  const full = path.join(process.cwd(), file);
  const ok = fs.existsSync(full);
  if (!ok) missing += 1;
  console.log(`${ok ? "OK" : "MISSING"} ${file}`);
}

console.log("");
console.log(`missing: ${missing}`);
if (missing > 0) {
  console.log("Exact filenames are required before real S1 class QA.");
}
