import { useCookies } from "react-cookie";
import { redirects } from "./redirect";

const AdminLayout = ({ children }) => {
  const [cookies] = useCookies(["auth"]);
  const isAuthenticated =
    cookies.role ==='admin' 

  if (isAuthenticated) return children;

  // return <Navigate to="/login" />;
  return (window.location.href = redirects);
};

export default AdminLayout;
