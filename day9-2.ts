import * as fs from "fs";

const file = fs.readFileSync(__dirname + "/input.txt", "utf8");
// it goes like [row][col]
const map = file
  .split("\n")
  .map((line) => line.split("").map((char) => parseInt(char)));
const lowPoints: vec[] = [];

for (let row = 0; row < map.length; row++) {
  for (let col = 0; col < map[row].length; col++) {
    // i dont wanna type map[row][col] a ton of times
    const height = map[row][col];
    if (height == 9) continue;

    let isLowPoint = true;
    for (const point of getAdjacentPoints({ row, col }))
      if (height > map[point.row][point.col]) isLowPoint = false;

    if (isLowPoint) lowPoints.push({ row, col });
  }
}
// console.log(lowPoints);

// array where each element is an array of points represeting basins
const basins: vec[][] = lowPoints.map((point) => [point]);
// [[lowPoints[0]]];

for (const basin of basins) {
  const fronteir = getAdjacentPoints(basin[0]).filter(
    (e) => map[e.row][e.col] != 9
  );
  // while fronteir isnt empty, go through and add all non-9 adjacent points, and if the point is already in the fronteir skip
  while (fronteir.length > 0) {
    // console.log(fronteir);
    const point = fronteir.pop();
    // console.log(point);
    if (!point) break;

    const adjacent = getAdjacentPoints(point);
    // add every non-9 thing to the fronteir that isnt already in basin/fronteir
    for (const { row, col } of adjacent) {
      if (map[row][col] == 9) continue;
      // i dont think array.includes works here
      if (![...basin, ...fronteir].some((e) => e.row == row && e.col == col))
        fronteir.push({ row, col });
    }
    basin.push(point);
  }
}
// console.log("basins:", basins);
const lengths = basins.map((basin) => basin.length).sort((a, b) => b - a);
console.log("lengths:", lengths);
console.log("final:", lengths[0] * lengths[1] * lengths[2]);

// name seems self-explanatory to me
function getAdjacentPoints(point: vec) {
  const points: vec[] = [];
  const { row, col } = point;

  if (row > 0) points.push({ row: row - 1, col });
  if (col > 0) points.push({ row, col: col - 1 });
  if (row < map.length - 1) points.push({ row: row + 1, col });
  if (col < map[row].length - 1) points.push({ row, col: col + 1 });
  return points;
}

// im calling it a vec cause i use the name point elsewhere
type vec = { row: number; col: number };
