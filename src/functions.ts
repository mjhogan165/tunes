import { getAccounts } from "./api-calls/get-accounts";
import moment from "moment";
export const findExsistingUser = (
  usernameInput: string,
  passwordInput: string,
  account: any
): boolean => {
  if (
    account.user_name.toLowerCase() === usernameInput.toLowerCase() &&
    account.password.toLowerCase() === passwordInput.toLowerCase()
  ) {
    return true;
  } else return false;
};

export function handleErrors(response: unknown) {
  type response = {
    ok: boolean;
    statusText: string;
  };
  (response: response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  };
}

export async function findFriend(input: string) {
  return getAccounts()
    .then((response) => response.json())
    .then((json) => {
      let match;
      for (const elm of json) {
        if (elm.username === input) {
          return elm;
        }
      }
      if (!match) {
        return null;
      }
    })
    .catch((err) => console.log(err));
}

export function toggle(bool: boolean) {
  return !bool;
}
export const isValidInput = (input: string) => {
  return input.trim().length > 0;
};

export const checkRefresh = (timeFetchedStr: string) => {
  const now = moment();
  const timeFetchedObj = moment(timeFetchedStr);
  const hourLater = moment(timeFetchedObj).add(1, "hours");
  return moment(now).isAfter(hourLater);
};
