import React, { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    onAddTodo(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="input-group">
        <i className="fa-solid fa-pen input-icon"></i>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..." 
          required 
          autoComplete="off"
        />
      </div>
      <button type="submit" aria-label="Add task">
        <i className="fa-solid fa-plus"></i> Add
      </button>
    </form>
  );
}

export default TodoForm;