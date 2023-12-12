import { API } from "../constants";

export const getUser = function (username: string): Promise<any> {
  return fetch(API + "user/" + username, {
    method: "GET",
  });
};
