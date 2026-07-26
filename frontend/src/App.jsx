import { useEffect, useState } from "react";

const API_URL = "http://localhost:4000/api/todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
      setError("");
    } catch (err) {
      setError("مش قادر أوصل للسيرفر. اتأكد إن الـ backend شغال على المنفذ 4000.");
    } finally {
      setLoading(false);
    }
  }

  async function addTodo(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  }

  async function toggleDone(todo) {
    const res = await fetch(`${API_URL}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done }),
    });
    const updated = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div className="page">
      <div className="card">
        <h1>قائمة المهام</h1>
        <p className="subtitle">
          {loading ? "بيتحمّل..." : `${remaining} مهمة متبقية من ${todos.length}`}
        </p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={addTodo} className="add-form">
          <input
            type="text"
            placeholder="اكتب مهمة جديدة..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">إضافة</button>
        </form>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? "done" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleDone(todo)}
                />
                <span>{todo.text}</span>
              </label>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                حذف
              </button>
            </li>
          ))}
        </ul>

        {!loading && todos.length === 0 && (
          <p className="empty">مفيش مهام دلوقتي. ضيف واحدة! ⬆️</p>
        )}
      </div>
    </div>
  );
}
