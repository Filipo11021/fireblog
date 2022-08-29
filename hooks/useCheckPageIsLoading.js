import { Router } from "next/router";
import { useEffect, useState } from "react";

const useCheckPageIsLoading = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeout = null;

    const start = () => {
      timeout = setTimeout(() => {
        setLoading(true);
      }, 500);
    };
    const end = () => {
      clearTimeout(timeout);
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return loading;
};
export default useCheckPageIsLoading;
