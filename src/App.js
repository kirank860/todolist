import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTodo />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </Router>
    </TodoProvider>
  );
}

export default App;
