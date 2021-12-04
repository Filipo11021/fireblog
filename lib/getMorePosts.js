import {
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from "@firebase/firestore";

const getMorePosts = async ({
  posts,
  LIMIT,
  postsRef,
  setPosts,
  setPostsEnd,
  setLoading,
}) => {
  try {
    setLoading(true);
    const searchLimit = LIMIT + 1;

    const last = posts[posts.length - 1];
    const cursor =
      typeof last.createdAt === "number"
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;

    const postsQuery = query(
      postsRef,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(searchLimit)
    );

    const res = await getDocs(postsQuery);
    const newPosts = res.docs.map((doc) => doc.data());

    //1 1
    if (newPosts.length <= LIMIT) {
      setPostsEnd(true);
    } else if (newPosts.length > LIMIT) {
      newPosts.pop();
    }

    setPosts([...posts, ...newPosts]);
    setLoading(false);
  } catch (error) {
    console.log(error.message);
  }
};

export default getMorePosts;
