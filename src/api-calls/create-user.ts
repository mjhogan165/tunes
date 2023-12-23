import { API } from "../constants";
import { CreateUser } from "../Interfaces/user";

export const createNewUser = function ({
  createUsername,
  confirmPassword,
}: CreateUser) {
  return fetch(API + "user/create", {
    method: "POST",
    headers: {
      ["Content-Type"]: "application/json",
    },
    body: JSON.stringify({
      username: createUsername,
      password: confirmPassword,
    }),
  });
};
