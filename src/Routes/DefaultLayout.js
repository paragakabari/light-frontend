import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer/Footer";
import Header from "../Pages/Header/Header";

export default function DefaultLayout({ children }) {
 
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export const AuthLayout = () => {
  return (
    <>
      <div className="auth-layout">
        <div className="auth-layout-sidebar-width">Sidebar</div>
        <div className="auth-layout-children-width">
          <Outlet />
        </div>
      </div>
    </>
  );
};
