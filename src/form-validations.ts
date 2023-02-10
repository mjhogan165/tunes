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
