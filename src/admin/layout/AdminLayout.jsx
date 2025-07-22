import { useAuth } from '../../components/common/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('Admin');

  useEffect(() => {
    // Assuming you store user info in localStorage as 'userName'
    const storedName = localStorage.getItem('userName') || 'Admin';
    setUsername(storedName);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navbar */}
      <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between">
        <div>
          <span className="navbar-brand">Admin Panel</span>
        </div>
        <div className="position-relative">
          <button
            className="btn btn-secondary"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {username} <i className="bi bi-caret-down-fill"></i>
          </button>
          {showDropdown && (
            <div
              className="dropdown-menu show position-absolute end-0 mt-2"
              style={{ right: 0 }}
            >
              <button className="dropdown-item" onClick={() => alert('Profile Clicked')}>
                Profile
              </button>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="d-flex flex-grow-1">
        <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link to="/admin" className="nav-link text-white">Dashboard</Link>
            </li>
          </ul>
        </div>

        <div className="flex-grow-1 p-4 bg-light">
          {children}
        </div>
      </div>
    </div>
  );
}
