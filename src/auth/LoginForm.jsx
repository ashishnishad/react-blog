import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/common/AuthContext';
import api from '../components/common/axios';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(localStorage.getItem('rememberEmail') || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem('rememberEmail'));

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Email and Password are required!');
      return;
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.role);
      toast.success('Login successful! Redirecting...');

      if (rememberMe) {
        localStorage.setItem('rememberEmail', email);
      } else {
        localStorage.removeItem('rememberEmail');
      }

      navigate(res.data.role === 'admin' ? '/admin' : '/user');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials!');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4">
            <h4 className="text-center mb-3">Admin Login</h4>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 mt-1 me-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
              <button className="btn btn-primary w-100" type="submit">
                Login
              </button>
            </form>

            {/* ✅ Back to Home Button */}
            <div className="text-center mt-3">
              <Link to="/" className="btn btn-link">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
