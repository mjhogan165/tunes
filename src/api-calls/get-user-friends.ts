import { API } from "../constants";

export const getUserFriendRequests = function (id: number) {
  return fetch(API + "friendRequest/" + id, {
    method: "GET",
  });
};
