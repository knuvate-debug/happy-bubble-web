import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git" || entry.name === "scripts") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    if (entry.isFile() && extensions.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

const files = walk(root);
const issues = [];

for (const file of files) {
  const rel = path.relative(root, file).replaceAll(path.sep, "/");
  const text = fs.readFileSync(file, "utf8");

  if (text.includes("Jimin")) {
    issues.push(`${rel}: contains forbidden full character name string`);
  }

  if (text.includes("\\n    <PageShell")) {
    issues.push(`${rel}: contains literal newline PageShell issue`);
  }

  if (text.includes("bg-hb-") || text.includes("text-hb-")) {
    issues.push(`${rel}: contains old hb-* color token`);
  }

  if (text.includes("href=\"/game/s01\"") && rel.includes("classroomSlides")) {
    // This is allowed because classroom should open Game Pack.
  }
}

console.log("HBE Source Audit");
console.log("================");
console.log(`Checked files: ${files.length}`);

if (issues.length) {
  console.error("");
  for (const issue of issues) console.error(`ISSUE ${issue}`);
  process.exit(1);
}

console.log("");
console.log("Source audit passed.");
