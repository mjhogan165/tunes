import { API } from "../constants";

export async function getTunes() {
  return fetch(API + "newTune", {
    method: "GET",
  });
}
