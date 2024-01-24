import React, { useContext, useEffect } from "react";
import { childrenType } from "../Interfaces/global";
import { useState, createContext } from "react";
import sendFriendRequest from "../api-calls/send-friend-request";
import { toast } from "react-hot-toast";
import { User } from "../Interfaces/user";
import { useRequiredUser } from "./auth-provider";
import { patchStatusFriends } from "../api-calls/patch-friend-request";
import { fetchStatusFriends } from "../api-calls/fetch-friends-status";
import getUsers from "../api-calls/get-users";
import { getAllFriendRequests } from "../api-calls/get-friend-requests";
import { rejects } from "assert";

const FriendsContext = createContext({} as IFriendsContext);

interface IFriendsContext {
  handleSendFriendRequest: (e: React.SyntheticEvent) => void;
  handleSearchFriend: (e: React.SyntheticEvent, input: string) => void;
  selectedSearchFriend: User | null;
  handleRequestResponse: (
    requestId: number,
    fromStatus: string,
    NewStatus: string
  ) => void;
  acceptedFriends: User[] | undefined;
  friendInput: string;
  isSendBtnDisabled: boolean;
  incomingFriends: INarrowRequest[] | undefined;
  outGoingFriends: INarrowRequest[] | undefined;
  setIncomingFriends: React.Dispatch<
    React.SetStateAction<INarrowRequest[] | undefined>
  >;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [update, setUpdate] = useState<boolean>(false);
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

            outGoingRequests.push(input);
          } else {
            const input: INarrowRequest = {
              requestId: request.id,
              notUser: request.sender,
            };

            incomingRequests.push(input);
          }
        }

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
        setUpdate(!update);
      });
  };
  const handleSearchFriend = (e: React.SyntheticEvent, friendInput: string) => {
    e.preventDefault();
    const input = friendInput.toLowerCase();
    getUsers()
      .then((res) => res.json())
      .then((res) => {
        const friend = res.find((findUser: User) => {
          const isTrueorFalse =
            findUser.username?.toLowerCase() === input.toLowerCase();
          return findUser.username?.toLowerCase() === input.toLowerCase();
        });
        console.log({ friend: friend });
        if (friend) {
          setSelectedSearchFriend(friend);
          setIsSendBtnDisabled(false);
        } else toast.error("user not found");
      });
  };
  const handleSendFriendRequest = (e: React.SyntheticEvent) => {
    e.preventDefault();
    getAllFriendRequests()
      .then((res) => res.json())
      .then((res) => {
        // console.log({ res: res });
      });
    const isRejected = fetchStatusFriends(user.id, "rejected")
      .then((res) => res.json())
      .then((res) => {
        console.log({ rejected: res });
        for (const req of res) {
          console.log({ req: req });
          // console.log({
          //   recievername: req.receiver.username,
          //   sendername: req.sender.username,
          //   searchfriend: selectedSearchFriend?.username,
          // });
          if (selectedSearchFriend) {
            if (req.receiver.username === selectedSearchFriend.username) {
              toast.error("rejected request");
              console.log("rej1");
              return true;
            }
            if (req.sender.username === selectedSearchFriend.username) {
              toast.error("rejected request");
              console.log("rej2");
              return true;
            }
          }
        }
        return false;
      });
    const isPending = fetchStatusFriends(user.id, "pending")
      .then((res) => res.json())
      .then((res) => {
        console.log({ rejected: res });
        for (const req of res) {
          console.log({ req: req });
          if (selectedSearchFriend) {
            if (req.receiver.username === selectedSearchFriend.username) {
              toast.error("pending request");
              console.log("pending2");
              return true;
            }
            if (req.sender.username === selectedSearchFriend.username) {
              toast.error("pending request");
              console.log("pending2");
              return true;
            }
          }
        }
        return false;
      });
    if (selectedSearchFriend) {
      const newFriendRequest: IFriendRequest = {
        senderId: user.id,
        receiverId: selectedSearchFriend.id,
        status: "pending",
      };
      if (!isRejected && !isPending) {
        sendFriendRequest(newFriendRequest)
          .then((res) => res.json())
          .then((res) => {
            setIsSendBtnDisabled(true);
            setUpdate(!update);
          });
      }
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
        update,
        setUpdate,
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
