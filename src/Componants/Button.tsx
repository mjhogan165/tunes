import React from "react";
type Button = {
  btnType: "button" | "submit" | "reset";
  label: string;
  handleClick: (e: React.SyntheticEvent, id?: number) => void;
  disabled: boolean;
};
function Button({ btnType, label, handleClick, disabled }: Button) {
  const fontColor = disabled ? "text-[#00000054]" : "";
  const bgColor = disabled ? "bg-[#818cf89e]" : "bg-indigo-400";
  return (
    <button
      className={`${fontColor} ${bgColor} border-2 rounded-md p-2 my-4 w-40 text-center self-center box-border`}
      type={btnType}
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
