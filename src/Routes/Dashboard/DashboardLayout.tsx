import React from "react";
import { useEffect } from "react";
import NavList from "../../NavList";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../providers/auth-provider";
import { Navigate } from "react-router-dom";
function DashboardLayout() {
  console.log("dashboardlayout");
  const { user } = useAuth();
  if (!user) {
    console.log({ user: user });
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto px-2 overflow-auto">
      <NavList />
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
