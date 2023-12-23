import React from "react";
import { API } from "../constants";
export default function getUsers() {
  return fetch(API + "users", {
    method: "GET",
  });
}
