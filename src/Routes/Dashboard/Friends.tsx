import React from "react";
import { useState, useEffect } from "react";
import UserInput from "../../Componants/UserInput";
import Button from "../../Componants/Button";
import { useFriends } from "../../providers/friends-provider";
import { getAccounts } from "../../api-calls/get-accounts";
import { useAuth } from "../../providers/auth-provider";
import { User } from "../../Interfaces/forms";
import FriendRequest from "../../Componants/FriendRequest";
function Friends() {
  const { user } = useAuth();

  const { handleSendFriendRequest } = useFriends();
  const [friendInput, setFriendInput] = useState("");
  let loggedUser = {} as User;
  if (user) {
    loggedUser = user;
  }
  ///////// if (!user) {
  //   throw new Error("not logged in");
  // }
  useEffect(() => {
    getAccounts()
      .then((response) => response.json())
      .then((accounts) => {
        for (const acc of accounts) {
          if (Object.keys(acc).includes(loggedUser.userName)) {
            console.log("sdfdsd");
          }
          ///////// if (Object.keys(acc).includes(loggedUser.userName)) {
          //   console.log("sdfdsd");
          // }
        }
      });
  }, []);

  return (
    <div className="rounded-lg bg-white container shadow-sm mx-auto my-6 border-2 flex items-left border-transparent max-w-lg p-6 gap-6 font-normal">
      <div>
        <h1 className="text-xl font-semibold my-4">Friends</h1>
        <ul>
          <li>friend1</li>
          <li>friend2</li>
          <li>friend3</li>
        </ul>
      </div>
      {/* {incomingRequest && <FriendRequest />} */}
      <form action="">
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
    </div>
  );
}

export default Friends;
