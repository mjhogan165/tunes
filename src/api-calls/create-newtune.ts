import React from "react";
import { API } from "../constants";
import { INewTune } from "../Interfaces/feed";

function createNewTune({
  comment,
  createdById,
  createdBy,
  img,
  artist,
  title,
  taggedUserIds,
}: INewTune) {
  return fetch(API + "newTune", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // id: id,
      artist: artist,
      title: title,
      comment: comment,
      createdById: createdById,
      createdBy: createdBy,
      img: img,
      taggedUserIds: taggedUserIds,
    }),
  });
}

export default createNewTune;
