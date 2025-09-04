import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ESM

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get absolute path for a data file

function getFilePath(filename: string) {
  return path.join(__dirname, `../${filename}`);
}

// Ensure file exists, create if missing

function ensureFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
}

// Read JSON data

export function readData(filename: string) {
  const filePath = getFilePath(filename);
  ensureFile(filePath);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

// Write JSON data

export function writeData<T>(filename: string, data: T[]) {
  const filePath = getFilePath(filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

//Append entry to JSON

export function appendData(filename: string, entry: any) {
  const data = readData(filename);
  data.push(entry);
  writeData(filename, data);
  console.log("saved:", entry);
}

// Delete last entry

export function deleteLast(filename: string) {
  const data = readData(filename);
  if (data.length === 0) {
    console.log("Nothing to delete");
    return;
  }
  const removed = data.pop();
  writeData(filename, data);
  console.log("deleted:", removed);
}
