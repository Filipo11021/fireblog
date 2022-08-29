import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../../lib/firebase";

export default function SignOutBtn() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        signOut(auth);
        router.reload();
      }}
      className="mx-auto"
    >
      Sign Out
    </button>
  );
}
