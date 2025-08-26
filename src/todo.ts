// To-do List----------------

import fs from "fs";
import chalk from "chalk";

// To-do interface
type Todo = {
  id: number;
  task: string;
  done: boolean;
};

const FILE_PATH = "todos.json";

// Load tasks from the json file

function loadTodos(): Todo[] {
  try {
    if (!fs.existsSync("todos.json")) {
      return []; // If file doesn't exist, return empty array
    }
    const data = fs.readFileSync("todos.json", "utf-8");
    return data.trim() ? JSON.parse(data) : []; // If file is empty, return empty array
  } catch (err) {
    console.error("Error reading todos.json:", err);
    return [];
  }
}

// Save tasks to file
function saveTodos(todos: Todo[]) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
}

// Add a new task
function addTask(task: string) {
  const todos = loadTodos();
  const newTodo: Todo = {
    id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
    task,
    done: false,
  };
  todos.push(newTodo);
  saveTodos(todos);
  console.log(chalk.green(`Added: "${task}"`));
}

// List all tasks
function listTasks() {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log(chalk.yellow("No tasks found"));
    return;
  }
  console.log(chalk.blue("Your Tasks:"));
  todos.forEach((todo) => {
    const status = todo.done ? chalk.green("[Done]") : chalk.red("[Pending]");
    console.log(`${chalk.cyan(todo.id)}. ${todo.task} ${status}`);
  });
}

// Mark a task as done
function markDone(id: number) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    console.log(chalk.red(`Task with ID ${id} not found`));
    return;
  }
  todo.done = true;
  saveTodos(todos);
  console.log(chalk.green(`Marked task ${id} as done`));
}

// Delete a task
function deleteTask(id: number) {
  let todos = loadTodos();
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id);
  if (todos.length === initialLength) {
    console.log(chalk.red(`Task with ID ${id} not found`));
    return;
  }
  saveTodos(todos);
  console.log(chalk.green(`Deleted task ${id}`));
}

// CLI commands
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "add":
    const task = args.slice(1).join(" ");
    if (!task) {
      console.log(chalk.red("Please provide a task to add"));
    } else {
      addTask(task);
    }
    break;

  case "list":
    listTasks();
    break;

  case "done":
    const doneId = parseInt(args[1]);
    if (isNaN(doneId)) {
      console.log(chalk.red("Please provide a valid task ID"));
    } else {
      markDone(doneId);
    }
    break;

  case "delete":
    const deleteId = parseInt(args[1]);
    if (isNaN(deleteId)) {
      console.log(chalk.red("Please provide a valid task ID"));
    } else {
      deleteTask(deleteId);
    }
    break;

  default:
    console.log(chalk.yellow("Usage:"));
    console.log("  add <task>    - Add a new task");
    console.log("  list          - List all tasks");
    console.log("  done <id>     - Mark a task as done");
    console.log("  delete <id>   - Delete a task");
}
