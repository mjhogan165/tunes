import React from "react";
import { IFriendRequest } from "../../../../providers/friends-provider";
import { returnFriend } from "../Friends";
import Button from "../../../../Componants/Button";
import { useRequiredUser } from "../../../../providers/auth-provider";
import { useFriends } from "../../../../providers/friends-provider";
import patchFriendRequest from "../../../../api-calls/patch-friend-request";

type FriendRequestProps = {
  request: IFriendRequest;
};

function IncomingFriendRequest({ request }: FriendRequestProps) {
  const user = useRequiredUser();
  const id = request.id;
  const { handleRequestResponse } = useFriends();
  console.log({ request: request });
  return (
    <div>
      <div className="rounded-lg bg-white container shadow-sm mx-auto text-center mb-4 border-2 flex flex-col border-transparent max-w-lg p-6 gap-6 font-normal">
        <h1>{`${request.sender} wants to be your friend`}</h1>
        <div className="flex">
          <Button
            btnType={"submit"}
            label={"Accept"}
            handleClick={() => handleRequestResponse("accepted", request)}
          />
          <Button
            btnType={"submit"}
            label={"Reject"}
            handleClick={() => console.log("void")}
          />
        </div>
      </div>
    </div>
  );
}

export default IncomingFriendRequest;
