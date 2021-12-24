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
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

let points = 0;

for (const line of lines) {
  // array of all the unresolved chunks
  const unresolved: bracket[] = [];
  for (const char of line) {
    if ("([{<".includes(char)) unresolved.push(char as bracket);
    if (")]}>".includes(char)) {
      const popped = unresolved.pop();
      if (!popped) throw new Error("wtf?");
      const closing = bracketMap[popped];

      if (closing != char) {
        points += pointMap[char];
        console.log(`expected ${closing}, but found ${char} instead`);
        break;
      }
    }
  }
}

console.log(points);

type bracket = "(" | "[" | "{" | "<";
