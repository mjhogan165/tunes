import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./providers/auth-provider";
import NavLinkItem from "./Componants/NavLinkItem";
function NavList() {
  const activeStyle = {
    textDecoration: "underline",
  };
  const { logout } = useAuth();
  const [showMenuItems, setShowMenuItems] = useState(false);
  const activeClassName = "underline";
  useEffect(() => {
    console.log("reRENDER");
    handleResize();
  }, []);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setShowMenuItems(true);
    } else setShowMenuItems(false);
  };
  window.addEventListener("resize", handleResize);
  return (
    <nav className="min-h-20 flex items-center justify-around md:justify-between p-4">
      <NavLink to="Feed">
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
      <div className="relative md:w-full md:flex md:justify-between">
        <button
          className="md:hidden"
          onClick={() => setShowMenuItems(!showMenuItems)}
        >
          <span>MENU </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        {showMenuItems && (
          <ul className="absolute w-max flex-col md:flex md:justify-around md:w-full md:flex-row md:relative">
            <NavLinkItem to="Feed" label="Feed" />
            <NavLinkItem to="Friends" label="Friends" />
            <NavLinkItem to="CreateNewTune" label="+ Create NewTune" />
            <NavLinkItem to="/" label="Logout" onClick={logout} />
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavList;
