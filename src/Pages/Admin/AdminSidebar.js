import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import toast from "react-hot-toast";

export default function AdminSidebar({ isOpen, onClose }) {
  const router = useNavigate();
  const path = useLocation().pathname;
  
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success("Logout Successfully");
    router("/admin");
  };

  // Render the sidebar only if isOpen is true
  if (!isOpen) return null;

  return (
    <div className="sidebarSection">
      <div className="sidebarTop">
        <div className="sidebarFlexAlignment">
          <div className="sidebarLogo" onClick={onClose}>
            <img src={Logo} alt="Logo" />
          </div>
          <div className="closeIcon" onClick={onClose}>
            X
          </div>
        </div>

        <div className="sidebarMenu">
          <div
            onClick={onClose}
            className={`menuList ${
              path === "/admin/dashboard" ? "activeMenu" : ""
            }`}
          >
            <NavLink to="/admin/dashboard">
              <p>Dashboard</p>
            </NavLink>
          </div>
        </div>
        <div className="sidebarMenu">
          <div
            onClick={onClose}
            className={`menuList ${
              path === "/admin/product" ? "activeMenu" : ""
            }`}
          >
            <NavLink to="/admin/product">
              <p>Product</p>
            </NavLink>
          </div>
        </div>
        <div className="sidebarMenu">
          <div
            onClick={onClose}
            className={`menuList ${
              path === "/admin/category" ? "activeMenu" : ""
            }`}
          >
            <NavLink to="/admin/category">
              <p>Category</p>
            </NavLink>
          </div>
        </div>
        <div className="sidebarMenu">
          <div
            onClick={onClose}
            className={`menuList ${
              path === "/admin/all-cart" ? "activeMenu" : ""
            }`}
          >
            <NavLink to="/admin/all-cart">
              <p>All Cart</p>
            </NavLink>
          </div>
        </div>
        <div className="sidebarMenu">
          <div
            onClick={onClose}
            className={`menuList ${
              path === "/admin/branch" ? "activeMenu" : ""
            }`}
          >
            <NavLink to="/admin/branch">
              <p>Branch</p>
            </NavLink>
          </div>
        </div>
        <div className="sidebarMenu">
          <div
            onClick={onClose}
            className={`menuList ${
              path === "/admin/users" ? "activeMenu" : ""
            }`}
          >
            <NavLink to="/admin/users">
              <p>Users</p>
            </NavLink>
          </div>
        </div>
        <div className="sidebarMenu">
          <div
            onClick={onClose}
            className={`menuList ${
              path === "/admin/contact" ? "activeMenu" : ""
            }`}
          >
            <NavLink to="/admin/contact">
              <p>Contact</p>
            </NavLink>
          </div>
        </div>
        <div className="sidebarMenu">
          <div className={`menuList`}>
            <NavLink onClick={logout}>
              <p>Logout</p>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="sidebarBottom">
        <p>© 2024 Ekanstect. All Rights Reserved.</p>
      </div>
    </div>
  );
}
