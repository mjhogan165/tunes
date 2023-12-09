import { API } from "../constants";

export const getAccounts = function () {
  return fetch(API + "users", {
    method: "GET",
  });
};
