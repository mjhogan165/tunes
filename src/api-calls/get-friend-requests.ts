import { API } from "../constants";

export const getAllFriendRequests = function () {
  return fetch(API + "friendRequests", {
    method: "GET",
  });
};
