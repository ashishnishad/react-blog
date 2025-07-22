import { useState } from 'react';
import api from '../../components/common/axios';
import { toast } from 'react-toastify';

export default function PostForm({ setPosts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Title and Content are required!');
      return;
    }
    try {
      const res = await api.post('/posts', { title, content });
      setPosts(prev => [res.data, ...prev]);
      setTitle('');
      setContent('');
      toast.success('Post created successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Post Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Post Content"
          rows="3"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Create Post</button>
    </form>
  );
}
