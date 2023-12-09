import { API } from "../constants";
import { CreateUser } from "../Interfaces/user";

export const createAccount = function ({
  createUsername,
  confirmPassword,
}: CreateUser) {
  return fetch(API + "users", {
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
