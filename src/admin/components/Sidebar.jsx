import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: '220px' }}>
      <h4>Admin Menu</h4>
      <ul className="nav flex-column">
        <li className="nav-item"><Link to="/admin" className="nav-link text-white">Dashboard</Link></li>
        <li className="nav-item"><Link to="/admin/posts" className="nav-link text-white">Manage Posts</Link></li>
        <li className="nav-item"><Link to="/posts" className="nav-link text-white">Public Posts</Link></li>
      </ul>
    </div>
  );
}
