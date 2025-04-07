import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import { useTodo } from "../context/TodoContext";

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchTodos } = useTodo();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/todos/${id}`).then(res => {
      setTodo(res.data);
    });
  }, [id]);

  const handleUpdate = async updatedData => {
    await axios.put(`http://localhost:5000/api/todos/${id}`, updatedData);
    fetchTodos();
    navigate("/");
  };

  return todo ? <TodoForm initialData={todo} onSubmit={handleUpdate} isEditing /> : <p>Loading...</p>;
};

export default EditTodo;
