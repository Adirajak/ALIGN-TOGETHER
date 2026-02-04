import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Todos from './pages/Todos';

const App = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/todos" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/todos" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/todos" /> : <Register />}
        />
        <Route
          path="/todos"
          element={token ? <Todos /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
