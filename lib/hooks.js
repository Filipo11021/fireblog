import { onAuthStateChanged } from "@firebase/auth";
import { doc, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";

export function useUserData() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    let unsub = () => {};
    if (user) {
      const ref = doc(db, "users", user.uid);
      unsub = onSnapshot(ref, (doc) => {
        if (doc.data()) {
          setUsername(doc.data().username);
        } else {
          setUsername(null);
        }
      });
    } else {
      setUsername(null);
    }
    return () => unsub();
  }, [user]);

  return { user, username };
}
