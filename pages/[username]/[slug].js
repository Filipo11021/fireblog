import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "@firebase/firestore";
import { db, getUid, postToJSON } from "../../lib/firebase";
import styles from "../../styles/Post.module.css";
import PostContent from "../../components/post/PostContent";
import AuthCheck from "../../components/auth/AuthCheck";
import HeartBtn from "../../components/post/elements/HeartBtn";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserCtx } from "../../lib/ctx";
import DeleteBtn from "../../components/post/elements/DeleteBtn";

export const getStaticProps = async ({ params }) => {
  let post = "";
  let path = "";

  try {
    const { username, slug } = params;

    const userDoc = await getUid(username);

    if (userDoc) {
      const userRef = doc(db, "users", userDoc.uid);
      const postRef = doc(userRef, "posts", slug);
      const res = await getDoc(postRef);

      post = postToJSON(res);
      if (!post) {
        return {
          notFound: true,
        };
      }
      path = postRef.path;
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
};

export const getStaticPaths = async () => {
  const postsRef = collectionGroup(db, "posts");
  let paths;
  try {
    const snapshot = await getDocs(postsRef);

    paths = snapshot.docs.map((doc) => {
      const { slug, username } = doc.data();

      return {
        params: { username, slug },
      };
    });
  } catch (error) {
    console.log(error);
  }

  return {
    paths,
    fallback: "blocking",
  };
};

const Post = (props) => {
  const [post, setPost] = useState(props.post);
  const postRef = post && doc(doc(db, "users", post.uid), "posts", post.slug);
  const { user } = useContext(UserCtx);

  useEffect(() => {
    const unsub = onSnapshot(postRef, (snapshot) => {
      setPost(postToJSON(snapshot));
    });
    return () => unsub();
  }, []);

  return post ? (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card btn-wrap">
        <p>
          <strong>{post.heartCount || 0} ❤️</strong>
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <a>
                <button>Sign Up</button>
              </a>
            </Link>
          }
        >
          <HeartBtn postRef={postRef} />
        </AuthCheck>

        {user?.uid === post.uid && (
          <>
            <Link href={`/admin/${post.slug}`}>
              <a style={{ width: "100%" }}>
                <button className="btn-blue">Edit Post</button>
              </a>
            </Link>
            <DeleteBtn postRef={postRef} />
          </>
        )}
      </aside>
    </main>
  ) : (
    <></>
  );
};

export default Post;
