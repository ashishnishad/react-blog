import { useAuth } from "../components/common/AuthContext";
import PostList from "../admin/components/PostList";

export default function UserDashboard(){
    const {logout} = useAuth();

    return (
        <div>
            <h1>User Dashboard</h1>
            <button onClick={logout}>Logout</button>
            <PostList />
        </div>
    );
}