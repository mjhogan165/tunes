import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { API } from "../constants";

export async function getTunes() {
  return fetch(API + "tunes", {
    method: "GET",
  });
}
