import React from "react";
import { API } from "../constants";
import { User } from "../Interfaces/user";
export default async function getUserTaggedTunes(userId: number): Promise<any> {
  return fetch(API + `newTune/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
    }),
  });
}
