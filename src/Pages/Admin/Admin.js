import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./layout.scss";
import Dashboard from "./Dashboard";
import ProductList from "./ProductList";
import Users from "./Users";
import AdminContact from "./AdminContact";
import AllCart from "./AllCart";
import Category from "./Category";
import Branch from "./Branch";

export default function AdminLayouts({ children }) {
  const path = useLocation().pathname;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const routes = {
    "/admin/dashboard": <Dashboard />,
    "/admin/product": <ProductList />,
    "/admin/users": <Users />,
    "/admin/contact": <AdminContact />
  };

  const componentToRender = routes[path] || <Dashboard />; // Default to Dashboard if path is not found

  return (
    <div className="layoutCustomSection">
      <div className={`${isSidebarOpen ? "layoutCustomLeft" : "layoutCustomLefts"}`}>
        <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      </div>
      <div className={`${isSidebarOpen ? "layoutCustomRight" : "layoutCustomRights"}`}>
        <AdminHeader onToggleSidebar={toggleSidebar} />
{
    path == "/admin/dashboard" && <Dashboard />  ||
    path == "/admin/product" && <ProductList />  ||
    path == "/admin/users" && <Users />  ||
    path == "/admin/contact" && <AdminContact />||
    path == "/admin/all-cart" && <AllCart />||
    path == "/admin/category" && <Category />||
    path == "/admin/branch" && <Branch />
}
      </div>
    </div>
  );
}
