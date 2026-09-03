import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const sourceRoot = fileURLToPath(new URL("../src/", import.meta.url));
const forbidden = [
  [/\+234\s*800\s*000\s*0000/i, "fake telephone number"],
  [/images\.unsplash\.com|source\.unsplash\.com/i, "remote Unsplash image"],
  [/₦\s*5,?000.{0,100}\b(?:walk|event)\b|\b(?:walk|event)\b.{0,100}₦\s*5,?000/is, "unverified event price"],
  [/Abuja clinic/i, "unverified location caption"],
  [/Adenike Renal Centre/i, "unverified renal-centre claim"],
  [/kidney[- ]donor registration/i, "organ-donor registration copy"],
  [/href=["']\/(?:patients|donors)\//i, "dead legacy route"],
  [/account\s*(?:number|no\.?)[\s:]*0{6,}/i, "placeholder bank account"],
];

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? files(join(directory, entry.name)) : [join(directory, entry.name)]));
  return nested.flat();
}

const allFiles = (await files(sourceRoot)).filter((file) => [".ts", ".tsx", ".js", ".jsx", ".md"].includes(extname(file)));
const failures = [];

for (const file of allFiles) {
  const content = await readFile(file, "utf8");
  for (const [pattern, label] of forbidden) if (pattern.test(content)) failures.push(`${relative(sourceRoot, file).split(sep).join("/")}: ${label}`);
}

if (failures.length) {
  console.error("Content integrity check failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(`Content integrity check passed across ${allFiles.length} source files.`);
