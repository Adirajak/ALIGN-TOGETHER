import { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const Todos = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTodos = async (selectedFilter = filter) => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (selectedFilter && selectedFilter !== 'All') {
        params.status = selectedFilter;
      }
      const res = await api.get('/todos', { params });
      setTodos(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
      } else {
        setError('Failed to load todos');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(filter);
  }, [filter]);

  const handleAddTodo = async (data) => {
    try {
      const res = await api.post('/todos', data);
      setTodos((prev) => [res.data, ...prev]);
    } catch {
      setError('Failed to add todo');
    }
  };

  const handleToggleStatus = async (id, newStatus) => {
    try {
      const res = await api.put(`/todos/${id}`, { status: newStatus });
      setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch {
      setError('Failed to update todo');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch {
      setError('Failed to delete todo');
    }
  };

  const pendingCount = todos.filter((t) => t.status === 'Pending').length;
  const completedCount = todos.filter((t) => t.status === 'Completed').length;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <header className="bg-white shadow-sm rounded-lg p-6 mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">📋 Task Manager</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, <span className="font-medium">{user?.email}</span>
          </p>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Sign Out
        </button>
      </header>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 shadow-sm">
          <div className="text-sm font-medium text-blue-700">Total Tasks</div>
          <div className="text-3xl font-bold text-blue-900 mt-1">{todos.length}</div>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 shadow-sm">
          <div className="text-sm font-medium text-yellow-700">⏳ Pending</div>
          <div className="text-3xl font-bold text-yellow-900 mt-1">{pendingCount}</div>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 shadow-sm">
          <div className="text-sm font-medium text-green-700">✓ Completed</div>
          <div className="text-3xl font-bold text-green-900 mt-1">{completedCount}</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">➕ Create New Task</h2>
          <TodoForm onAdd={handleAddTodo} />
        </div>

        <div className="lg:col-span-3 bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Your Tasks</h2>
              <p className="text-xs text-gray-500 mt-1">
                Manage and track your daily tasks
              </p>
            </div>
            <div className="flex gap-2 text-sm">
              {['All', 'Pending', 'Completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full font-medium transition-all ${
                    filter === f
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg mb-4">
              ⚠️ {error}
            </div>
          )}

          {loading ? (
            <p className="text-sm text-slate-500 py-4 text-center">
              Loading...
            </p>
          ) : (
            <TodoList
              todos={todos}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
