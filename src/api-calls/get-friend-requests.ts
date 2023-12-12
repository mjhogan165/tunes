import { API } from "../constants";

export const getAllFriendRequests = function () {
  return fetch(API + "friendRequest", {
    method: "GET",
  });
};
