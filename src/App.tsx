import React from "react";
import ReactDOM from "react-dom/client";
import DashboardLayout from "./Routes/Dashboard/DashboardLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import HomeLayout from "./Routes/Home/HomeLayout";
import Login from "./Routes/Home/Login";
import CreateNewTune from "./Routes/Dashboard/Pages/CreateNewTune/CreateNewTune";
import Signup from "./Routes/Home/Signup";
import MyFeed from "./Routes/Dashboard/Pages/Feed/MyFeed";
import Feed from "./Routes/Dashboard/Pages/Feed/Feed";
import Friends from "./Routes/Dashboard/Pages/Friends/Friends";
import TestAuthProvider from "./testauth/TestAuth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route path="feed" element={<Feed />} />
        <Route path="friends" element={<Friends />} />
        <Route path="create-new-tune" element={<CreateNewTune />} />
      </Route>
    </Route>
  )
);

const rootElm = document.getElementById("root");
if (rootElm === null) {
  throw new Error("must have root in document");
}

ReactDOM.createRoot(rootElm).render(
  <React.StrictMode>
    <TestAuthProvider>
      <RouterProvider router={router} />
    </TestAuthProvider>
  </React.StrictMode>
);
