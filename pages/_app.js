import { Toaster } from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import Metatags from "../components/Metatags";
import { UserCtx } from "../lib/ctx";
import { useUserData } from "../lib/hooks";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserCtx.Provider value={userData}>
      <Metatags />
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserCtx.Provider>
  );
}

export default MyApp;
