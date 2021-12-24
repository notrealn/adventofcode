import * as fs from "fs";

const file = fs.readFileSync(__dirname + "/input.txt", "utf8");
// it goes like [row][col]
const map = file
  .split("\n")
  .map((line) => line.split("").map((char) => parseInt(char)));
const lowPoints: { row: number; col: number }[] = [];
console.log(map.length);
for (let row = 0; row < map.length; row++) {
  for (let col = 0; col < map[row].length; col++) {
    // i dont wanna type map[row][col] a ton of times
    const n = map[row][col];
    if (n == 9) continue;
    if (row > 0 && n > map[row - 1][col]) continue;
    if (col > 0 && n > map[row][col - 1]) continue;
    if (row < map.length - 1 && n > map[row + 1][col]) continue;
    if (col < map[row].length - 1 && n > map[row][col + 1]) continue;
    lowPoints.push({ row, col });
  }
}

const risk =
  lowPoints
    .map((point) => map[point.row][point.col])
    .reduce((acc, e) => acc + e) + lowPoints.length;
console.log(risk);
