import UserLayout from '../layout/UserLayout';
import PostList from '../components/PostList';

export default function UserDashboard() {
  return (
    <UserLayout>
      <h2>User Dashboard</h2>
      <PostList />
    </UserLayout>
  );
}
