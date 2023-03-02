import { getAccounts } from "./api-calls/get-accounts";
export const findExsistingUser = (
  userNameInput: string,
  passwordInput: string,
  account: any
): boolean => {
  if (
    account.user_name.toLowerCase() === userNameInput.toLowerCase() &&
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
        if (elm.userName === input) {
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
