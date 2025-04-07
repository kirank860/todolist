import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { todos, loading, error, fetchTodos } = useTodo();
  const [filter, setFilter] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  const filteredTodos = todos.filter(todo =>
    filter ? todo.status === filter : true
  );

  // Function to truncate text with ellipsis if it's too long
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  // Status badge styling
  const getStatusStyles = (status) => {
    switch(status) {
      case "completed":
        return "bg-green-100 text-green-700 border border-green-300";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      default:
        return "bg-red-100 text-red-700 border border-red-300";
    }
  };

  // Handle delete todo
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        setDeleteLoading(id);
        await axios.delete(`http://localhost:5001/api/todos/${id}`);
        fetchTodos(); // Refresh todos after deletion
      } catch (err) {
        console.error("Error deleting todo:", err);
        alert("Failed to delete todo. Please try again.");
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-5 sm:p-8">
        {/* Header with animated gradient border */}
        <div className="relative mb-10 pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-blue-500 after:via-indigo-500 after:to-purple-500">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-3 rounded-lg shadow-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                Todo Dashboard
              </h1>
            </div>
            <Link
              to="/add"
              className="group flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-center px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <span className="mr-2 group-hover:scale-110 transition-transform duration-300">+</span>
              Add Todo
            </Link>
          </div>
        </div>

        {/* Filter with improved styling */}
        <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label
              htmlFor="statusFilter"
              className="text-gray-700 font-medium flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter by status:
            </label>
            <select
              id="statusFilter"
              onChange={e => setFilter(e.target.value)}
              value={filter}
              className="w-full sm:w-64 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm appearance-none bg-white"
            >
              <option value="">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Loading/Error States with Improved UI */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTodos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-600 text-lg font-medium mb-2">No todos found</p>
            <p className="text-gray-500 mb-6">Create a new todo to get started</p>
            <Link
              to="/add"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:shadow-md transition"
            >
              Add Your First Todo
            </Link>
          </div>
        )}

        {/* Todos Grid with Enhanced Cards */}
        {!loading && filteredTodos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTodos.map(todo => (
              <div
                key={todo._id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Card Header with Status */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-800 truncate">
                    {todo.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(todo.status)}`}
                  >
                    {todo.status.replace('-', ' ')}
                  </span>
                </div>
                
                {/* Card Body with Description */}
                <div className="p-4 flex-grow">
                  {todo.description ? (
                    <p className="text-gray-600 whitespace-pre-line">
                      {truncateText(todo.description, 150)}
                    </p>
                  ) : (
                    <p className="text-gray-400 italic">No description provided</p>
                  )}
                </div>
                
                {/* Card Footer with Actions */}
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t border-gray-100">
                  <div className="flex space-x-4">
                    <Link
                      to={`/edit/${todo._id}`}
                      className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      disabled={deleteLoading === todo._id}
                      className="flex items-center text-red-600 hover:text-red-800 font-medium transition-colors"
                    >
                      {deleteLoading === todo._id ? (
                        <span className="flex items-center">
                          <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </span>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                  <span className="text-xs text-gray-500">
                    {/* You could add date/time info here if you have it */}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;