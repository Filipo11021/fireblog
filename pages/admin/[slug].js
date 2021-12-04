import AuthCheck from "../../components/auth/AuthCheck";
import PostManager from "../../components/post/PostManager";

const AdminPostEdit = () => {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
};

export default AdminPostEdit;
