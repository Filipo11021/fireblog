import { getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { postToJSON } from "./firebase";

export const getPosts = async (postsRef, LIMIT) => {
  let posts = [];
  let postsEnd = false;

  try {
    const postsQuery = query(
      postsRef,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(LIMIT + 1)
    );

    const res = await getDocs(postsQuery);
    posts = res.docs.map((doc) => postToJSON(doc));

    if (posts.length <= LIMIT) {
      postsEnd = true;
    } else if (posts.length > LIMIT) {
      posts.pop();
    }
  } catch (error) {
    console.log(error);
  }
  return { posts, postsEnd };
};
