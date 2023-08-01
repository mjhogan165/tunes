import React from "react";
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;
const client_id = import.meta.env.VITE_CLIENT_ID;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;
const url = import.meta.env.VITE_URL;

const buf = Buffer.from(client_id + ":" + client_secret).toString("base64");

const params = new URLSearchParams({
  grant_type: "client_credentials",
});
function fetchToken(): Promise<any> {
  return fetch(url, {
    method: "POST",
    headers: { Authorization: "Basic " + buf },
    body: params,
  });
}

export default fetchToken;
