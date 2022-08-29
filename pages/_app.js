import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/layout/Navbar";
import Metatags from "../components/Metatags";
import { UserCtx } from "../lib/ctx";
import { useUserData } from "../lib/hooks";
import "../styles/globals.css";
import Loader from "../components/Loader";
import { Router } from "next/router";
import useCheckPageIsLoading from "../hooks/useCheckPageIsLoading";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  const pageIsLoading = useCheckPageIsLoading()

  return (
    <UserCtx.Provider value={userData}>
      {!pageIsLoading ? (
        <>
          <Metatags />
          <Navbar />
          <Component {...pageProps} />
          <Toaster />
        </>
      ) : (
        <div className="w-full h-screen center">
          <Loader />
        </div>
      )}
    </UserCtx.Provider>
  );
}

export default MyApp;
