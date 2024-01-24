import { API } from "../constants";

export async function getUsernameById(id: number) {
  return fetch(API + `user/${id}`, {
    method: "GET",
  });
}
