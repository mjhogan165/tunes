import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth, useRequiredUser } from "../../providers/auth-provider";

function NavList() {
  const activeClassName =
    "underline decoration-indigo-400 font-semibold decoration-4 underline-offset-4";
  const activeClassNameSpecial =
    "text-xl decoration-indigo-400 decoration-4 font-medium underline-offset-4 underline";
  const { logout } = useAuth();
  const [showMenuItems, setShowMenuItems] = useState(false);
  const user = useRequiredUser();
  useEffect(() => {
    handleResize();
  }, []);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setShowMenuItems(true);
    } else setShowMenuItems(false);
  };
  const profileImg = user.profileImg ? user.profileImg : "";

  window.addEventListener("resize", handleResize);
  return (
    <nav className=" mb-1">
      <div className="min-h-20 flex items-center justify-between md:justify-between my-2 text-right">
        <NavLink className="flex flex-col items-center" to="feed">
          <div className="w-14 h-14 object-cover overflow-hidden rounded-full">
            <img className="w-full h-full" src={`${profileImg}`} alt="" />
          </div>
          {profileImg === "" && (
            <i className="fa-solid fa-user inline p-2 border-2 rounded-full fa-xl bg-white"></i>
          )}
          <div>{user.username}</div>
        </NavLink>
        <NavLink to="Feed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-14 h-14 sm:block md:w-20 md: h:20"
          >
            <path
              fillRule="evenodd"
              d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z"
              clipRule="evenodd"
            />
          </svg>
        </NavLink>
        <NavLink to="/" onClick={logout}>
          Logout{" "}
        </NavLink>
      </div>
      <div className="flex justify-around py-2 text-base border-b-2 border-solid border-b-gray-300/50">
        <NavLink
          to="feed"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          Feed
        </NavLink>
        <NavLink
          to="create-newtune"
          style={{ width: 100, textAlign: "center" }}
          className={({ isActive }) =>
            isActive ? activeClassNameSpecial : "text-lg font-medium"
          }
        >
          + Create
        </NavLink>
        <NavLink
          to="friends"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          Friends
        </NavLink>
      </div>
    </nav>
  );
}

export default NavList;
