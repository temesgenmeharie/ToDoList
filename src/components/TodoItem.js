import { useState } from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDate, setEditDate] = useState(todo.dueDate || '');
  const [editTime, setEditTime] = useState(todo.dueTime || '');

  const handleEdit = () => {
    if (editText.trim()) {
      // Convert empty strings to null when saving
      const dateToSave = editDate || null;
      const timeToSave = editTime || null;
      
      editTodo(todo.id, editText, dateToSave, timeToSave);
      setIsEditing(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    try {
      const date = new Date(dateString);
      // Handle invalid dates
      if (isNaN(date.getTime())) return 'Invalid date';
      
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      
      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <div className="edit-datetime">
            <input
              type="date"
              value={editDate || ''}
              onChange={(e) => setEditDate(e.target.value)}
              className="date-input"
            />
            <input
              type="time"
              value={editTime || ''}
              onChange={(e) => setEditTime(e.target.value)}
              className="time-input"
            />
          </div>
          <button onClick={handleEdit} className="save-button">
            Save 💾
          </button>
        </div>
      ) : (
        <div className="todo-content">
          <span className="todo-text">{todo.text} {todo.completed && ' ✅'}</span>
          <div className="todo-meta">
            <span className="todo-date">📅 {formatDate(todo.dueDate)}</span>
            {todo.dueTime && <span className="todo-time">⏰ {todo.dueTime}</span>}
          </div>
        </div>
      )}
      
      <div className="todo-actions">
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="edit-button"
          >
            Edit ✏️
          </button>
        )}
        <button 
          onClick={() => deleteTodo(todo.id)}
          className="delete-button"
        >
          Delete 🗑️
        </button>
      </div>
    </li>
  );
}

export default TodoItem;