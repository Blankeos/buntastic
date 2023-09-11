import { Database } from "bun:sqlite";
import { write } from "node:console";

async function readInput() {
  const prompt = "Type something: ";
  process.stdout.write(prompt);
  for await (const line of console) {
    return line;
    break;
  }
}
const db = new Database("sqlite3.db");

console.log("Hi there! Welcome to Carlo's CLI Todo App");

console.write("Do you have an account? [Y/n]");

const a = readInput();
