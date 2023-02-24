import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type NavLinkProps = {
  label: string;
  to: string;
  onClick?: () =>
    | void
    | ((set: React.Dispatch<React.SetStateAction<boolean>>) => void);
};

function NavLinkItem({ label, to, onClick }: NavLinkProps) {
  const activeClassName = "underline";
  const activeStyle = {
    textDecoration: "underline",
  };
  return (
    <NavLink
      to={to}
      onClick={onClick}
      style={({ isActive }) => (isActive ? activeStyle : undefined)}
      className="hover:bg-indigo-400 md:rounded-md md:mx-8 md:shadow-none cursor-pointer py-2 px-4 font-medium block relative"
    >
      {label}
      {label === "Friends" && (
        <svg
          className="absolute top-0 right-0 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
        </svg>
      )}
    </NavLink>
  );
}

export default NavLinkItem;
