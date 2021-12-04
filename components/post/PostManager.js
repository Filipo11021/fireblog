import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "../../lib/firebase";
import { UserCtx } from "../../lib/ctx";
import Link from "next/link";
import styles from "../../styles/Admin.module.css";
import DeleteBtn from "../../components/post/elements/DeleteBtn";
import PostForm from "./PostForm";

export default function PostManager() {
  const [preview, setPreview] = useState(false);
  const [post, setPost] = useState(null);
  const { user } = useContext(UserCtx);
  const router = useRouter();
  const { slug } = router.query;

  const userRef = user && doc(db, "users", user?.uid);
  const postRef = user && doc(userRef, "posts", slug);

  useEffect(() => {
    let unsub = () => {};
    if (user) {
      unsub = onSnapshot(postRef, (doc) => {
        setPost(doc.data());
      });
    }
    return unsub;
  }, [user, slug]);

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>
            <PostForm
              postRef={postRef}
              preview={preview}
              defaultValues={post}
            />
          </section>

          <aside>
            <h3>Tools</h3>
            <div className="btn-wrap">
              <button onClick={() => setPreview((prev) => !prev)}>
                {preview ? "Edit" : "Preview"}
              </button>
              <Link href={`/${post.username}/${post.slug}`}>
                <a>
                  <button className="btn-blue">Live View</button>
                </a>
              </Link>
              <DeleteBtn postRef={postRef} />
            </div>
          </aside>
        </>
      )}
    </main>
  );
}
