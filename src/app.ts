import { appendData, deleteLast, readData } from "./fileHandler.js";

const FILE = "data.json"; // Now just specify file name

// CLI args
const args = process.argv.slice(2);
const cmd = args[0];

if (cmd === "read") {
  console.log(readData(FILE));
} else if (cmd === "write") {
  const text = args[1];
  if (!text) {
    console.log("give some text to write");
    process.exit(1);
  }
  appendData(FILE, { text, time: new Date().toISOString() });
} else if (cmd === "delete") {
  deleteLast(FILE);
} else {
  console.log("usage:");
  console.log('  node --loader ts-node/esm src/app.ts write "hello Tanuj"');
  console.log("  node --loader ts-node/esm src/app.ts read");
  console.log("  node --loader ts-node/esm src/app.ts delete");
}
