import { deleteData, readData, writeData } from "./fileHandler.js";

// cli args
const args = process.argv.slice(2);
const cmd = args[0];

if (cmd === "read") {
  console.log(readData());
} else if (cmd === "write") {
  const text = args[1];
  if (!text) {
    console.log("give some text to write");
    process.exit(1);
  }
  writeData(text);
} else if (cmd === "delete") {
  deleteData();
} else {
  console.log("usage:");
  console.log("  ts-node src/app.ts read");
  console.log('  ts-node src/app.ts write "something"');
}
