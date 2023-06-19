import React from "react";
import { useEffect } from "react";
import { getAccounts } from "../../../../api-calls/get-accounts";
import {
  IFriendRequest,
  useFriends,
} from "../../../../providers/friends-provider";
import { User } from "../../../../Interfaces/user";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";

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
    "text-xl decoration-indigo-400 decoration-4 font-medium underline-offset-4 underline";

  const friendUserNames = userFriendRequests.accepted.map((request) => {
    return returnFriend(request, user);
  });

  useEffect(() => {
    getAccounts()
      .then((response) => response.json())
      .then((accounts) => {
        console.log({ accounts: accounts });
        return accounts.filter((account: User) => {
          return friendUserNames.includes(account.userName);
        });
      })
      .then((friends) => {
        console.log({ friends: friends });
        setUserFriendAccounts(friends);
      })
      .catch((err) => console.log(err));
  }, [userFriendRequests]);

  return (
    <div className="container bg-white rounded-2xl p-4 shadow-lg sm:p-6 mb-4 mx-auto flex flex-col items-center content-container">
      <nav>
        <div className="flex justify-around py-2 text-base">
          <NavLink
            to="pending"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
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
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Search
          </NavLink>
        </div>
      </nav>
      <Outlet context={{ userFriendAccounts }} />
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