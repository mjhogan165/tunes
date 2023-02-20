import { API } from "../constants";

export const getTunes = () => {
  return fetch(API + "tunes", {
    method: "GET",
  });
};
