import * as fs from "fs";

const file = fs.readFileSync(__dirname + "/input.txt", "utf8");
const foo = file.split(",").map((f) => parseInt(f));

// array where index number is the internal timer and value is the quantity of fish with that timer
// totally best practices
let fish: number[] = Array(9).fill(0, 0, 10);

// convert the old fish array
for (let i = 0; i < foo.length; i++) {
  fish[foo[i]] += 1;
}
console.log(fish);

const step = () => {
  const born = fish.shift();
  if (born) {
    fish[6] += born;
    fish[8] = born;
  } else fish[8] = 0;
};

// returns total fishes
const sum = () => {
  let h = 0;
  for (let addend of fish) {
    h += addend;
  }
  return h;
};

for (let i = 0; i < 256; i++) {
  step();
  // console.log(i + 1, fish, sum());
}
// console.log(fish);
console.log(sum());
