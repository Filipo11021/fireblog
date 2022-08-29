import { signInAnonymously, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";

export default function SignInBtn() {
  const singInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="grid">
        <button className="btn-white" onClick={singInWithGoogle}>
          Sign in with Google
        </button>
        <button onClick={() => signInAnonymously(auth)}>
          Sign in Anonymously
        </button>
      </div>
    </div>
  );
}
