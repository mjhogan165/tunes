import React from "react";
import { API } from "../constants";
import { IFriendRequest } from "../providers/friends-provider";

function patchFriendRequest(newStatus: string, { id }: IFriendRequest) {
  return fetch(API + `friendRequests/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: newStatus,
    }),
  });
}

export default patchFriendRequest;
