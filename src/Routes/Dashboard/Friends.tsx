import React from "react";
import { useState, useEffect } from "react";
import UserInput from "../../Componants/UserInput";
import Button from "../../Componants/Button";
import { IFriendRequest, useFriends } from "../../providers/friends-provider";
import { getAccounts } from "../../api-calls/get-accounts";
import { useRequiredUser } from "../../providers/auth-provider";
import { User } from "../../Interfaces/forms";
import FriendRequest from "../../Componants/FriendRequest";
import { getFriendRequests } from "../../api-calls/get-friend-requests";
import { IFriendRequestsSorted } from "../../providers/friends-provider";
import { NavLink } from "react-router-dom";
import { toggle } from "../../functions";
import FriendsDropBar from "../../Componants/FriendsDropBar";

function Friends() {
  const { handleSendFriendRequest, allFriendRequests } = useFriends();
  const [friendInput, setFriendInput] = useState("");
  const [friends, setFriends] = useState<IFriendRequest[] | null>(null);
  const [showIncomingRequests, setShowIncomingRequests] = useState(false);
  const [showFriendsListSubMenu, setShowFriendsListSubMenu] = useState(false);
  const user = useRequiredUser();
  let accepted;
  if (allFriendRequests) {
    accepted = allFriendRequests.accepted;
  }

  return (
    <div className="rounded-lg bg-transparent container shadow-sm mx-auto border-2 flex flex-col items-center border-transparent max-w-full py-4 gap-6 font-normal">
      {allFriendRequests && (
        <FriendsDropBar
          toggleValue={showFriendsListSubMenu}
          setToggle={setShowFriendsListSubMenu}
          array={accepted as IFriendRequest[]}
        />
      )}
      {/* <div className="bg-white rounded-2xl w-full p-2 shadow-lg sm:p-6 mb-4">
        <div className="flex justify-between items-center">
          {" "}
          <h1 className="text-xl font-semibold my-4">Friends</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 inline-block"
            onClick={() =>
              setShowFriendsListSubMenu(toggle(showFriendsListSubMenu))
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        {showFriendsListSubMenu && (
          <div>
            {allFriendRequests?.accepted.map((request, index) => {
              console.log("map");
              return <div key={index}>{returnFriend(request, user)}</div>;
            })}
          </div>
        )}
      </div> */}
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
      {allFriendRequests?.pending && (
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
      )}
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
