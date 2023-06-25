import React from "react";
import ReactDOM from "react-dom/client";
import DashboardLayout from "./Routes/Dashboard/DashboardLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomeLayout from "./Routes/Home/HomeLayout";
import Login from "./Routes/Home/Login";
import Feed from "./Routes/Dashboard/Pages/Feed/Feed";
import Friends from "./Routes/Dashboard/Pages/Friends/FriendsContainer";
import CreateNewTune from "./Routes/Dashboard/Pages/CreateNewTune/CreateNewTune";
import CreateAccount from "./Routes/Home/CreateUser";
import ErrorPage from "./Routes/ErrorPage";
import AuthWrapper from "./AuthWrapper";
import AllFriendsList from "./Routes/Dashboard/Pages/Friends/AllFriends";
import PendingFriends from "./Routes/Dashboard/Pages/Friends/PendingFriends";
import SearchFriend from "./Routes/Dashboard/Pages/Friends/SearchFriends";
const router = createBrowserRouter([
  {
    element: <AuthWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Login />,
            errorElement: <ErrorPage />,
          },
          { path: "/create-account", element: <CreateAccount /> },
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
            errorElement: <ErrorPage />,
          },
          {
            path: "friends",
            element: <Friends />,
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
                path: "pending",
                element: <PendingFriends />,
              },
              {
                path: "search",
                element: <SearchFriend />,
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
