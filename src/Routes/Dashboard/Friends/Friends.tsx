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
import FriendsSubMenu from "./Componants/FriendsSubMenu";
import IncomingFriendRequest from "./Componants/IncomingFriendRequest";
function Friends() {
  const { handleSendFriendRequest, userFriendRequests } = useFriends();
  const [friendInput, setFriendInput] = useState("");
  const [friendsList, setFriendsList] = useState<IFriendRequest[]>([]);
  const [showIncomingRequests, setShowIncomingRequests] = useState(false);
  const user = useRequiredUser();
  console.log({ allComponent: userFriendRequests });

  // setFriendsList(userFriendRequests.accepted);
  // const userFriendsList = userFriendRequests.accepted;
  return (
    <div className="rounded-lg bg-transparent container shadow-sm mx-auto border-2 flex flex-col items-center border-transparent max-w-full py-4 gap-6 font-normal content-container">
      {userFriendRequests?.pending && (
        <h1 className="w-max">{`You have ${userFriendRequests.pending.length} Friend Request(s)!`}</h1>
      )}
      {userFriendRequests.pending && (
        <FriendsDropBar
          array={userFriendRequests.pending}
          label={`(${userFriendRequests.pending.length}) Friend Requests`}
        />
      )}
      {userFriendRequests && (
        <div>
          <h1>Your Friends:</h1>
          {userFriendRequests.accepted.map((request, index) => {
            return <div key={index}>{returnFriend(request, user)}</div>;
          })}
        </div>
      )}
      <form className="flex flex-col " action="">
        <h1 className="text-xl font-semibold my-4">Send Friend Request</h1>
        <UserInput
          setInput={setFriendInput}
          name="sendFriendRequestInput"
          type="text"
          id="sendFriendRequestInput"
          label="Enter Username (i.e user1)"
        />
        <button
          onClick={(e) => handleSendFriendRequest(e, friendInput)}
        ></button>
        <Button
          btnType="submit"
          label="Find Friend"
          handleClick={(e) => handleSendFriendRequest(e, friendInput)}
        />
      </form>
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
