import React, { useContext, useEffect } from "react";
import { childrenType } from "../Interfaces/global";
import { useState, createContext } from "react";
import sendFriendRequest from "../api-calls/send-friend-request";
import { findFriend } from "../functions";
import { toast } from "react-hot-toast";
import { getAllFriendRequests } from "../api-calls/get-friend-requests";
import { User } from "../Interfaces/user";
import { useRequiredUser } from "./auth-provider";
import { patchStatusFriends } from "../api-calls/patch-friend-request";
import { fetchStatusFriends } from "../api-calls/fetch-friends-status";
import IncomingFriendsList from "../Routes/Dashboard/Pages/Friends/PendingFriends";
import getUsers from "../api-calls/get-users";
// import patchFriendRequest from "../api-calls/patch-friend-request";
// import { getUserFriendRequests } from "../api-calls/get-user-friends";

const FriendsContext = createContext({} as IFriendsContext);

interface IFriendsContext {
  handleSendFriendRequest: (e: React.SyntheticEvent) => void;
  handleSearchFriend: (e: React.SyntheticEvent, input: string) => void;
  selectedSearchFriend: User | null;
  // userFriendRequests: IUserFriendRequests;
  handleRequestResponse: (
    requestId: number,
    fromStatus: string,
    NewStatus: string
  ) => void;
  acceptedFriends: User[] | undefined;
  // user: User;
  // previousSearchValue: null | string;
  friendInput: string;
  // setFriendInput: React.Dispatch<React.SetStateAction<string>>;
  isSendBtnDisabled: boolean;
  // userFriendAccounts: User[];
  incomingFriends: INarrowRequest[] | undefined;
  outGoingFriends: INarrowRequest[] | undefined;
  setIncomingFriends: React.Dispatch<
    React.SetStateAction<INarrowRequest[] | undefined>
  >;
  // setUserFriendAccounts: React.Dispatch<React.SetStateAction<User[]>>;
}
export interface INarrowRequest {
  requestId: number;
  notUser: User;
}
export interface IFriendRequest {
  id?: number;
  sender?: User;
  senderId?: number;
  receiver?: User;
  receiverId?: number;
  status: "accepted" | "rejected" | "pending";
}
export interface IUserFriendRequests {
  accepted: IFriendRequest[];
  rejected: IFriendRequest[];
  pending: IFriendRequest[];
}

function FriendsProvider({ children }: childrenType) {
  const user = useRequiredUser();
  const [outGoingFriends, setoutGoingFriends] = useState<INarrowRequest[]>();
  const [incomingFriends, setIncomingFriends] = useState<INarrowRequest[]>();
  const [data, setData] = useState<IFriendRequest[]>();
  const [friendInput, setFriendInput] = useState("");
  const [isSendBtnDisabled, setIsSendBtnDisabled] = useState(true);
  const [selectedSearchFriend, setSelectedSearchFriend] = useState<User | null>(
    null
  );
  const [previousSearchValue, setpreviousSearchValue] = useState<null | string>(
    ""
  );
  const [userFriendRequests, setUserFriendRequests] =
    useState<IUserFriendRequests>({
      accepted: [],
      rejected: [],
      pending: [],
    });
  const [acceptedFriends, setAcceptedFriends] = useState<User[]>();
  const [userFriendAccounts, setUserFriendAccounts] = useState<User[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  useEffect(() => {
    console.log("friends prov");
    // console.log("useeffect friends");
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
            // console.log({ outGoingInput: input });
            outGoingRequests.push(input);
          } else {
            const input: INarrowRequest = {
              requestId: request.id,
              notUser: request.sender,
            };
            // console.log({ incomingInput: input });
            incomingRequests.push(input);
          }
        }
        // console.log({ outGoingRequests: outGoingRequests });
        // console.log({ incomingRequests: incomingRequests });
        setData(data);
        setIncomingFriends(incomingRequests);
        setoutGoingFriends(outGoingRequests);
      });
    if (user) {
      fetchStatusFriends(user.id, "accepted")
        .then((res) => res.json())
        .then((data) => {
          const accepted: User[] = [];
          for (const request of data) {
            // console.log(request.senderId);
            if (request.senderId === user.id) {
              accepted.push(request.receiver);
            } else {
              accepted.push(request.sender);
            }
          }
          setAcceptedFriends(accepted);
        });
    }
  }, [update]);
  const handleRequestResponse = (
    requestId: number,
    fromStatus: string,
    NewStatus: string
  ) => {
    patchStatusFriends(requestId, fromStatus, NewStatus)
      .then((res) => res.json())
      .then((data) => {
        // console.log({ data: data });
        setUpdate(!update);
      });
    // .then((res) => {
    //   fetchStatusFriends(user.id, "pending")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       const incomingRequests: INarrowRequest[] = [];
    //       const outGoingRequests: INarrowRequest[] = [];
    //       for (const request of data) {
    //         if (request.senderId === user.id) {
    //           const input: INarrowRequest = {
    //             requestId: request.id,
    //             notUser: request.receiver,
    //           };
    //           console.log({ outGoingInput: input });
    //           outGoingRequests.push(input);
    //         } else {
    //           const input: INarrowRequest = {
    //             requestId: request.id,
    //             notUser: request.sender,
    //           };
    //           console.log({ incomingInput: input });
    //           incomingRequests.push(input);
    //         }
    //       }
    //       console.log({ outGoingRequests: outGoingRequests });
    //       console.log({ incomingRequests: incomingRequests });
    //       setData(data);
    //       setIncomingFriends(incomingRequests);
    //       setoutGoingFriends(outGoingRequests);
    //     });
    // });
  };
  const handleSearchFriend = (e: React.SyntheticEvent, friendInput: string) => {
    e.preventDefault();
    const input = friendInput.toLowerCase();
    getUsers()
      .then((res) => res.json())
      .then((res) => {
        const friend = res.find((x: any) => {
          return x.username === input;
        });
        // console.log({ input: input, friend: friend });
        if (friend) {
          setSelectedSearchFriend(friend);
          setIsSendBtnDisabled(false);
        } else console.log("not found");
      });
  };
  const handleSendFriendRequest = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log({ selectedSearchFriend: selectedSearchFriend });
    if (selectedSearchFriend) {
      const newFriendRequest: IFriendRequest = {
        senderId: user.id,
        receiverId: selectedSearchFriend.id,
        status: "pending",
      };

      console.log({ newFriendRequest: newFriendRequest });
      sendFriendRequest(newFriendRequest)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setIsSendBtnDisabled(true);
          setUpdate(!update);
        });
    }
  };

  return (
    <FriendsContext.Provider
      value={{
        handleSearchFriend,
        acceptedFriends,
        selectedSearchFriend,
        handleSendFriendRequest,
        // userFriendRequests,
        handleRequestResponse,
        outGoingFriends,
        // user,
        // selectedSearchFriend,
        // previousSearchValue,
        setIncomingFriends,
        friendInput,
        incomingFriends,
        // setFriendInput,
        isSendBtnDisabled,
        // userFriendAccounts,
        // setUserFriendAccounts,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
}

export const useFriends = () => {
  return useContext(FriendsContext);
};

export default FriendsProvider;
