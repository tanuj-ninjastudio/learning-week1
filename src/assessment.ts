// TypeScript Logic

// Define an interface Book with id, title, author, and implement a function printBook(book: Book).

// Create a generic function identity<T>(arg: T): T.

// Book Interface

interface Book {
  id: number;
  title: string;
  author: string;
}

function printBook(book: Book): void {
  console.log(`ID: ${book.id}`);
  console.log(`Title: ${book.title}`);
  console.log(`Author: ${book.author}`);
}

const book1: Book = {
  id: 1,
  title: "You don't know JS",
  author: "Kyle Simpson",
};

printBook(book1);
