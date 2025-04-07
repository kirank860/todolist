import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { todos, loading, error } = useTodo();
  const [filter, setFilter] = useState("");

  const filteredTodos = todos.filter(todo =>
    filter ? todo.status === filter : true
  );

  return (
    <div>
      <h1>All Todos</h1>
      <select onChange={e => setFilter(e.target.value)} value={filter}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo._id}>
            <h3>{todo.title} ({todo.status})</h3>
            <Link to={`/edit/${todo._id}`}>Edit</Link>
          </li>
        ))}
      </ul>

      <Link to="/add">Add New Todo</Link>
    </div>
  );
};

export default Home;
