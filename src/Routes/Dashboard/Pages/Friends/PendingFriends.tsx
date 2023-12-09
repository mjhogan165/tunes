import React from "react";
import {
  IFriendRequest,
  useFriends,
} from "../../../../providers/friends-provider";
import Button from "../../../../Componants/Button";
import { useRequiredUser } from "../../../../providers/auth-provider";

export default function IncomingFriendsList() {
  const { userFriendRequests } = useFriends();
  const user = useRequiredUser();
  const { handleRequestResponse } = useFriends();
  const incomingFriendRequests = userFriendRequests.pending.filter(
    (request) => {
      if (request.receiver === user.username) {
        return true;
      }
    }
  );
  const outgoingFriendRequests = userFriendRequests.pending.filter(
    (request) => {
      if (request.sender === user.username) {
        return true;
      }
    }
  );
  return (
    <div>
      {
        <h1 className="text-center p-2">{`You have ${incomingFriendRequests.length} Friend Request(s)!`}</h1>
      }
      {incomingFriendRequests.map((request: IFriendRequest, index: number) => {
        return (
          <div key={index} className="bg-blue-100 pb-0 p-4 rounded-lg my-2">
            <h1 className="text-center p-2">{`${request.sender} wants to be your friend`}</h1>
            <div className="flex justify-center">
              <Button
                btnType={"submit"}
                label={"Accept"}
                handleClick={() => handleRequestResponse("accepted", request)}
                disabled={false}
              />
              <Button
                btnType={"submit"}
                label={"Reject"}
                handleClick={() => handleRequestResponse("rejected", request)}
                disabled={false}
              />
            </div>
          </div>
        );
      })}
      <div>
        <h1 className="font-semibold">Sent Requests:</h1>
        {outgoingFriendRequests.map(
          (request: IFriendRequest, index: number) => {
            return <div key={index}>{request.receiver}</div>;
          }
        )}
      </div>
    </div>
  );
}
