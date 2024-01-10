import React, { useState, useEffect } from "react";
import UserInput from "../../../../Componants/UserInput";
import { useFriends } from "../../../../providers/friends-provider";
import CheckMarkIcon from "../../../../Componants/CheckMarkIcon";
import Button from "../../../../Componants/Button";
import { fetchStatusFriends } from "../../../../api-calls/fetch-friends-status";
import { fetchUsernameFriends } from "../../../../api-calls/fetch-username-friends";
export default function SearchFriend() {
  const [friendInput, setFriendInput] = useState("");
  const {
    handleSearchFriend,
    selectedSearchFriend,
    handleSendFriendRequest,
    isSendBtnDisabled,
  } = useFriends();
  return (
    <div>
      {" "}
      <form className="flex flex-col items-center " action="">
        <h1 className="text-xl font-semibold my-2">Search for Friends</h1>
        <UserInput
          setInput={setFriendInput}
          name="sendFriendRequestInput"
          type="text"
          input={friendInput}
          id="sendFriendRequestInput"
          label="Enter Username (i.e user1)"
        />
        {selectedSearchFriend && (
          <div className="flex">
            <CheckMarkIcon />
            <h1>{`${selectedSearchFriend.username} `}</h1>
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
            disabled={isSendBtnDisabled}
          />
        </div>
      </form>
    </div>
  );
}
