import TodoItem from './TodoItem';
import FilterButtons from './FilterButtons';

function TodoList({ todos, toggleTodo, deleteTodo, editTodo, filter, setFilter }) {
  return (
    <div className="todo-list">
      <FilterButtons filter={filter} setFilter={setFilter} />
      <ul>
        {todos.length === 0 ? (
          <div className="empty-state">
            {filter === 'all' 
              ? "No tasks yet! Add one above ☝️" 
              : filter === 'active' 
                ? "No active tasks! 🎉" 
                : "No completed tasks yet! Keep going 💪"}
          </div>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;