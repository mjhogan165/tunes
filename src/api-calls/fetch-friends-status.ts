import { API } from "../constants";

export const fetchStatusFriends = function (id: number, status: string) {
  return fetch(API + `friendRequest/` + status, {
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
