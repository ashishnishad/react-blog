import { Link } from 'react-router-dom';

export default function UserLayout({ children }) {
    return (
      <div className="d-flex flex-column min-vh-100">
        {/* Header */}
        <nav className="navbar navbar-dark bg-primary">
          <div className="container">
            <a href="/" className="navbar-brand">My Blog</a>
          </div>
        </nav>
  
        {/* Main Content */}
        <main className="flex-grow-1 container my-4">
          {children}
        </main>
  
        {/* Footer */}
        <footer className="bg-dark text-white text-center py-3 mt-auto">
          <div className="container">
            © 2025 My Blog. All rights reserved.
          </div>
        </footer>
      </div>
    );
  }
  