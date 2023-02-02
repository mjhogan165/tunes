import React from "react";
import NavList from "../NavList";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="container mx-auto">
      <NavList />
      <Outlet />
    </div>
  );
}

export default Root;
