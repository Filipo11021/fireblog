import { useContext } from "react";
import { UserCtx } from "../lib/ctx";
import SignOutBtn from "../components/auth/SignOutBtn";
import SignInBtn from "../components/auth/SignInBtn";
import UsernameForm from "../components/usernameForm/UsernameForm";

const EnterPage = () => {
  const { user, username } = useContext(UserCtx);
  
  return (
    <main>
      {user ? !username ? <UsernameForm /> : <SignOutBtn /> : <SignInBtn />}
    </main>
  );
};

export default EnterPage;
