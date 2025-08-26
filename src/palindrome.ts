import chalk from "chalk";
import fs from "fs";

function isPalindrome(str: string) {
  str === str.split("").reverse().join("")
    ? console.log(chalk.green(`${str} is Palindrome`))
    : console.log(chalk.bgRed(`${str} is not a Palindrome`));
}

isPalindrome("aabaa");
isPalindrome("test");
isPalindrome("racecar");

// Line counter

const FILE_PATH = "article.txt";

function lineCounter() {
  if (!fs.existsSync(FILE_PATH)) {
    console.log("No file found");
  } else {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    const lineCount = data.split(/\r?\n/).length;
    console.log(`The file has ${lineCount} lines.`);
  }
}

lineCounter();
