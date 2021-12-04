import PostFeed from "./PostFeed";
import { UserCtx } from "../../lib/ctx";
import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(UserCtx);

  useEffect(() => {
    const postsRef = user && collection(db, "users", user?.uid, "posts");
    const postsQuery = user && query(postsRef, orderBy("createdAt"));

    const unsub =
      user &&
      onSnapshot(postsQuery, (doc) => {
        const data = doc.docs.map((e) => e.data());
        setPosts(data);
      });
    return unsub;
  }, [user]);

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}
