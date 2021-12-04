import Loader from "../components/Loader";
import PostFeed from "../components/post/PostFeed";
import { db, postToJSON } from "../lib/firebase";
import {
  collectionGroup,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import getMorePosts from "../lib/getMorePosts";
import { getPosts } from "../lib/getPosts";
import { useEffect } from "react";

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

  useEffect(() => {
    const postsRef = collectionGroup(db, "posts");
    const postsQuery = query(
      postsRef,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(LIMIT + 1)
    );

    const unsub = onSnapshot(postsQuery, (snapshot) => {
      const data = snapshot.docs.map((e) => postToJSON(e));

      if (data.length <= LIMIT) {
        setPostsEnd(true);
      } else if (data.length > LIMIT) {
        data.pop();
      }

      setPosts(data);
    });

    return () => unsub();
  }, []);

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
