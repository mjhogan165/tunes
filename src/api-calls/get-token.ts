import React from "react";
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;
const client_id = "e9b1abef9cd84cecb883434c4d6de44b";
const redirect_uri = "http://localhost:5173/Home/Redirect";
const client_secret = "e0f968f004f54c22ad052f3e3a634326";
const url = "https://accounts.spotify.com/api/token";

// const params = new URLSearchParams({
//   grant_type: "client_credentials",
//   client_id: client_id,
//   client_secret: client_secret,
// });

// function getToken() {
//   console.log("GET TOKEN() with params");
//   return fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: params,
//   });
// }

//using the CLient Credentials Flow

const buf = Buffer.from(client_id + ":" + client_secret).toString("base64");
console.log(buf);

const params = new URLSearchParams({
  grant_type: "client_credentials",
});
// const headers = new Headers({
//   Authorization:
//     "Basic " + Buffer.from(client_id + ":" + client_secret).toString(),
// });

function getToken() {
  console.log("GET TOKEN() with params");
  return fetch(url, {
    method: "POST",
    headers: { Authorization: "Basic " + buf },
    body: params,
  });
}

export default getToken;
