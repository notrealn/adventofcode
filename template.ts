import * as fs from "fs";

const file = fs.readFileSync(__dirname + "/input.txt", "utf8");
console.log(file);
