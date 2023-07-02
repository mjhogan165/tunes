import React from "react";
import { SPOT_BASE } from "../constants";

export function searchTrack(input: string, token: string) {
  console.log("searchTrack()");
  console.log({
    searchtoken: token,
    searchTrackFunction: "called",
    input: input,
  });

  return fetch(SPOT_BASE + `search?q=${input}&type=track&limit=5`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}
