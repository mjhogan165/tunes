import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Routes/Home-Layout/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./Routes/Auth-Layout/LoginPage";
import Login from "./Routes/Auth-Layout/Login";
import Feed from "./Routes/Home-Layout/Feed";
import Friends from "./Routes/Home-Layout/Friends";
import CreateNewTune from "./Routes/Home-Layout/CreateNewTune";
import AuthProvider from "./providers/auth-provider";
import CreateAccount from "./Routes/Auth-Layout/CreateUser";
import { Toaster } from "react-hot-toast";
import FeedProvider from "./providers/feed-provider";
import NewTuneProvider from "./providers/new-tune-provider";
import ErrorPage from "./Routes/ErrorPage";
import Redirect from "./Routes/Redirect";
import FriendsProvider from "./providers/friends-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        index: true,
      },
      { path: "CreateAccount/", element: <CreateAccount /> },
    ],
  },
  {
    path: "Home",
    element: <Home />,
    children: [
      {
        path: "Feed/",
        element: <Feed />,
      },
      {
        path: "CreateNewTune/",
        element: <CreateNewTune />,
      },
      {
        path: "Friends/",
        element: <Friends />,
      },
      {
        path: "Redirect/",
        element: <Redirect />,
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
      <FeedProvider>
        <NewTuneProvider>
          <FriendsProvider>
            <Toaster />
            <RouterProvider router={router} />
          </FriendsProvider>
        </NewTuneProvider>
      </FeedProvider>
    </AuthProvider>
  </React.StrictMode>
);
