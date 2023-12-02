import React from "react";
import NavList from "./NavList";
import { Outlet, useLocation } from "react-router-dom";
import AuthProvider, {
  useAuth,
  useRequiredUser,
} from "../../providers/auth-provider";
import { Navigate } from "react-router-dom";
import FeedProvider from "../../providers/feed-provider";
import NewTuneProvider from "../../providers/new-tune-provider";
import FriendsProvider from "../../providers/friends-provider";
import { Secret } from "../../Componants/Secret";
import { Link } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="max-w-6xl mx-auto overflow-auto">
      <p>dashboard</p>
      <Link to="feed">my feed</Link>
      <Link to="create-new-tune">Create Tune</Link>
      <Link to="friends">my friends</Link>
      <p>Welcome User</p>
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
