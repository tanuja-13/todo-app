import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:8080/todos");
    setTodos(res.data);
  };

  const addOrUpdateTodo = async () => {

    if (task.trim() === "") return;

    if (editId) {

      await axios.put(
        `http://localhost:8080/todos/${editId}`,
        { task: task }
      );

      setEditId(null);

    } else {

      await axios.post(
        "http://localhost:8080/todos",
        { task: task }
      );
    }

    setTask("");
    fetchTodos();
  };

  const editTodo = (todo) => {
    setTask(todo.task);
    setEditId(todo.id);
  };

  const deleteTodo = async (id) => {

    await axios.delete(
      `http://localhost:8080/todos/${id}`
    );

    fetchTodos();
  };

  return (

    <div style={styles.page}>

      <div style={styles.container}>

        <h1 style={styles.heading}>
          Todo App
        </h1>

        <div style={styles.inputContainer}>

          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={styles.input}
          />

          <button
            onClick={addOrUpdateTodo}
            style={styles.addButton}
          >
            {editId ? "Update" : "Add"}
          </button>

        </div>

        <div>

          {todos.map((todo) => (

            <div key={todo.id} style={styles.todoCard}>

              <span style={styles.taskText}>
                {todo.task}
              </span>

              <div>

                <button
                  onClick={() => editTodo(todo)}
                  style={styles.editButton}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial"
  },

  container: {
    width: "500px",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)"
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333"
  },

  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },

  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },

  addButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  todoCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#f8f9fa",
    borderRadius: "5px",
    marginBottom: "10px"
  },

  taskText: {
    fontSize: "18px"
  },

  editButton: {
    marginRight: "10px",
    padding: "7px 12px",
    backgroundColor: "orange",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer"
  },

  deleteButton: {
    padding: "7px 12px",
    backgroundColor: "red",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer"
  }
};

export default App;