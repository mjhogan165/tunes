import React from "react";
import NavList from "../../NavList";
import { Outlet, useOutletContext } from "react-router-dom";
import { useAuth, useRequiredUser } from "../../providers/auth-provider";
import { Navigate } from "react-router-dom";
import FeedProvider from "../../providers/feed-provider";
import NewTuneProvider from "../../providers/new-tune-provider";
import FriendsProvider from "../../providers/friends-provider";

function DashboardLayout() {
  console.log("Render: dashboardlayout");
  const { user } = useAuth();
  if (user) {
    return (
      <div className="max-w-6xl mx-auto overflow-auto">
        <NavList />
        <FeedProvider>
          <NewTuneProvider>
            <FriendsProvider>
              <Outlet />
            </FriendsProvider>
          </NewTuneProvider>
        </FeedProvider>
      </div>
    );
  } else return <Navigate to="/" replace />;
}

export default DashboardLayout;
