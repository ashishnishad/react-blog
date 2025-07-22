import { useEffect, useState } from 'react';
import api from '../../components/common/axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';

const MySwal = withReactContent(Swal);

export default function PostList() {
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

  const deletePost = async (id) => {
    const confirm = await MySwal.fire({
      title: 'Are you sure?',
      text: 'This post will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`/posts/${id}`);
        toast.success('Post deleted successfully!');
        fetchPosts(); // Refresh list after delete
      } catch (err) {
        toast.error('Error deleting post');
      }
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Manage Posts</h5>
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

      <div className="row mt-4">
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
                    View Post
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deletePost(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            {[...Array(totalPages)].map((_, idx) => (
              <li key={idx} className={`page-item ${page === idx + 1 ? 'active' : ''}`}>
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
}
