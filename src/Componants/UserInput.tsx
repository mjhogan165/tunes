import React from "react";
import { UserInputProps } from "../Interfaces/forms";

function UserInput({ type, name, id, label, setInput }: UserInputProps) {
  return (
    <div className="flex flex-col gap-2 items-start my-2">
      <label className="max-w-max" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="border-2 p-1 flex-auto"
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}

export default UserInput;
