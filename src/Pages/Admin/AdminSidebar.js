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
  return (
    <div className="sidebarSection">
      <div className="sidebarTop">
        <div className="sidebarFlexAlignment">
          <div className="sidebarLogo" onClick={() => isOpen && onClose()}>
            <img src={Logo} alt="Logo" />
          </div>
          <div className="closeIcon" onClick={onClose}>
            X
          </div>
        </div>

        <div className="sidebarMenu">
          <div
            className={`menuList ${
              path === "/admin/dashboard" ? "activeMenu" : ""
            }`}
          >
            <NavLink onClick={() => router("/admin/dashboard")}>
              {" "}
              <p>Dashboard</p>
            </NavLink>
          </div>
        </div>
        <div className="sidebarMenu">
          <div
            className={`menuList ${
              path === "/admin/product" ? "activeMenu" : ""
            }`}
          >
            <NavLink onClick={() => router("/admin/product")}>
              {" "}
              <p>Product</p>
            </NavLink>
          </div>
        </div>
        <div className="sidebarMenu">
          <div
            className={`menuList ${
              path === "/admin/category" ? "activeMenu" : ""
            }`}
          >
            <NavLink onClick={() => router("/admin/category")}>
              {" "}
              <p>Category</p>
            </NavLink>
          </div>
        </div>
        <div className="sidebarMenu">
          <div
            className={`menuList ${
              path === "/admin/all-cart" ? "activeMenu" : ""
            }`}
          >
            <NavLink onClick={() => router("/admin/all-cart")}>
              {" "}
              <p>All Cart</p>
            </NavLink>
          </div>
        </div>
        <div className="sidebarMenu">
          <div
            className={`menuList ${
              path === "/admin/branch" ? "activeMenu" : ""
            }`}
          >
            <NavLink onClick={() => router("/admin/branch")}>
              {" "}
              <p>Branch</p>
            </NavLink>
          </div>
        </div>

        <div className="sidebarMenu">
          <div
            className={`menuList ${
              path === "/admin/users" ? "activeMenu" : ""
            }`}
          >
            <NavLink onClick={() => router("/admin/users")}>
              {" "}
              <p>Users</p>
            </NavLink>
          </div>
        </div>
        <div className="sidebarMenu">
          <div
            className={`menuList ${
              path === "/admin/contact" ? "activeMenu" : ""
            }`}
          >
            <NavLink onClick={() => router("/admin/contact")}>
              {" "}
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
