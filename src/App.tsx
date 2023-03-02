import React from "react";
import ReactDOM from "react-dom/client";
import DashboardLayout from "./Routes/Dashboard/DashboardLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomeLayout from "./Routes/Home/HomeLayout";
import Login from "./Routes/Home/Login";
import Feed from "./Routes/Dashboard/Feed";
import Friends from "./Routes/Dashboard/Friends";
import CreateNewTune from "./Routes/Dashboard/CreateNewTune";
import AuthProvider from "./providers/auth-provider";
import CreateAccount from "./Routes/Home/CreateUser";
import { Toaster } from "react-hot-toast";
import FeedProvider from "./providers/feed-provider";
import NewTuneProvider from "./providers/new-tune-provider";
import ErrorPage from "./Routes/ErrorPage";
import Redirect from "./Routes/Redirect";
import FriendsProvider from "./providers/friends-provider";
import HomePage from "./Routes/Home/HomePage";
import { useAuth } from "./providers/auth-provider";
import ProvidersWrapper from "./ProvidersWrapper";

const router = createBrowserRouter([
  {
    element: <ProvidersWrapper />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        children: [
          // {
          //   path: "/",
          //   element: <HomePage />,
          // },
          {
            index: true,
            element: <Login />,
          },
          { path: "/create-account", index: true, element: <CreateAccount /> },
        ],
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "create-newtune",
            element: <CreateNewTune />,
          },
          {
            path: "feed",
            element: <Feed />,
          },
          {
            path: "friends",
            element: <Friends />,
            errorElement: <ErrorPage />,
          },
          {
            path: "Redirect/",
            element: <Redirect />,
          },
        ],
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
    <RouterProvider router={router} />
  </React.StrictMode>
);