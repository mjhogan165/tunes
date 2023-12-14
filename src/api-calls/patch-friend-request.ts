import React from "react";
import { API } from "../constants";
import { IFriendRequest } from "../providers/friends-provider";

export const patchStatusFriends = function (
  requestId: number,
  fromStatus: string,
  newStatus: string
) {
  return fetch(API + `friendRequest/` + fromStatus, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: requestId,
      status: newStatus,
    }),
  });
};
