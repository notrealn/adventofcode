import * as fs from "fs";

const file = fs.readFileSync(__dirname + "/exampleInput.txt", "utf8");
console.log(file);
