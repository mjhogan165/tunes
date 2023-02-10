import React from "react";
import ReactDOM from "react-dom/client";
import User from "./Routes/User/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./Routes/Login-Layout/LoginPage";
import Login from "./Routes/Login-Layout/Login";
import Feed from "./Routes/User/Feed";
import Friends from "./Routes/User/Friends";
import Notifications from "./Routes/User/Notifications";
import Logout from "./Routes/User/Logout";
import AuthProvider from "./providers/auth-provider";
import CreateAccount from "./Routes/Login-Layout/CreateUser";
import { Toaster } from "react-hot-toast";
import UserProvider from "./providers/user-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    children: [
      {
        element: <Login />,
        index: true,
      },
      { path: "CreateAccount/", element: <CreateAccount /> },
    ],
  },
  {
    path: "User",
    element: <User />,
    children: [
      {
        path: "Feed/",
        element: <Feed />,
      },
      {
        path: "Notifications/",
        element: <Notifications />,
      },
      {
        path: "Friends/",
        element: <Friends />,
      },
    ],
  },
]);

const rootElm = document.getElementById("root");
if (rootElm === null) {
  throw new Error("must have root in document");
}

ReactDOM.createRoot(rootElm).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <Toaster />
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
