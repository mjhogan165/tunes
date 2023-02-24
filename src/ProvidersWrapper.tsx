import React from "react";
import { Outlet } from "react-router-dom";
import AuthProvider, { useAuth } from "./providers/auth-provider";
import FeedProvider from "./providers/feed-provider";
import NewTuneProvider from "./providers/new-tune-provider";
import FriendsProvider from "./providers/friends-provider";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
function ProvidersWrapper() {
  const { user } = useAuth();
  // if (!user) {
  //   console.log({ user: user });
  //   return <Navigate to="/login" replace />;
  // } else
  return (
    <AuthProvider>
      <FeedProvider>
        <NewTuneProvider>
          <FriendsProvider>
            <Toaster />
            <Outlet />
          </FriendsProvider>
        </NewTuneProvider>
      </FeedProvider>
    </AuthProvider>
  );
}

export default ProvidersWrapper;
