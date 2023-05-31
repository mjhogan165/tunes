import React from "react";
import ReactDOM from "react-dom/client";
import DashboardLayout from "./Routes/Dashboard/DashboardLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomeLayout from "./Routes/Home/HomeLayout";
import Login from "./Routes/Home/Login";
import Feed from "./Routes/Dashboard/Feed";
import Friends from "./Routes/Dashboard/Friends/Friends";
import CreateNewTune from "./Routes/Dashboard/CreateNewTune";
import AuthProvider from "./providers/auth-provider";
import CreateAccount from "./Routes/Home/CreateUser";
import { Toaster } from "react-hot-toast";
import FeedProvider from "./providers/feed-provider";
import NewTuneProvider from "./providers/new-tune-provider";
import ErrorPage from "./Routes/ErrorPage";
import ProvidersWrapper from "./ProvidersWrapper";
import { getTunes } from "./api-calls/get-tunes";
import AllFriendsList from "./Routes/Dashboard/Friends/Componants/AllFriendsList";
import IncomingFriendRequest from "./Routes/Dashboard/Friends/Componants/IncomingFriendRequest";
import SentFriendsList from "./Routes/Dashboard/Friends/Componants/SentFriendsList";
import IncomingFriendsList from "./Routes/Dashboard/Friends/Componants/IncomingFriendsList";

const router = createBrowserRouter([
  {
    element: <ProvidersWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        errorElement: <ErrorPage />,
        // loader: getTunes,
        children: [
          // {
          //   path: "/",
          //   element: <HomePage />,
          // },
          {
            index: true,
            element: <Login />,
            errorElement: <ErrorPage />,
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
            // loader: getTunes,
            errorElement: <ErrorPage />,
          },
          {
            path: "friends",
            element: <Friends />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <AllFriendsList />,
              },
              {
                path: "all",
                element: <AllFriendsList />,
              },
              {
                path: "incoming",
                element: <IncomingFriendsList />,
              },
              {
                path: "sent",
                element: <SentFriendsList />,
              },
            ],
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
