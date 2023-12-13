import { API } from "../constants";

export const fetchStatusFriends = function (id: number, status: string) {
  return fetch(API + `friendRequests/${id}/accepted`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      status: status,
    }),
  });
};
