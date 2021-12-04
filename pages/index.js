import Loader from "../components/Loader";
import PostFeed from "../components/post/PostFeed";
import { db } from "../lib/firebase";
import { collectionGroup } from "firebase/firestore";
import { useState } from "react";
import getMorePosts from "../lib/getMorePosts";
import { getPosts } from "../lib/getPosts";

const LIMIT = +process.env.NEXT_PUBLIC_MAIN_LIMIT;

export const getStaticProps = async () => {
  const postsRef = collectionGroup(db, "posts");
  const { posts, postsEnd } = await getPosts(postsRef, LIMIT);

  return {
    props: {
      posts,
      postsEnd,
    },
    revalidate: 1,
  };
};

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(props.postsEnd);

  const morePosts = async () => {
    const postsRef = collectionGroup(db, "posts");
    getMorePosts({ posts, LIMIT, postsRef, setPosts, setPostsEnd, setLoading });
  };

  return (
    <main>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && <button onClick={morePosts}>Load more</button>}

      <Loader show={loading} />
      {posts.length === 0 && "no posts found"}
      {postsEnd && posts.length > 0 && "you have reached the end"}
    </main>
  );
}
