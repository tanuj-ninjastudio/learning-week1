import { readData, writeData } from "./fileHandler.js";

const FILE = "todos.json";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export function loadTodos(): Todo[] {
  return readData(FILE);
}

export function saveTodos(todos: Todo[]) {
  writeData(FILE, todos);
}

export function addTodo(text: string) {
  const todos = loadTodos();
  const newTodo: Todo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    text,
    done: false,
  };
  todos.push(newTodo);
  saveTodos(todos);
  console.log(`Added: ${text}`);
}

export function listTodos() {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log("No todos found.");
    return;
  }
  todos.forEach((todo) => {
    console.log(`[${todo.done ? "✔" : " "}] ${todo.id}. ${todo.text}`);
  });
}

export function markDone(id: number) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    console.log(`Task with ID ${id} not found`);
    return;
  }

  if (todo.done) {
    console.log(`Task ${id} is already marked as done`);
    return;
  }

  todo.done = true;
  saveTodos(todos);
  console.log(`Marked task ${id} as done`);
}

export function deleteTodo(id: number) {
  let todos = loadTodos();
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    console.log(`Task with ID ${id} not found`);
    return;
  }

  const removed = todos.splice(index, 1);
  saveTodos(todos);
  console.log(`Deleted: ${removed[0].text}`);
}
