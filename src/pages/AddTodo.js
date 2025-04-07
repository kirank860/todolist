import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import { useTodo } from "../context/TodoContext";

const AddTodo = () => {
  const navigate = useNavigate();
  const { fetchTodos } = useTodo();

  const handleAdd = async data => {
    try {
      await axios.post("http://localhost:5001/api/todos", data);
      fetchTodos();
      navigate("/");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-10 rounded-2xl shadow-xl">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 ml-3">Add New Todo</h2>
        </div>
        <TodoForm onSubmit={handleAdd} />
      </div>
    </div>
  );
};

export default AddTodo;