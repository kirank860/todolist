import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import { useTodo } from "../context/TodoContext";

const AddTodo = () => {
  const navigate = useNavigate();
  const { fetchTodos } = useTodo();

  const handleAdd = async data => {
    await axios.post("http://localhost:5001/api/todos", data);
    fetchTodos();
    navigate("/");
  };

  return <TodoForm onSubmit={handleAdd} />;
};

export default AddTodo;
