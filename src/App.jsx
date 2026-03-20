import './App.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

  // Load from local storage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) setTodos(savedTodos);
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => setTodo(e.target.value);

  const handleAddOrUpdate = () => {
    if (todo.trim() === "") return;

    if (editId) {
      setTodos(todos.map(item =>
        item.id === editId ? { ...item, todo } : item
      ));
      setEditId(null);
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo("");
  };

  const handleEdit = (id, text) => {
    setTodo(text);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    setTodos(todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(item => !item.isCompleted));
  };

  // Filter logic
  const filteredTodos = todos.filter(item => {
    if (filter === "active") return !item.isCompleted;
    if (filter === "completed") return item.isCompleted;
    return true;
  });

  const pendingCount = todos.filter(item => !item.isCompleted).length;

  return (
    <div className="app">
      <div className="todo-card">
        <h1>✨ iTask</h1>
        <p className="subtitle">Stay organized, get things done.</p>

        <div className="input-group">
          <input
            type="text"
            className="todo-input"
            value={todo}
            onChange={handleChange}
            placeholder="What needs to be done?"
            onKeyPress={(e) => e.key === 'Enter' && handleAddOrUpdate()}
          />
          <button onClick={handleAddOrUpdate} className="add-btn">
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* Stats & Filters */}
        <div className="stats-filters">
          <div className="task-count">
            {pendingCount} task{pendingCount !== 1 ? 's' : ''} left
          </div>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          {todos.some(item => item.isCompleted) && (
            <button onClick={clearCompleted} className="clear-btn">
              Clear Completed
            </button>
          )}
        </div>

        <div className="todos-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              {filter === 'all' && "🎉 No tasks yet. Add one above!"}
              {filter === 'active' && "✨ All done! Add new tasks or switch to All."}
              {filter === 'completed' && "📭 No completed tasks yet."}
            </div>
          ) : (
            filteredTodos.map(item => (
              <div className="todo-item" key={item.id}>
                <div className="todo-left">
                  <input
                    type="checkbox"
                    name={item.id}
                    checked={item.isCompleted}
                    onChange={handleCheckbox}
                    className="todo-checkbox"
                  />
                  <span className={`todo-text ${item.isCompleted ? "completed" : ""}`}>
                    {item.todo}
                  </span>
                </div>
                <div className="todo-actions">
                  <button
                    onClick={() => handleEdit(item.id, item.todo)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;