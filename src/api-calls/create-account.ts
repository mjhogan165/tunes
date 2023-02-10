import { API } from "../constants";
import { CreateUser } from "../Interfaces/forms";

export const createAccount = function ({
  createUserName,
  confirmPassword,
}: CreateUser) {
  return fetch(API + "accounts", {
    method: "POST",
    headers: {
      ["Content-Type"]: "application/json",
    },
    body: JSON.stringify({
      userName: createUserName,
      password: confirmPassword,
    }),
  });
};
