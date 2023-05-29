import React from "react";
import { API } from "../constants";
import { IFriendRequest } from "../providers/friends-provider";

function sendFriendRequest({ sender, receiver, status }: IFriendRequest) {
  // return fetch(API + "friendRequests", {
  //   method: "POST",
  // headers: {
  //   ["Content-Type"]: "application/json",
  // },
  // body: JSON.stringify({
  // sender: sender,
  // receiver: receiver,
  // status: status,
  //   }),
  // });
  return fetch(API + "friendRequests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: sender,
      receiver: receiver,
      status: status,
    }),
  });
}

export default sendFriendRequest;
