import React from "react";
import NavList from "../../NavList";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <NavList />
      <Outlet />
    </div>
  );
}

export default Home;
