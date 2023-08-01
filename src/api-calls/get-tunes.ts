import { API } from "../constants";

export async function getTunes() {
  return fetch(API + "tunes", {
    method: "GET",
  });
}
