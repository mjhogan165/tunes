import { API } from "../constants";

export const getAccounts = function () {
  return fetch(API + "accounts", {
    method: "GET",
  });
};
