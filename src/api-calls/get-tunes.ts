import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { API } from "../constants";

export async function getTunes() {
  return fetch(API + "tunes", {
    method: "GET",
  });
  //   .then((response) => {
  //   if (!response.ok) {
  //     throw new Response("Bad Request", { status: 400 });
  //   } else return response.json();
  // });
}
