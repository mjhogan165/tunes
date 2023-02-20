import React from "react";
import { NavLink } from "react-router-dom";

type NavLinkProps = {
  label: string;
  to: string;
  onClick?: () => void;
};

function NavLinkItem({ label, to, onClick }: NavLinkProps) {
  const activeClassName = "underline";
  const activeStyle = {
    textDecoration: "underline",
  };
  return (
    <li className="md:mx-8">
      <NavLink
        to={to}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        onClick={onClick}
      >
        {label}
      </NavLink>
    </li>
  );
}

export default NavLinkItem;
