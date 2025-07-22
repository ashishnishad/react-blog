import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../components/common/axios';
import UserLayout from '../layout/UserLayout';

export default function PublicSinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/posts/${id}`).then(res => setPost(res.data));
  }, [id]);

  if (!post) return <div className="text-center mt-5">Loading...</div>;

  return (
    <UserLayout>
      <div className="container mt-4">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    </UserLayout>
  );
}
