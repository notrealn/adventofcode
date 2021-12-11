import * as fs from "fs";

const file = fs.readFileSync(__dirname + "/input.txt", "utf8");
const crabs = file.split(",").map((f) => parseInt(f));

const max = Math.max(...crabs);
console.log(crabs, max);

// array where each index is the horizontal position and value is fuel usage
const fuelUsage: number[] = Array(max).fill(0);
for (let i = 0; i < max; i++) {
  for (let crab of crabs) {
    const foo = Math.abs(crab - i);
    for (let n = 1; n <= foo; n++) {
      fuelUsage[i] += n;
    }
  }
}

const min = Math.min(...fuelUsage);

console.log(fuelUsage, min, fuelUsage.indexOf(min));
// fs.writeFileSync(__dirname + "/output.txt", JSON.stringify(fuelUsage));
