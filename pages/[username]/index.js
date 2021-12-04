import { collection } from "@firebase/firestore";
import { useState } from "react";
import Loader from "../../components/Loader";
import PostFeed from "../../components/post/PostFeed";
import UserProfile from "../../components/UserProfile";
import { db, getUserWithUsername } from "../../lib/firebase";
import getMorePosts from "../../lib/getMorePosts";
import { getPosts } from "../../lib/getPosts";

const LIMIT = +process.env.NEXT_PUBLIC_USER_LIMIT;

export async function getServerSideProps(props) {
  let user = null;
  let posts = [];
  let postsEnd = false;
  let postsRef;

  try {
    const { username } = props.query;

    const userDoc = await getUserWithUsername(username);

    if (!userDoc) {
      return {
        notFound: true,
      };
    }

    if (userDoc) {
      user = userDoc.data();
      const userRef = userDoc.ref;
      postsRef = collection(userRef, "posts");

      const postRes = await getPosts(postsRef, LIMIT);
      if (postRes.posts) {
        posts = postRes.posts;
        postsEnd = postRes.postsEnd;
      }
    }
  } catch (error) {
    console.log(error);
  }
  const postsElements = postsRef._query.path.segments;
  return {
    props: { user, posts, postsEnd, postsElements },
  };
}

const UserProfilePage = (props) => {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(props.postsEnd);

  const getPosts = async () => {
    const postsRef = collection(
      db,
      props.postsElements[0],
      props.postsElements[1],
      props.postsElements[2]
    );

    getMorePosts({ posts, LIMIT, postsRef, setPosts, setPostsEnd, setLoading });
  };

  return (
    <main>
      <UserProfile user={props.user} />
      <PostFeed posts={posts} />

      {!loading && !postsEnd && <button onClick={getPosts}>Load more</button>}

      <Loader show={loading} />

      {posts.length === 0 && "no posts found"}
      {postsEnd && posts.length > 0 && "you have reached the end"}
    </main>
  );
};

export default UserProfilePage;
