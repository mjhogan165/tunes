import React from "react";
import { useState, useEffect } from "react";
import UserInput from "../../../Componants/UserInput";
import Button from "../../../Componants/Button";
import {
  IFriendRequest,
  useFriends,
} from "../../../providers/friends-provider";
import { getAccounts } from "../../../api-calls/get-accounts";
import { useRequiredUser } from "../../../providers/auth-provider";
import { User } from "../../../Interfaces/forms";
import { IUserFriendRequests } from "../../../providers/friends-provider";
import { NavLink } from "react-router-dom";
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
  // const [friendsList, setFriendsList] = useState<IFriendRequest[]>(
  //   userFriendRequests.accepted
  // );

  const isBtnDisabled = selectedSearchFriend ? false : true;
  return (
    <div className="container bg-white rounded-2xl p-2 shadow-lg sm:p-6 mb-4 mx-auto flex flex-col items-center content-container">
      {userFriendRequests.pending.length > 0 && (
        <h1 className="w-max">{`You have ${userFriendRequests.pending.length} Friend Request(s)!`}</h1>
      )}
      {userFriendRequests.pending && (
        <FriendRequestsDropBar
          array={userFriendRequests.pending}
          label={`(${userFriendRequests.pending.length}) Friend Requests`}
        />
      )}
      <form className="flex flex-col items-center " action="">
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
      </form>
      <AllFriendsDropBar
        array={userFriendRequests.accepted}
        label={`(${userFriendRequests.accepted.length}) All`}
      />
      <FriendRequestsDropBar
        array={userFriendRequests.pending}
        label={`(${userFriendRequests.pending.length}) Pending`}
      />
    </div>
  );
}
export function returnFriend(friendRequest: IFriendRequest, currentUser: User) {
  return friendRequest.sender.toLowerCase() ===
    currentUser.userName.toLowerCase()
    ? friendRequest.reciever
    : friendRequest.sender;
}

export default Friends;
