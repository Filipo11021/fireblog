import { useRouter } from "next/router";
import { UserCtx } from "../../lib/ctx";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import styles from '../../styles/Post.module.css'
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function CreateNewPost() {
    const router = useRouter();
    const { username, user } = useContext(UserCtx);
    const [title, setTitle] = useState("");
  
    const slug = encodeURI(kebabCase(title));
    const isValid = title.length > 3 && title.length < 100;
  
    const createPost = async (e) => {
      e.preventDefault();
  
      const uid = user.uid;
  
      const userRef = doc(db, "users", uid);
      const postRef = doc(userRef, "posts", slug);
      const postData = {
        title,
        slug,
        uid,
        username,
        published: false,
        content: "# lorem ipsum.",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        heartCount: 0,
      };
  
      await setDoc(postRef, postData);
  
      toast.success("Post created!");
      router.push(`/admin/${slug}`);
    };
  
    return (
      <form onSubmit={createPost}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className={styles.input}
        />
        <p>
          <strong>Slug:</strong> {slug}
        </p>
        <button type="submit" disabled={!isValid} className="btn-green">
          Create New Post
        </button>
      </form>
    );
  }