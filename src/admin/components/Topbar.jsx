import { useAuth } from '../../components/common/AuthContext';

export default function Topbar() {
  const { logout } = useAuth();

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <span className="navbar-brand">Admin Panel</span>
      <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
    </nav>
  );
}
