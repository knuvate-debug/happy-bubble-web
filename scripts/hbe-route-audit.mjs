import fs from "node:fs";
import path from "node:path";

const appDir = path.join(process.cwd(), "app");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    if (entry.isFile()) files.push(full);
  }
  return files;
}

const pages = walk(appDir)
  .filter((file) => file.endsWith("page.tsx") || file.endsWith("route.ts"))
  .map((file) => path.relative(process.cwd(), file).replaceAll(path.sep, "/"))
  .sort();

const checks = [
  "app/sessions/page.tsx",
  "app/sessions/s01/page.tsx",
  "app/game/s01/page.tsx",
  "app/game/s01/sound-match/page.tsx",
  "app/game/s01/bubble-pop/page.tsx",
  "app/game/s01/build-sat/page.tsx",
  "app/classroom/s01/page.tsx",
  "app/classroom/s01/presenter/page.tsx",
  "app/classroom/s01/overview/page.tsx",
  "app/teacher/s01/page.tsx",
  "app/teacher/report/s01/page.tsx",
  "app/teacher/game-report/s01/page.tsx",
  "app/parent/page.tsx",
  "app/admin/page.tsx",
  "app/admin/qa/page.tsx",
  "app/admin/classroom-report/page.tsx",
  "app/admin/game-report/page.tsx",
  "app/api/learning-events/route.ts",
  "app/api/classroom-report/route.ts",
  "app/api/game-report/route.ts",
  "app/api/classroom-summary/route.ts"
];

const missing = checks.filter((file) => !fs.existsSync(path.join(process.cwd(), file)));

console.log("HBE Route Audit");
console.log("================");
console.log(`Total app page/API files: ${pages.length}`);
console.log("");
console.log("Required route files:");
for (const file of checks) {
  console.log(`${missing.includes(file) ? "MISSING" : "OK"} ${file}`);
}

if (missing.length) {
  console.error("");
  console.error(`Route audit failed. Missing: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("");
console.log("Route audit passed.");
