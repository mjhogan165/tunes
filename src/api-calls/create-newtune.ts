import React from "react";
import { API } from "../constants";
import { INewTune } from "../Interfaces/feed";

function createNewTune({
  id,
  comment,
  createdBy,
  img,
  artist,
  title,
}: INewTune) {
  // const {artist, title} = tuneObj
  return fetch(API + "tunes", {
    method: "POST",
    headers: {
      ["Content-Type"]: "application/json",
    },
    body: JSON.stringify({
      id: id,
      artist: artist,
      title: title,
      comment: comment,
      createdBy: createdBy,
      img: img,
    }),
  });
}

export default createNewTune;
