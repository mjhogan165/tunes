import React from "react";
import { SPOT_BASE } from "../constants";

export const fetchTrack = async (
  input: string,
  token: string
): Promise<any> => {
  console.log("fetchTrack()");
  return fetch(SPOT_BASE + `search?q=${input}&type=track&limit=5`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};
