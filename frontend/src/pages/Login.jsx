import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.token, res.data.user);
      navigate('/todos');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '16px', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)' }}>
      <div style={{ width: '100%', maxWidth: '28rem', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📋</div>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937' }}>Welcome Back</h1>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>Sign in to manage your tasks</p>
        </div>
        {error && (
          <div style={{ marginBottom: '16px', fontSize: '14px', color: '#b91c1c', backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '12px', borderRadius: '8px' }}>
            ⚠️ {error}
          </div>
        )}
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Email Address</label>
            <input
              type="email"
              name="email"
              style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '8px', padding: '12px 16px', fontSize: '14px', outline: 'none' }}
              placeholder="you@example.com"
              value={form.email}
              onChange={onChange}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Password</label>
            <input
              type="password"
              name="password"
              style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: '8px', padding: '12px 16px', fontSize: '14px', outline: 'none' }}
              placeholder="••••••••"
              value={form.password}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: loading ? '#9ca3af' : 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
          >
            {loading ? '🔄 Signing in...' : '🚀 Sign In'}
          </button>
        </form>
        <p style={{ marginTop: '24px', fontSize: '14px', textAlign: 'center', color: '#4b5563' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
