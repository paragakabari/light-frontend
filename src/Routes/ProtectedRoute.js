import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { redirects } from "./redirect";

const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies(["auth"]);
  const isAuthenticated =
    cookies.token !== undefined || cookies.userinfo !== undefined;

  if (isAuthenticated) return children;

  // return <Navigate to="/login" />;
  return (window.location.href = redirects);
};

export default ProtectedRoute;
