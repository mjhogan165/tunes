import React, { useEffect, useState } from "react";
import {
  IFriendRequest,
  useFriends,
} from "../../../../providers/friends-provider";
import Button from "../../../../Componants/Button";
import { useAuth, useRequiredUser } from "../../../../providers/auth-provider";
import { fetchStatusFriends } from "../../../../api-calls/fetch-friends-status";
import { User } from "../../../../Interfaces/user";
import { patchStatusFriends } from "../../../../api-calls/patch-friend-request";

// export interface IFriendRequestData extends IFriendRequest {

// }

export default function IncomingFriendsList() {
  const [outGoingFriends, setoutGoingFriends] = useState<INarrowRequest[]>();
  const [incomingFriends, setincomingFriends] = useState<INarrowRequest[]>();
  const [data, setData] = useState<IFriendRequest[]>();
  const user = useRequiredUser();
  // const { user } = useAuth();

  interface INarrowRequest {
    requestId: number;
    notUser: User;
  }
  useEffect(() => {
    fetchStatusFriends(user.id, "pending")
      .then((response) => response.json())
      .then((data) => {
        const incomingRequests: INarrowRequest[] = [];
        const outGoingRequests: INarrowRequest[] = [];
        for (const request of data) {
          if (request.senderId === user.id) {
            const input: INarrowRequest = {
              requestId: request.id,
              notUser: request.receiver,
            };
            console.log({ outGoingInput: input });
            outGoingRequests.push(input);
          } else {
            const input: INarrowRequest = {
              requestId: request.id,
              notUser: request.sender,
            };
            console.log({ incomingInput: input });
            incomingRequests.push(input);
          }
        }
        console.log({ outGoingRequests: outGoingRequests });
        console.log({ incomingRequests: incomingRequests });
        setData(data);
        setincomingFriends(incomingRequests);
        setoutGoingFriends(outGoingRequests);
      });
  }, []);
  console.log({ data: data, incomingFriends: incomingFriends });
  const handleRequestResponse = (
    requestId: number,
    fromStatus: string,
    NewStatus: string
  ) => {
    patchStatusFriends(requestId, fromStatus, NewStatus);
  };
  return (
    <div>
      {incomingFriends && (
        <h1 className="text-center p-2">{`You have ${incomingFriends.length} Friend Request(s)!`}</h1>
      )}
      {incomingFriends &&
        incomingFriends.map((request: INarrowRequest, index: number) => {
          return (
            <div key={index} className="bg-blue-100 pb-0 p-4 rounded-lg my-2">
              <h1 className="text-center p-2">{`${request.notUser.username} wants to be your friend`}</h1>
              <div className="flex justify-center">
                <Button
                  btnType={"submit"}
                  label={"Accept"}
                  handleClick={() =>
                    handleRequestResponse(
                      request.requestId,
                      "pending",
                      "accepted"
                    )
                  }
                  disabled={false}
                />
                <Button
                  btnType={"submit"}
                  label={"Reject"}
                  handleClick={() =>
                    handleRequestResponse(
                      request.requestId,
                      "pending",
                      "rejected"
                    )
                  }
                  disabled={false}
                />
              </div>
            </div>
          );
        })}
      {/* <div>
        <h1 className="font-semibold">Sent Requests:</h1>
        {outGoingFriends &&
          outGoingFriends.map((request: User, index: number) => {
            return <div key={index}>{request.username}</div>;
          })}
      </div> */}
    </div>
  );
}
