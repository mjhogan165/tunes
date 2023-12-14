import React, { useEffect, useState } from "react";
import {
  IFriendRequest,
  useFriends,
} from "../../../../providers/friends-provider";
import { User } from "../../../../Interfaces/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { fetchStatusFriends } from "../../../../api-calls/fetch-friends-status";
import { useAuth } from "../../../../providers/auth-provider";
import { useRequiredUser } from "../../../../providers/auth-provider";

export default function AllFriendsList() {
  // const { userFriendRequests } = useFriends();
  // const acceptedFriends = userFriendRequests.accepted;
  const [acceptedFriends, setAcceptedFriends] = useState<User[]>();

  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      fetchStatusFriends(user.id, "accepted")
        .then((res) => res.json())
        .then((data) => {
          const accepted: User[] = [];
          for (const request of data) {
            console.log(request.senderId);
            if (request.senderId === user.id) {
              accepted.push(request.receiver);
            } else {
              accepted.push(request.sender);
            }
          }
          setAcceptedFriends(accepted);
        });
    }
  }, []);
  console.log({ acceptedFriends: acceptedFriends });
  if (acceptedFriends) {
    return (
      <div className="flex w-full flex-col">
        {acceptedFriends.map((request: User, index: number) => {
          return (
            <div
              className="flex justify-around p-2 border-b-2 items-center"
              key={index}
            >
              {request.profileImg && (
                <img
                  className="w-14 h-14 object-cover overflow-hidden rounded-full"
                  src={request.profileImg}
                />
              )}
              <div className="flex items-center justify-center">
                <div className="w-min h-min">{request.username}</div>
              </div>
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-green-600"
              />
            </div>
          );
        })}
      </div>
    );
  } else return <div>go make some friends!</div>;
}
