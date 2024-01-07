import React from "react";
import { API } from "../constants";
import { User } from "../Interfaces/user";
export default async function getUserByName(username: string): Promise<any> {
  return fetch(API + "userByName", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  });
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log({ taggedUser: tagUser });
  //       //   if (res.body) {
  //       //     return res.body;
  //       //   }
  //     });
}
