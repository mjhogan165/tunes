import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
export default function FeedContainer() {
  const activeClassName =
    "underline decoration-indigo-400 font-semibold decoration-4 underline-offset-4 flex";
  const inactiveClassName = "flex";
  const activeBackBtn = "invisible";
  const inactiveBackBtn = "";

  return (
    <div>
      <div className="flex p-2 content-container m-auto justify-between">
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            isActive ? activeBackBtn : inactiveBackBtn
          }
        >
          <FontAwesomeIcon icon={faCaretLeft} />
          Back
        </NavLink>
        {/* <NavLink
          to="myposts"
          className={({ isActive }) =>
            isActive ? activeClassName : inactiveClassName
          }
        >
          <span>My Posts</span>
          <FontAwesomeIcon
            icon={faCaretRight}
            className="flex self-center ml-1"
          />
        </NavLink> */}
      </div>
      <Outlet />
    </div>
  );
}
