/*
  warning: this is probably my worst one yet.
*/

import * as fs from "fs";

const file = fs.readFileSync(__dirname + "/input.txt", "utf8");

// convert all the lines into an array of arrays of arrays, where first element is signals and second is outputs
const signals = file
  .split("\n")
  .map((line) => line.split("|").map((e) => e.trim().split(" ")));

// an array of objects that map a signal to the correct segment display thing
const maps = signals.map((line) => {
  // const line = [...chunk[0], ...chunk[1]];
  const map: { [key: string]: string } = {};

  // find 1 and 7, and the one they dont share is a
  map[
    difference(getNumFromLength(line[0], 2), getNumFromLength(line[0], 3))[0]
  ] = "a";

  // sums of each segment type
  const sums: { [key: string]: number } = {};
  for (const signal of line[0]) {
    for (const char of signal) {
      sums[char] = sums[char] ? sums[char] + 1 : 1;
    }
  }
  // a: 8, b: 6, c: 8, d: 7, e: 4, f: 9, g: 7
  for (const [key, sum] of Object.entries(sums)) {
    if (key == Object.keys(map)[0]) continue;
    switch (sum) {
      case 6:
        map[key] = "b";
        break;
      case 8:
        map[key] = "c";
        break;
      case 4:
        map[key] = "e";
        break;
      case 9:
        map[key] = "f";
        break;
    }
  }

  // 4 has the segment d
  map[
    [...getNumFromLength(line[0], 4)].filter(
      (e) => !Object.keys(map).includes(e)
    )[0]
  ] = "d";
  // only missing segment is g
  map[[..."abcdefg"].filter((e) => !Object.keys(map).includes(e))[0]] = "g";

  return map;
});

const outputs = signals.map((line, i) =>
  line[1].map((signal) =>
    [...signal]
      .map((char) => maps[i][char])
      .sort()
      .join("")
  )
);

const foo: { [key: string]: number } = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
};

console.log(
  outputs
    .map((digits) => parseInt(digits.map((digit) => foo[digit]).join("")))
    .reduce((acc, e) => acc + e)
);

// get a number from the length
function getNumFromLength(signals: string[], len: number) {
  return signals.filter((e) => e.length == len)[0];
}

// returns the characters that the 2 strings dont share
function difference(a: string, b: string): string[] {
  if (!a || !b) return [];
  const diff: string[] = [];
  for (const char of a)
    if (!b.includes(char) && !diff.includes(char)) diff.push(char);
  for (const char of b)
    if (!a.includes(char) && !diff.includes(char)) diff.push(char);
  return diff;
}
