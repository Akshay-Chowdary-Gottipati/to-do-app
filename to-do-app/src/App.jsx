import React, { useState, useEffect } from 'react';
import TodoForm from './Components/TodoForm.jsx';
import TodoItem from './Components/TodoItem.jsx';
import './App.css';

function App() {
  // 1. Initialize state by checking localStorage first.
  // If data exists, parse it; otherwise, default to an empty array.
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('grand_test_todos');
    return savedTodos ? JSON.parse(savedTodos) : [
      { id: 1, text: 'Create responsive web structures', completed: false },
      { id: 2, text: 'Review project UI rubric configurations', completed: true }
    ];
  });

  // 2. Automatically sync state modifications to localStorage whenever the 'todos' array changes.
  useEffect(() => {
    localStorage.setItem('grand_test_todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new task object
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // Generates a unique ID based on timestamp
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  // Toggle completion status
  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a task by filtering it out from the array
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main className="todo-card">
      <header className="todo-header">
        <h1><i className="fa-solid fa-list-check"></i> ToDo List</h1>
        <p>Stay organized and productive</p>
      </header>

      {/* Styled Form Section (Section 2) */}
      <TodoForm onAddTodo={addTodo} />

      {/* Todo List Content Section (Section 3 & 4) */}
      <section className="todo-list-container">
        <ul>
          {todos.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px' }}>
              No tasks left! Add a new one above.
            </p>
          ) : (
            todos.map(todo => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onToggleComplete={toggleComplete} 
                onDeleteTodo={deleteTodo} 
              />
            ))
          )}
        </ul>
      </section>
    </main>
  );
}

export default App;