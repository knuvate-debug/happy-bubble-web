import fs from "node:fs";
import path from "node:path";

const requiredAssets = [
  "public/assets/theater/HBE_BT_S01_FINAL.mp4",
  "public/assets/singing/HBE_SB_S01.mp3",
  "public/assets/singing/HBE_SB_Hello.mp3",
  "public/assets/singing/HBE_SB_Goodbye.mp3",
  "public/assets/worksheets/HBE_WS_S01.pdf",
  "public/assets/flashcards/HBE_FC_S01.pdf"
];

const optionalGameAssets = [
  "public/assets/game/common/bubble_blue.png",
  "public/assets/game/common/bubble_gold.png",
  "public/assets/game/common/star_complete.png",
  "public/assets/game/sfx/pop_correct.mp3",
  "public/assets/game/sfx/try_again.mp3",
  "public/assets/game/sfx/complete.mp3"
];

function check(list) {
  return list.map((file) => ({
    file,
    exists: fs.existsSync(path.join(process.cwd(), file))
  }));
}

const required = check(requiredAssets);
const optional = check(optionalGameAssets);

console.log("HBE Asset Audit");
console.log("===============");
console.log("");
console.log("Required before real S1 deployment QA:");
for (const item of required) {
  console.log(`${item.exists ? "OK" : "MISSING"} ${item.file}`);
}

console.log("");
console.log("Optional game polish assets:");
for (const item of optional) {
  console.log(`${item.exists ? "OK" : "OPTIONAL"} ${item.file}`);
}

const missingRequired = required.filter((item) => !item.exists);
console.log("");
console.log(`Required missing count: ${missingRequired.length}`);

if (missingRequired.length) {
  console.log("Asset audit completed with missing required assets. This is OK for layout/code development, but not for final S1 deployment QA.");
}
