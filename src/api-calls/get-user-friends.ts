import { API } from "../constants";

export const getUserFriendRequests = function (status: string) {
  return fetch(API + "friendRequest/" + status, {
    method: "GET",
  });
};
