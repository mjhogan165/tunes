import { API } from "../constants";

export async function getTunes() {
  return fetch(API + "newTunes", {
    method: "GET",
  });
}
