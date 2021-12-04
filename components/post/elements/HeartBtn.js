import { doc, getDoc, writeBatch, increment } from "@firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { UserCtx } from "../../../lib/ctx";
import { db } from "../../../lib/firebase";

const HeartBtn = ({ postRef }) => {
  const [heartRef, setHeartRef] = useState(null)
  const [heartDoc, setHeartDoc] = useState(null);

  const { user } = useContext(UserCtx);

  useEffect(() => {
      if(user){
          setHeartRef(doc(postRef, "hearts", user.uid))
      }
  }, [user, postRef])

  useEffect(() => {
    async function checkHeart() {
      const res = await getDoc(heartRef);
      setHeartDoc(res);
    }
   if(heartRef) checkHeart()
  }, [heartRef]);

  const addHeart = async () => {
    const batch = writeBatch(db);

    batch.update(postRef, {
      heartCount: increment(1),
    });
    batch.set(heartRef, { uid: user.uid });

    await batch.commit()
  };

  const removeHeart = async () => {
      const batch = writeBatch(db)

      batch.update(postRef, {heartCount: increment(-1)})
      batch.delete(heartRef)

      await batch.commit()
  };

  return heartDoc?.exists() ? (
    <button onClick={removeHeart}>💔 unheart</button>
  ) : (
    <button onClick={addHeart}>❤️ heart</button>
  );
};

export default HeartBtn;
