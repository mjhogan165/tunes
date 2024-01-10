import React from "react";
import { User } from "../../../../Interfaces/user";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { useAuth, useRequiredUser } from "../../../../providers/auth-provider";

function Friends() {
  const { user } = useAuth();

  const activeClassName =
    "underline decoration-indigo-400 font-semibold decoration-4 underline-offset-4";
  const activeClassNameSpecial =
    "text-xl font-medium underline decoration-indigo-400 decoration-4 underline-offset-4";

  return (
    <div>
      <nav className="content-container m-auto flex justify-between py-2 text-base">
        <NavLink
          to="pending"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          <FontAwesomeIcon icon={faCaretLeft} className="mr-1" />
          Pending
        </NavLink>
        <NavLink
          to="all"
          style={{ width: 100, textAlign: "center" }}
          className={({ isActive }) =>
            isActive ? activeClassNameSpecial : "text-lg font-medium"
          }
        >
          All
        </NavLink>
        <NavLink
          to="search"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          Search
          <FontAwesomeIcon icon={faCaretRight} className="ml-1" />
        </NavLink>
      </nav>
      <div className="w-full bg-white rounded-2xl p-4 shadow-lg sm:p-6 mb-4 m-auto flex flex-col items-center content-container">
        {user && <Outlet />}
      </div>
    </div>
  );
}
// export function returnFriend(friendRequest: IFriendRequest, currentUser: User) {
//   return friendRequest.sender.toLowerCase() ===
//     currentUser.username.toLowerCase()
//     ? friendRequest.receiver
//     : friendRequest.sender;
// }
type ContextFriends = {
  userFriendAccounts: User[];
};
export function useUserFriends() {
  return useOutletContext<ContextFriends>();
}
export default Friends;
