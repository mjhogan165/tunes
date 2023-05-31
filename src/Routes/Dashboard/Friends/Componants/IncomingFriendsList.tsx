import React from "react";
import { useFriends } from "../../../../providers/friends-provider";

export default function IncomingFriendsList() {
  const { userFriendRequests } = useFriends();
  return (
    <div>
      {userFriendRequests.pending.length > 0 && (
        <h1 className="w-max">{`You have ${userFriendRequests.pending.length} Friend Request(s)!`}</h1>
      )}
    </div>
  );
}
