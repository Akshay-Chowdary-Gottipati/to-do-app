import React, { useState } from 'react';

function TodoItem({ todo, onToggleComplete, onDeleteTodo }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents clicking the row from triggering a complete toggle
    setIsDeleting(true);
  };

  const handleAnimationEnd = () => {
    if (isDeleting) {
      onDeleteTodo(todo.id);
    }
  };

  return (
    <li 
      className={`todo-item ${todo.completed ? 'completed' : ''} ${isDeleting ? 'fall' : ''}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="todo-left" onClick={() => onToggleComplete(todo.id)}>
        <i className={`todo-check ${todo.completed ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}`}></i>
        <span className="todo-text">{todo.text}</span>
      </div>
      <div className="todo-actions">
        {/* Added the direct onClick onto the button element */}
        <button type="button" className="delete-btn" onClick={handleDeleteClick} aria-label="Delete item">
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </li>
  );
}

export default TodoItem;