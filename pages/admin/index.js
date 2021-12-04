import AuthCheck from "../../components/auth/AuthCheck";
import CreateNewPost from "../../components/post/CreateNewPost";
import PostList from "../../components/post/PostList";

const AdminPostsPage = () => {
  return (
    <main>
      <AuthCheck>
        <CreateNewPost />
        <PostList />
      </AuthCheck>
    </main>
  );
};

export default AdminPostsPage;
