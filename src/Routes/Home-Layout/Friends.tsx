import React from "react";
import { useState } from "react";
import UserInput from "../../Componants/UserInput";
import Button from "../../Componants/Button";
import { useFriends } from "../../providers/friends-provider";
function Friends() {
  const { handleSendFriendRequest } = useFriends();
  const [friendInput, setFriendInput] = useState("");
  return (
    <div>
      <h1 className="text-xl font-semibold my-4">Friends List</h1>
      <ul>
        <li>friend1</li>
        <li>friend2</li>
        <li>friend3</li>
      </ul>
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
