import React from "react";
import { NewUserInputProps } from "../Interfaces/forms";

function Input({ type, name, id, label, setState, setStateProperty }: NewUserInputProps) {
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
        onChange={(e) => setState(prevState => ({
            ...prevState,
            [setStateProperty]: e.target.value
        })) }
      />
    </div>
  );
}

export default Input;