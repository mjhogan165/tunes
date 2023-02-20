import React from "react";
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;
const client_id = "e9b1abef9cd84cecb883434c4d6de44b";
const redirect_uri = "http://localhost:5173/Home/Redirect";
const client_secret = "e0f968f004f54c22ad052f3e3a634326";
const url = "https://accounts.spotify.com/api/token";

function getToken() {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      client_id +
      "&client_secret=" +
      client_secret,
  });
}

export default getToken;
