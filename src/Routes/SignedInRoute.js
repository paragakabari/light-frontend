import React from "react";
import { useCookies } from "react-cookie";
import { redirects } from "./redirect";

const SignedInRoute = ({ children }) => {
  const [cookies] = useCookies(["auth"]);
  const isAuthenticated =
    cookies.token !== undefined || cookies.userinfo !== undefined;

  // if (isAuthenticated) return <Navigate to="/" />;
  if (isAuthenticated) return (window.location.href = redirects);

  return (
    <>
      {/* <GlobalLoader parentLoading={loading} /> */}
      {children}
    </>
  );
};

export default SignedInRoute;
