import React from "react";
import AllFriendsDropBar from "./AllFriendsDropBar";
import { useFriends } from "../../../../providers/friends-provider";
import { useOutletContext } from "react-router-dom";
import { User } from "../../../../Interfaces/forms";
import { useUserFriends } from "../Friends";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
export default function AllFriendsList() {
  const {
    handleSendFriendRequest,
    userFriendRequests,
    handleSearchFriend,
    selectedSearchFriend,
    user,
  } = useFriends();
  const { userFriends } = useUserFriends();

  return (
    <div className="flex w-full flex-col">
      {userFriends.map((array: User, index: number) => {
        return (
          <div className="flex justify-around p-2 border-b-2" key={index}>
            <img
              className="w-14 h-14 object-cover overflow-hidden rounded-full"
              src={array.profileImg}
            />
            <div className="flex items-center justify-center">
              <div className="w-min h-min">{array.userName}</div>
            </div>
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
        );
      })}
    </div>
  );
}
