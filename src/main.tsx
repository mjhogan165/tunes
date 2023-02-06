import React from "react";
import ReactDOM from "react-dom/client";
import User from "./Routes/User/User"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./Routes/Home/Login";
import Feed from "./Routes/User/Feed";
import Friends from "./Routes/User/Friends";
import Notifications from "./Routes/User/Notifications";
import Logout from "./Routes/User/Logout";
import AuthProvider from "./providers/auth-provider";
import CreateAccount from "./Routes/Home/CreateAccount";
import Home from "./Routes/Home/Home";

const router = createBrowserRouter([
  {
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      { path: "CreateAccount/", element: <CreateAccount /> },
    ],
  },
  {
    path: "User",
    element: <User />,
    children: [
      {
        path: "Home/",
        element: <CreateAccount />,
      },
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
      // {
      //   path: "Login/",
      //   element: <Login />,
      // },
      {
        path: "Logout/",
        element: <Logout />,
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
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
