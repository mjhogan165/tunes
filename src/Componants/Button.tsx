import React from "react";
import { NewUser } from "../Interfaces/forms";
type Button = {
  btnType: "button" | "submit" | "reset";
  label: string;
  handleClick: (e: React.SyntheticEvent, newUser?: NewUser) => void;
};
function Button({ btnType, label, handleClick }: Button) {
  return (
    <button
      className="bg-indigo-400 border-2 rounded-md p-2 my-4 w-40 text-center"
      type={btnType}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

export default Button;
