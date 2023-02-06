import React from "react";
import NavList from "../../NavList";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <NavList />
      <Outlet />
    </div>
  );
}

export default Root;
