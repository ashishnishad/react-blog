import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './components/common/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

import LoginForm from './auth/LoginForm';
import AdminDashboard from './admin/pages/AdminDashboard';
import PublicPostList from './user/pages/PublicPostList';
import PublicSinglePost from './user/pages/PublicSinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicPostList />} />
          <Route path="/posts/:id" element={<PublicSinglePost />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roleCheck="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch All Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;
