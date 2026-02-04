import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Todos from './pages/Todos';

const App = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#4b5563' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
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
