import { API } from "../constants";

export const getSongs = () => {
  return fetch(API + "songs", {
    method: "GET",
  });
};
