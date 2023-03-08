import React from "react";
import { useRequiredUser } from "../../../../providers/auth-provider";
import { useFriends } from "../../../../providers/friends-provider";
import { returnFriend } from "../Friends";

function FriendsSubMenu() {
  const { allFriendRequests } = useFriends();
  const user = useRequiredUser();
  return (
    <div>
      {allFriendRequests?.accepted.map((request, index) => {
        console.log("map");
        return <div key={index}>{returnFriend(request, user)}</div>;
      })}
    </div>
  );
}

export default FriendsSubMenu;
