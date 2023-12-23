import { API } from "../constants";

export const fetchUsernameFriends = function (
  username: string,
  status: string
) {
  return fetch(API + `friendRequest/` + status, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      status: status,
    }),
  });
};
