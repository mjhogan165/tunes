import React from "react";
import { useEffect } from "react";
import { getAccounts } from "../../../../api-calls/get-accounts";
import {
  IFriendRequest,
  useFriends,
} from "../../../../providers/friends-provider";
import { User } from "../../../../Interfaces/user";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

function Friends() {
  const {
    userFriendRequests,
    setUserFriendAccounts,
    userFriendAccounts,
    user,
  } = useFriends();

  const activeClassName =
    "underline decoration-indigo-400 font-semibold decoration-4 underline-offset-4";
  const activeClassNameSpecial =
    "text-xl font-medium underline decoration-indigo-400 decoration-4 underline-offset-4";

  const friendUserNames = userFriendRequests.accepted.map((request) => {
    return returnFriend(request, user);
  });

  useEffect(() => {
    getAccounts()
      .then((response) => response.json())
      .then((accounts) => {
        return accounts.filter((account: User) => {
          return friendUserNames.includes(account.userName);
        });
      })
      .then((friends) => {
        setUserFriendAccounts(friends);
      })
      .catch((err) => toast.error(err));
  }, [userFriendRequests]);

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
        <Outlet context={{ userFriendAccounts }} />
      </div>
    </div>
  );
}
export function returnFriend(friendRequest: IFriendRequest, currentUser: User) {
  return friendRequest.sender.toLowerCase() ===
    currentUser.userName.toLowerCase()
    ? friendRequest.receiver
    : friendRequest.sender;
}
type ContextFriends = {
  userFriendAccounts: User[];
};
export function useUserFriends() {
  return useOutletContext<ContextFriends>();
}
export default Friends;
