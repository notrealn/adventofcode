import * as fs from "fs";

const file = fs.readFileSync(__dirname + "/input.txt", "utf8");
const outputs = file.split("\n").map((line) => line.split("|")[1]);
// console.log(outputs);

let answer = 0;
for (const output of outputs) {
  const digits = output.split(" ");
  answer += digits.filter((digit) =>
    [2, 4, 3, 7].includes(digit.length)
  ).length;
  // console.log(digits.filter((digit) => [2, 5, 3, 7].includes(digit.length)));
}
console.log(answer);
