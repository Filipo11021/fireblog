import { useContext, useEffect } from "react";
import { UserCtx } from "../lib/ctx";
import SignOutBtn from "../components/auth/SignOutBtn";
import SignInBtn from "../components/auth/SignInBtn";
import UsernameForm from "../components/usernameForm/UsernameForm";
import { useRouter } from "next/router";

const EnterPage = () => {
  const { user, username } = useContext(UserCtx);
  const router = useRouter();

  useEffect(() => {
    if (username && user) router.push("/");
  }, [username, user, router]);

  return (
    <main>
      {user ? !username ? <UsernameForm /> : <SignOutBtn /> : <SignInBtn />}
    </main>
  );
};

export default EnterPage;
