import Link from "next/link";
import { useContext } from "react";
import { UserCtx } from "../../lib/ctx";

const AuthCheck = ({ children, fallback }) => {
  const { username } = useContext(UserCtx);

  return username
    ? children
    : fallback || <Link href="/enter">You must be signed in</Link>;
};

export default AuthCheck;
