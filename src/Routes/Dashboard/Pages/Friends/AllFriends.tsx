import React from "react";
import { useFriends } from "../../../../providers/friends-provider";
import { User } from "../../../../Interfaces/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
export default function AllFriendsList() {
  const { userFriendAccounts } = useFriends();
  return (
    <div className="flex w-full flex-col">
      {userFriendAccounts.map((array: User, index: number) => {
        return (
          <div
            className="flex justify-around p-2 border-b-2 items-center"
            key={index}
          >
            <img
              className="w-14 h-14 object-cover overflow-hidden rounded-full"
              src={array.profileImg}
            />
            <div className="flex items-center justify-center">
              <div className="w-min h-min">{array.userName}</div>
            </div>
            <FontAwesomeIcon icon={faCircleCheck} className="text-green-600" />
          </div>
        );
      })}
    </div>
  );
}
