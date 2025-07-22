import { useEffect, useState } from 'react';
import api from '../../components/common/axios';
import UserLayout from '../layout/UserLayout';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PublicPostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
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
    <UserLayout>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="mb-0">Latest Blog Posts</h2>
          <div>
            <label className="me-2">Show:</label>
            <select
              className="form-select d-inline w-auto"
              value={limit}
              onChange={e => { setPage(1); setLimit(parseInt(e.target.value)); }}
            >
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="9">9</option>
            </select>
          </div>
        </div>

        <div className="row">
          {posts.length === 0 ? (
            <div>No posts available.</div>
          ) : (
            posts.map(post => (
              <div className="col-md-4 mb-3" key={post._id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content.substring(0, 100)}...</p>
                    <Link to={`/posts/${post._id}`} className="btn btn-primary btn-sm">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <nav className="mt-4">
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
    </UserLayout>
  );
}
