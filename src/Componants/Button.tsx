import React from "react";
type Button = {
  btnType: "button" | "submit" | "reset";
  label: string;
  handleClick: (e: React.SyntheticEvent) => void;
};
function Button({ btnType, label, handleClick }: Button) {
  return (
    <button
      className="bg-indigo-400 border-2 rounded-md p-2 my-4 w-40 text-center self-center box-border"
      type={btnType}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

export default Button;
