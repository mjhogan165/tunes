import React from "react";
import { API } from "../constants";
import { IFriendRequest } from "../providers/friends-provider";

function sendFriendRequest(request: IFriendRequest) {
  return fetch(API + "friendRequests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: request.sender,
      receiver: request.receiver,
      status: request.status,
    }),
  });
}

export default sendFriendRequest;
