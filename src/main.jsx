import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./Routes/Login";
import Feed from "./Routes/Feed";
import Friends from "./Routes/Friends";
import Notifications from "./Routes/Notifications";
import Logout from "./Routes/Logout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "Feed/",
        element: <Feed/>,
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
  {
    path: "Login/",
    element: <Login />,
  },
  {
    path: "Logout/",
    element: <Logout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
