// i need admin layou inside header sidebar and children

import { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./layout.scss";
import Dashboard from "./Dashboard";
import { useLocation } from "react-router-dom";
import ProductList from "./ProductList";
import Users from "./Users";
import AdminContact from "./AdminContact";

export default function AdminLayouts({ children }) {
    const path = useLocation().pathname;
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          setSidebarOpen(false); // Open sidebar if screen width is 768px or less
        } else {
          setSidebarOpen(true);
        }
      };
  
      window.addEventListener('resize', handleResize);
      handleResize(); // Call once to set initial state
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);
   
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
      };
      const closeSidebar = () => {
        setSidebarOpen(false);
      };
  return (
    <div className="layoutCustomSection">
      <div
        className={`${
          isSidebarOpen ? "layoutCustomLeft" : "layoutCustomLefts"
        }`}
      >
        <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      </div>
      <div
        className={`${
          isSidebarOpen ? "layoutCustomRight" : "layoutCustomRights"
        }`}
      >
        <AdminHeader onToggleSidebar={toggleSidebar} />
{
    path == "/admin/dashboard" && <Dashboard />  ||
    path == "/admin/product" && <ProductList />  ||
    path == "/admin/users" && <Users />  ||
    path == "/admin/contact" && <AdminContact />
}
      </div>
    </div>
  );
}
