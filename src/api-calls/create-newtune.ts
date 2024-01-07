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
  tagged,
}: INewTune) {
  console.log({
    newTune: {
      // id: id,
      comment: comment,
      createdBy: createdBy,
      artist: artist,
      title: title,
      tagged: tagged,
    },
  });
  return fetch(API + "newTune", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      artist: artist,
      title: title,
      comment: comment,
      createdBy: createdBy,
      img: img,
      tagged: tagged,
    }),
  });
}

export default createNewTune;
