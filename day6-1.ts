import * as fs from "fs";

const file = fs.readFileSync(__dirname + "/input.txt", "utf8");
const fish = file.split(",").map((f) => parseInt(f));

const step = () => {
  for (let i = 0; i < fish.length; i++) {
    if (fish[i] == 0) {
      fish.push(9);
      fish[i] = 6;
      continue;
    }
    fish[i]--;
  }
};

for (let i = 0; i < 256; i++) {
  step();
  // console.log(i, fish);
}
console.log(fish.length);
