const TodoList = ({ todos, onToggleStatus, onDelete }) => {
  if (!todos.length) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-gray-500 text-sm">No tasks yet. Create your first task above!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3 mt-4 max-h-[500px] overflow-y-auto pr-2">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className={`flex items-start justify-between p-4 rounded-lg border-l-4 transition-all shadow-sm ${
            todo.status === 'Completed'
              ? 'bg-green-50 border-green-500'
              : 'bg-white border-blue-500 hover:shadow-md'
          }`}
        >
          <div className="flex-1 mr-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {todo.status === 'Completed' ? '✅' : '⏳'}
              </span>
              <p
                className={`text-sm font-medium ${
                  todo.status === 'Completed'
                    ? 'line-through text-gray-500'
                    : 'text-gray-800'
                }`}
              >
                {todo.title}
              </p>
            </div>
            {todo.description && (
              <p className="text-xs text-gray-600 mt-2 ml-7">
                {todo.description}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2 ml-7">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  todo.status === 'Completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {todo.status}
              </span>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() =>
                onToggleStatus(
                  todo._id,
                  todo.status === 'Pending' ? 'Completed' : 'Pending'
                )
              }
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                todo.status === 'Pending'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
              }`}
            >
              {todo.status === 'Pending' ? '✓ Done' : '↺ Undo'}
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              className="text-xs px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
