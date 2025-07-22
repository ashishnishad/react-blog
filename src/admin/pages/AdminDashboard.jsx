import { useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <AdminLayout>
      <h3 className="mb-3">Admin Dashboard</h3>
      <PostForm onPostCreated={handleNewPost} />
      <PostList posts={posts} setPosts={setPosts} />
    </AdminLayout>
  );
}