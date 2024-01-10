import React from "react";
import { API } from "../constants";
import { IFriendRequest } from "../providers/friends-provider";

function sendFriendRequest(request: IFriendRequest) {
  return fetch(API + "friendRequest/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      senderId: request.senderId,
      receiverId: request.receiverId,
      status: request.status,
    }),
  });
}

export default sendFriendRequest;
