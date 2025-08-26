import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, "../data.json");

// Read JSON
export function readData() {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "[]"); // Create empty file if not exists
  }
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw);
}

// Write JSON
export function writeData(text: string) {
  let data = readData();
  data.push({ text, time: new Date().toISOString() });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log("saved:", text);
}

// Delete last entry
export function deleteData() {
  let data = readData();

  if (data.length === 0) {
    console.log("Nothing to delete");
    return;
  }

  const removed = data.pop();
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  console.log("deleted:", removed);
}
