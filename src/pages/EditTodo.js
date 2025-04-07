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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5001/api/todos/${id}`);
        setTodo(res.data);
      } catch (err) {
        setError("Failed to load todo. Please try again.");
        console.error("Error fetching todo:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleUpdate = async updatedData => {
    try {
      await axios.put(`http://localhost:5001/api/todos/${id}`, updatedData);
      fetchTodos();
      navigate("/");
    } catch (err) {
      setError("Failed to update todo. Please try again.");
      console.error("Error updating todo:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading todo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-center mb-4">Error</h2>
          <p className="text-gray-600 text-center">{error}</p>
          <button 
            onClick={() => navigate("/")}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-10 rounded-2xl shadow-xl">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 ml-3">Edit Todo</h2>
        </div>
        
        {todo && <TodoForm initialData={todo} onSubmit={handleUpdate} isEditing={true} />}
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            ← Back to Todos
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;