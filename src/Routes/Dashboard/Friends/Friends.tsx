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
import FriendsDropBar from "./Componants/FriendsDropBar";
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
  const [friendsList, setFriendsList] = useState<IFriendRequest[]>(
    userFriendRequests.accepted
  );
  const [showIncomingRequests, setShowIncomingRequests] = useState(false);
  const isDisabled = selectedSearchFriend ? false : true;
  return (
    <div className="container bg-white rounded-2xl p-2 shadow-lg sm:p-6 mb-4 mx-auto flex flex-col items-center content-container">
      {userFriendRequests.pending && (
        <h1 className="w-max">{`You have ${userFriendRequests.pending.length} Friend Request(s)!`}</h1>
      )}
      {userFriendRequests.pending && (
        <FriendsDropBar
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
            <h1>{`${friendInput} `}</h1>
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
            disabled={isDisabled}
          />
        </div>
      </form>
      <AllFriendsDropBar
        array={userFriendRequests.accepted}
        label={`(${userFriendRequests.accepted.length}) All`}
      />
      <FriendsDropBar
        array={userFriendRequests.pending}
        label={`(${userFriendRequests.pending.length}) Pending`}
      />
      {/* {userFriendRequests && (
        <div>
          <h1>Your Friends:</h1>
          {userFriendRequests.accepted.map((request, index) => {
            return <div key={index}>{returnFriend(request, user)}</div>;
          })}
        </div>
      )} */}

      {/* {allFriendRequests?.pending && (
        <div className="flex flex-col items-center">
          <h1 className="w-max">{`You have ${allFriendRequests.pending.length} Friend Request(s)`}</h1>
          <Button
            btnType="button"
            label={"Click Here"}
            handleClick={() => setShowIncomingRequests(true)}
          />
          {showIncomingRequests && (
            <div className="">
              {allFriendRequests?.pending.map((request, index) => {
                return <FriendRequest key={index} request={request} />;
              })}
            </div>
          )}
        </div>
      )} */}
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
