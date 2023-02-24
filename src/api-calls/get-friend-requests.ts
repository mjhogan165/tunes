import { API } from "../constants";

export const getFriendRequests = function () {
  return fetch(API + "friendRequests", {
    method: "GET",
  });
};
