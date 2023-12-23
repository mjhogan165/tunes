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
import { INarrowRequest } from "../../../../providers/friends-provider";
// export interface IFriendRequestData extends IFriendRequest {

// }

export default function IncomingFriendsList() {
  const user = useRequiredUser();
  // const { user } = useAuth();
  const { handleRequestResponse, incomingFriends, outGoingFriends } =
    useFriends();

  // console.log({ data: data, incomingFriends: incomingFriends });

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
      <div>
        <h1 className="font-semibold">Sent Requests:</h1>
        {outGoingFriends &&
          outGoingFriends.map((request: INarrowRequest, index: number) => {
            return <div key={index}>{request.notUser.username}</div>;
          })}
      </div>
    </div>
  );
}
