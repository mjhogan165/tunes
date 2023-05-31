import React from "react";
import { useState, useEffect } from "react";
import { getAccounts } from "../../../api-calls/get-accounts";
import UserInput from "../../../Componants/UserInput";
import Button from "../../../Componants/Button";
import {
  IFriendRequest,
  useFriends,
} from "../../../providers/friends-provider";
import { useRequiredUser } from "../../../providers/auth-provider";
import { User } from "../../../Interfaces/forms";
import { IUserFriendRequests } from "../../../providers/friends-provider";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { toggle } from "../../../functions";
import FriendRequestsDropBar from "./Componants/FriendRequestsDropBar";
import IncomingFriendRequest from "./Componants/IncomingFriendRequest";
import CheckMarkIcon from "../../../Componants/CheckMarkIcon";
import AllFriendsDropBar from "./Componants/AllFriendsDropBar";
function Friends() {
  const {
    handleSendFriendRequest,
    userFriendRequests,
    handleSearchFriend,
    selectedSearchFriend,
    user,
  } = useFriends();
  const [friendInput, setFriendInput] = useState("");
  const [userFriends, setUserFriends] = useState<User[]>([]);
  const activeClassName =
    "underline decoration-indigo-400 font-semibold decoration-4 underline-offset-4";
  const activeClassNameSpecial =
    "text-xl decoration-indigo-400 decoration-4 font-medium underline-offset-4 underline";
  // const [friendsList, setFriendsList] = useState<IFriendRequest[]>(
  //   userFriendRequests.accepted
  // );
  useEffect(() => {
    getAccounts()
      .then((response) => response.json())
      .then((json) => {
        setUserFriends(json);
      })
      .catch((err) => console.log(err));
  }, []);
  const isBtnDisabled = selectedSearchFriend ? false : true;
  return (
    <div className="container bg-white rounded-2xl p-4 shadow-lg sm:p-6 mb-4 mx-auto flex flex-col items-center content-container">
      <nav>
        <div className="flex justify-around py-2 text-base">
          <NavLink
            to="incoming"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Pending
          </NavLink>
          <NavLink
            to="all"
            style={{ width: 100, textAlign: "center" }}
            // style={{ fontSize: "1.25rem" }}
            className={({ isActive }) =>
              isActive ? activeClassNameSpecial : "text-lg font-medium"
            }
          >
            All
          </NavLink>
          <NavLink
            to="sent"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Search
          </NavLink>
        </div>
      </nav>

      <Outlet context={{ userFriends }} />

      {/* {userFriendRequests.pending && (
        <FriendRequestsDropBar
          array={userFriendRequests.pending}
          label={`(${userFriendRequests.pending.length}) Friend Requests`}
        />
      )} */}
      {/* <form className="flex flex-col items-center " action="">
        <h1 className="text-xl font-semibold my-2">Search for Friends</h1>
        <UserInput
          setInput={setFriendInput}
          name="sendFriendRequestInput"
          type="text"
          id="sendFriendRequestInput"
          label="Enter Username (i.e user1)"
        />
        {selectedSearchFriend && (
          <div className="flex">
            <CheckMarkIcon />
            <h1>{`${selectedSearchFriend.userName} `}</h1>
          </div>
        )}
        <div className="flex">
          <Button
            btnType="submit"
            label="Search"
            handleClick={(e) => handleSearchFriend(e, friendInput)}
            disabled={false}
          />
          <Button
            btnType="submit"
            label="Send Request"
            handleClick={(e) => handleSendFriendRequest(e)}
            disabled={isBtnDisabled}
          />
        </div>
      </form> */}
      {/* <AllFriendsDropBar
        array={userFriendRequests.accepted}
        label={`(${userFriendRequests.accepted.length}) All`}
      /> */}
      {/* <FriendRequestsDropBar
        array={userFriendRequests.pending}
        label={`(${userFriendRequests.pending.length}) Pending`}
      /> */}
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
  userFriends: User[];
};
export function useUserFriends() {
  return useOutletContext<ContextFriends>();
}
export default Friends;
