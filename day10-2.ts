import * as fs from "fs";

const file = fs.readFileSync(__dirname + "/input.txt", "utf8");
const lines = file.split("\n");

const bracketMap: { [key in bracket]: string } = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const pointMap: { [key: string]: number } = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

let scores: number[] = [];

for (const line of lines) {
  let points = 0;
  let corrupted = false;
  // array of all the unresolved chunks
  const unresolved: bracket[] = [];
  for (const char of line) {
    if ("([{<".includes(char)) unresolved.push(char as bracket);
    if (")]}>".includes(char)) {
      const popped = unresolved.pop();
      if (!popped) throw new Error("wtf?");
      const closing = bracketMap[popped];

      if (closing != char) {
        // points += pointMap[char];
        corrupted = true;
        console.log(`expected ${closing}, but found ${char} instead`);
        break;
      }
    }
  }
  if (corrupted) continue;
  console.log(unresolved);
  while (unresolved.length > 0) {
    const char = unresolved.pop();
    if (!char) throw new Error("huh???");
    points *= 5;
    points += pointMap[bracketMap[char]];
  }
  scores.push(points);
}

scores = scores.sort((a, b) => a - b);
console.log(scores);
console.log(scores[Math.floor(scores.length / 2)]);

type bracket = "(" | "[" | "{" | "<";
