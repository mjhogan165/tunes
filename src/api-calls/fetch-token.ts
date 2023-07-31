import React from "react";
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;
// const client_id = "e9b1abef9cd84cecb883434c4d6de44b";
// const client_secret = "e0f968f004f54c22ad052f3e3a634326";
// const url = "https://accounts.spotify.com/api/token";
//const redirect_uri = "http://localhost:5173/Home/Redirect";
const client_id = import.meta.env.VITE_CLIENT_ID;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;
const url = import.meta.env.VITE_URL;

const buf = Buffer.from(client_id + ":" + client_secret).toString("base64");
console.log(buf);

const params = new URLSearchParams({
  grant_type: "client_credentials",
});
// const headers = new Headers({
//   Authorization:
//     "Basic " + Buffer.from(client_id + ":" + client_secret).toString(),
// });

function fetchToken(retriesAttempted = 0): Promise<any> {
  console.log(`FetchToken() Attempt: ${retriesAttempted} with params`);
  if (retriesAttempted > 3) {
    throw new Error("too many attempts");
  }
  return fetch(url, {
    method: "POST",
    headers: { Authorization: "Basic " + buf },
    body: params,
  });
}

export default fetchToken;
