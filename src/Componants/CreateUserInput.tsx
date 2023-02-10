import React from "react";
import { CreateUserInputProps } from "../Interfaces/forms";

function CreateUserInput({
  type,
  name,
  id,
  label,
  setState,
  setStateProperty,
}: CreateUserInputProps) {
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
        onChange={(e) =>
          setState((prevState) => ({
            ...prevState,
            [setStateProperty]: e.target.value,
          }))
        }
      />
    </div>
  );
}

export default CreateUserInput;
