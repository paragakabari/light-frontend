import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminLayouts from "../Pages/Admin/Admin";
import ErrorPage from "../Pages/ErrorPage";
import ForgotPassword from "../Pages/ForgotPassword";
import LogIn from "../Pages/LogIn";
import Signup from "../Pages/Signup";
import About from "../Pages/User/About/About";
import Cart from "../Pages/User/Cart/Cart";
import Contact from "../Pages/User/Contact/Contact";
import Home from "../Pages/User/Home/Home";
import Product from "../Pages/User/Product/Product";
import AdminLayout from "./AdminLayout";
import DefaultLayout from "./DefaultLayout";
import SignedInRoute from "./SignedInRoute";
import Profile from "../Pages/User/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <SignedInRoute>
        <LogIn />
      </SignedInRoute>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "/signup",
    element: (
      <SignedInRoute>
        <Signup />
      </SignedInRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgotpassword",
    element: (
      <SignedInRoute>
        <ForgotPassword />
      </SignedInRoute>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "/",
    element: (
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/product",
    element: (
      <DefaultLayout>
        <Product />

      </DefaultLayout>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "/about",
    element: (
      <DefaultLayout>
        <About />
       

      </DefaultLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: (
      <DefaultLayout>
        <Profile />
       

      </DefaultLayout>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "/contact",
    element: (
      <DefaultLayout>
        <Contact />
      

      </DefaultLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: (
      <SignedInRoute>
        <LogIn />
      

      </SignedInRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminLayout>
        <AdminLayouts />
      

      </AdminLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/product",
    element: (
      <AdminLayout>
        <AdminLayouts />
      

      </AdminLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/users",
    element: (
      <AdminLayout>
        <AdminLayouts />
      

      </AdminLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin/contact",
    element: (
      <AdminLayout>
        <AdminLayouts />
      

      </AdminLayout>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: (
      <DefaultLayout>
        <Cart />
      

      </DefaultLayout>
    ),
    errorElement: <ErrorPage />,
  },
]);
