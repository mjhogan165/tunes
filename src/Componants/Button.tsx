import React from "react";
type Button = {
    btnType: "button" | "submit" | "reset",
    label: string,
}
function Button({  btnType , label}: Button) {
  return (
    <button
      className="bg-indigo-400 border-2 rounded-md p-2 my-4 w-40 text-center"
      type={btnType}
    >
      {label}
    </button>
  );
}

export default Button;
