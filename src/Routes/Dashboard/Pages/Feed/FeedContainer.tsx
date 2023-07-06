import React from "react";
import { NavLink, Outlet } from "react-router-dom";
export default function FeedContainer() {
  const activeClassName =
    "underline decoration-indigo-400 font-semibold decoration-4 underline-offset-4";
  const activeClassNameSpecial =
    "text-xl decoration-indigo-400 decoration-4 font-medium underline-offset-4 underline";

  return (
    <div>
      <div className="flex p-2 justify-around">
        <NavLink
          to="myfeed"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          My Feed
        </NavLink>
        <NavLink
          to="myposts"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          My Posts
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
