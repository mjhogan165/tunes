import React from "react";
import { IFriendRequest } from "../providers/friends-provider";
import Button from "./Button";

function FriendRequest({ status, sender, reciever }: IFriendRequest) {
  return (
    <div className="rounded-lg bg-white container shadow-sm mx-auto my-6 border-2 flex items-left border-transparent max-w-lg p-6 gap-6 font-normal">
      {"someUser wants to be your friend"}
      status: {status}
      sender: {sender}
      status: {reciever}
      <Button
        btnType={"submit"}
        label={"Accept"}
        handleClick={() => console.log("void")}
      />
      <Button
        btnType={"submit"}
        label={"Reject"}
        handleClick={() => console.log("void")}
      />
    </div>
  );
}

export default FriendRequest;
