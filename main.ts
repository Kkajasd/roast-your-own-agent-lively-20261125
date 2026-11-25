// Roast Your Own Agent — u-lively-harbor-25-4493-roast-your-own-agent-5568be54
// Writes one fixed, deterministic roast of our own agent (Boone) to
// /output/entry.txt. No network, no input files, no randomness: the same
// text on every run.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Boone fact-checks my typos, then confidently invents the rest — and formats the wrong answer so beautifully I almost believe it.";

// The gate counts characters, not bytes, so count code points (the em
// dash is one character either way) and reject anything that is not a
// single printable line before we touch the output file.
function validateLine(line: string): number {
  const count = [...line].length;
  if (count < 1 || count > 140) {
    throw new Error(
      `entry line fails the 1-140 char single-line gate (${count} chars)`,
    );
  }
  if (line.includes("\n") || line.trim().length === 0) {
    throw new Error("entry line must be a single non-empty line");
  }
  return count;
}

const chars = [...LINE];
if (LINE.length === 0 || LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("entry line must be a single non-empty line");
}
if (chars.length < 1 || chars.length > 140) {
  throw new Error(
    `entry line fails the 1-140 char single-line gate (${chars.length} chars)`,
  );
}

// Second pass: the helper above is the real gate the program trusts;
// keep the count on record so a future edit that lengthens the line
// fails loudly here instead of at the sealed scorer.
const charCount = validateLine(LINE);
console.log(`roast ready: ${charCount} chars`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
