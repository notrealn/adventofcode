import * as fs from "fs";

const file = fs.readFileSync(__dirname + "/input.txt", "utf8");
// it goes like [row][col]
const map = file
  .split("\n")
  .map((line) => line.split("").map((e) => parseInt(e)));

const step = () => {
  all((row, col) => {
    map[row][col]++;
  });
  while (map.some((line) => line.some((e) => e > 9))) {
    all((row, col) => {
      if (map[row][col] < 10) return;
      // printMap(map);
      map[row][col] = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          // if it doesnt exist or is 0 (which means it flashed), continue
          if (!map[row + i] || !map[row + i][col + j]) continue;
          // console.log(row, col, i, j, map[row + i][col + j]);
          // otherwise incremement energy level
          map[row + i][col + j]++;
        }
      }
    });
  }
};

let i = 0;
for (; !map.every((line) => line.every((e) => e == 0)); i++) {
  printMap(map);
  step();
}
printMap(map);
console.log(i);

// runs a function on all the octopi
function all(fun: (row: number, col: number) => void) {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      fun(row, col);
    }
  }
}

function printMap(grid: number[][]) {
  console.log("");
  console.log(grid.map((line) => line.join("")).join("\n"));
}

// returns array of all adjacent octopi
// function getAdjacentPoints(point: vec) {
//   const points: vec[] = [];
//   const [row, col] = point;

//   if (row > 0) points.push([row - 1, col]);
//   if (col > 0) points.push([row, col - 1]);
//   if (row < map.length - 1) points.push([row + 1, col]);
//   if (col < map[row].length - 1) points.push([row, col + 1]);
//   return points;
// }

type vec = [number, number];
