import React from "react";
import { Outlet } from "react-router-dom";
import AuthProvider, { useAuth } from "./providers/auth-provider";
import FeedProvider from "./providers/feed-provider";
import NewTuneProvider from "./providers/new-tune-provider";
import FriendsProvider from "./providers/friends-provider";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
function ProvidersWrapper() {
  // console.log("Render: Provider wrapper");
  return (
    <AuthProvider>
      <Toaster />
      <Outlet />
    </AuthProvider>
  );
}

export default ProvidersWrapper;
