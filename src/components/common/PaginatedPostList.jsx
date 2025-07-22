import { useEffect, useState } from 'react';
import api from './axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function PaginatedPostList({ isAdmin = false }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [page, limit]);

  const fetchPosts = async () => {
    try {
      const res = await api.get(`/posts?page=${page}&limit=${limit}`);
      setPosts(res.data.posts);
      setTotal(res.data.total);
    } catch (err) {
      toast.error('Failed to fetch posts');
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      {/* Limit Selector */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>{isAdmin ? 'Manage Posts' : 'Latest Posts'}</h5>
        <div>
          <label className="me-2">Posts per page:</label>
          <select
            className="form-select d-inline w-auto"
            value={limit}
            onChange={e => { setPage(1); setLimit(parseInt(e.target.value)); }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </div>
      </div>

      {/* Post Cards */}
      <div className="row">
        {posts.length === 0 ? (
          <div>No posts available.</div>
        ) : (
          posts.map(post => (
            <div className="col-md-6 mb-3" key={post._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5>{post.title}</h5>
                  <p>{post.content.substring(0, 100)}...</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <Link to={`/posts/${post._id}`} className="btn btn-outline-primary btn-sm">
                    Read More
                  </Link>
                  {isAdmin && (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {[...Array(totalPages)].map((_, idx) => (
              <li
                key={idx}
                className={`page-item ${page === idx + 1 ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => setPage(idx + 1)}>
                  {idx + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );

  async function handleDelete(id) {
    if (window.confirm('Are you sure to delete this post?')) {
      try {
        await api.delete(`/posts/${id}`);
        toast.success('Post deleted successfully!');
        fetchPosts();
      } catch (err) {
        toast.error('Error deleting post');
      }
    }
  }
}
