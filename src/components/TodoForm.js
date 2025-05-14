import { useState } from 'react';

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    
    // Convert empty strings to null for consistency
    const dateToSave = dueDate || null;
    const timeToSave = dueTime || null;
    
    addTodo(value, dateToSave, timeToSave);
    setValue('');
    setDueDate('');
    setDueTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="✏️ Add a new task..."
        required
      />
      <div className="datetime-inputs">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-input"
        />
        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          className="time-input"
        />
      </div>
      <button type="submit">Add ➕</button>
    </form>
  );
}

export default TodoForm;