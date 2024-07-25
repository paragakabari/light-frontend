import { useCookies } from "react-cookie";
import { redirects } from "./redirect";

const SuperAdminRoute = ({ children }) => {
  const [cookies] = useCookies(["auth"]);
  const isAuthenticated =
    cookies.token !== undefined || cookies.userinfo !== undefined;
  const role = cookies?.userinfo?.role;

  const showRoute =
    role?._id  &&
    isAuthenticated;

  if (showRoute) return children;

  return (window.location.href = redirects);
};

export default SuperAdminRoute;
