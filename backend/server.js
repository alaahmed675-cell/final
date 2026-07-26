import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory "database" — resets when the server restarts.
let todos = [
  { id: 1, text: "تعلم React", done: false },
  { id: 2, text: "بناء Backend بـ Node.js", done: false },
];
let nextId = 3;

// GET /api/todos -> list all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// POST /api/todos -> create a new todo { text }
app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "النص مطلوب" });
  }
  const todo = { id: nextId++, text: text.trim(), done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT /api/todos/:id -> update a todo { text?, done? }
app.put("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ error: "المهمة غير موجودة" });

  if (typeof req.body.text === "string") todo.text = req.body.text.trim();
  if (typeof req.body.done === "boolean") todo.done = req.body.done;

  res.json(todo);
});

// DELETE /api/todos/:id -> remove a todo
app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = todos.length;
  todos = todos.filter((t) => t.id !== id);
  if (todos.length === before) {
    return res.status(404).json({ error: "المهمة غير موجودة" });
  }
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Todo API running on http://localhost:${PORT}`);
});
