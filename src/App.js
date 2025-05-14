import { useState, useEffect } from 'react';  // Add useEffect to the import
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load todos from localStorage when component mounts
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        const parsedTodos = JSON.parse(saved);
        // Validate the parsed todos are in correct format
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        }
      } catch (e) {
        console.error('Failed to parse saved todos', e);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, dueDate, dueTime) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      dueDate,
      dueTime,
      createdAt: new Date().toISOString()
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText, newDueDate, newDueTime) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { 
          ...todo, 
          text: newText, 
          dueDate: newDueDate, 
          dueTime: newDueTime 
        } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList 
        todos={filteredTodos} 
        toggleTodo={toggleTodo} 
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
}

export default App;