import { doc, getDoc, writeBatch } from "firebase/firestore";
import debounce from "lodash.debounce";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserCtx } from "../../lib/ctx";
import { db } from "../../lib/firebase";
import UsernameMessage from "./UsernameMessage";

export default function UsernameForm() {
  const [usernameValue, setusernameValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserCtx);

  useEffect(() => {
    checkUsername(usernameValue);
  }, [usernameValue, checkUsername]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(db, "usernames", username);
        const dockSnap = await getDoc(ref);

        setIsValid(!dockSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  const changeHandler = (e) => {
    // force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setusernameValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setusernameValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const userDoc = doc(db, "users", user.uid);
    const usernameDoc = doc(db, "usernames", usernameValue);

    const batch = writeBatch(db);
    batch.set(userDoc, {
      username: usernameValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });
    await batch.commit();
  };

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={usernameValue}
            onChange={changeHandler}
          />
          <UsernameMessage
            username={usernameValue}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choosen
          </button>

          {/* <div>
              <h3>debug state</h3>
              <p>username: {usernameValue}</p>
              <p>loading: {loading.toString()}</p>
              <p>username valid: {isValid.toString()}</p>
            </div> */}
        </form>
      </section>
    )
  );
}
