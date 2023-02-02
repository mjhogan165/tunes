import React from "react";
import { NavLink } from "react-router-dom";

function NavList() {
  // This styling will be applied to a <NavLink> when the
  // route that it links to is currently selected.
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";

  return (
    <nav className="flex justify-center">
      <ul className="flex justify-between w-full items-center p-4">
        <li>
          <NavLink             to="Feed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-20 h-20"
            >
              <path
                fillRule="evenodd"
                d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z"
                clipRule="evenodd"
              />
            </svg>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="Feed"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Feed
          </NavLink>
        </li>
        <li>
          <NavLink
            to="Friends"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Friends
          </NavLink>
        </li>
        <li>
          <NavLink to="Notifications">
            {({ isActive }) => (
              <span className={isActive ? activeClassName : undefined}>
                Notifications
              </span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="Logout">
            {({ isActive }) => (
              <span className={isActive ? activeClassName : undefined}>
                Logout
              </span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavList;
