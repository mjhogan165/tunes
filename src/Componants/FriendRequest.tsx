import React from "react";
import { IFriendRequest } from "../providers/friends-provider";
import { returnFriend } from "../Routes/Dashboard/Friends";
import Button from "./Button";
import { useRequiredUser } from "../providers/auth-provider";

type FriendRequestProps = {
  request: IFriendRequest;
};

function FriendRequest({
  request: { status, sender, reciever },
}: FriendRequestProps) {
  const user = useRequiredUser();
  return (
    <div className="rounded-lg bg-white container shadow-sm mx-auto my-6 border-2 flex flex-col border-transparent max-w-lg p-6 gap-6 font-normal">
      <h1>{`${sender} wants to be your friend`}</h1>
      {/* status: {status}
      sender: {sender}
      reciever: {reciever} */}
      <div className="flex">
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
    </div>
  );
}

export default FriendRequest;
