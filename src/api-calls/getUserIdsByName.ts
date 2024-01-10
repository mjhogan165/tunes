import React from "react";
import { API } from "../constants";
import { User } from "../Interfaces/user";
export default async function getUserIdsByName(
  usernames: string[]
): Promise<any> {
  const arr: number[] = [];
  return await fetch(API + "userIdsByName", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usernames: usernames,
    }),
  });
}
