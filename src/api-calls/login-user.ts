import { API } from "../constants";

export const loginUser = function (username: string, password: string) {
  return fetch(API + "user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
};
