import React from "react";
import { API } from "../constants";
import { IFriendRequest } from "../providers/friends-provider";

function sendFriendRequest({ sender, reciever, status }: IFriendRequest) {
  // return fetch(API + "friendRequests", {
  //   method: "POST",
  // headers: {
  //   ["Content-Type"]: "application/json",
  // },
  // body: JSON.stringify({
  // sender: sender,
  // reciever: reciever,
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
      reciever: reciever,
      status: status,
    }),
  });
}

export default sendFriendRequest;
