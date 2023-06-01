import React, { useContext, useEffect } from "react";
import { childrenType } from "../Interfaces/global";
import { useState, createContext } from "react";
import sendFriendRequest from "../api-calls/send-friend-request";
import { findFriend } from "../functions";
import { toast } from "react-hot-toast";
import { getAllFriendRequests } from "../api-calls/get-friend-requests";
import { User } from "../Interfaces/forms";
import { useRequiredUser } from "./auth-provider";
import patchFriendRequest from "../api-calls/patch-friend-request";
import { toggle } from "../functions";

const FriendsContext = createContext({} as IFriendsContext);

interface IFriendsContext {
  handleSendFriendRequest: (e: React.SyntheticEvent) => void;
  handleSearchFriend: (e: React.SyntheticEvent, input: string) => void;
  selectedSearchFriend: User | null;
  userFriendRequests: IUserFriendRequests;
  handleRequestResponse: (newStatus: string, request: IFriendRequest) => void;
  user: User;
  previousSearchValue: null | string;
  friendInput: string;
  setFriendInput: React.Dispatch<React.SetStateAction<string>>;
  isSendBtnDisabled: boolean;
}

export interface IFriendRequest {
  sender: string;
  receiver: string;
  status: "accepted" | "rejected" | "pending";
  id?: number;
}
export interface IUserFriendRequests {
  accepted: IFriendRequest[];
  rejected: IFriendRequest[];
  pending: IFriendRequest[];
}

function FriendsProvider({ children }: childrenType) {
  const { userName } = useRequiredUser();
  const user = useRequiredUser();
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

  async function sortFriendRequests() {
    console.log("sortFriendRequests()");
    getAllFriendRequests() //get All from API
      .then((response) => response.json())
      .then((requests) => {
        // console.log({ apiresponse: requests });
        const userFriendRequests: IFriendRequest[] = requests.filter(
          (request: IFriendRequest) => Object.values(request).includes(userName)
        );
        setUserFriendRequests({
          accepted: userFriendRequests.filter(
            (request) => request.status === "accepted"
          ),
          rejected: userFriendRequests.filter(
            (request) => request.status === "rejected"
          ),
          pending: userFriendRequests.filter((request) => {
            if (request.status === "pending") {
              return true;
            }
          }),
        });
      })
      .then((e) => console.log(userFriendRequests));
  }
  useEffect(() => {
    sortFriendRequests();
  }, []);

  const handleRequestResponse = (
    newStatus: string,
    request: IFriendRequest
  ) => {
    patchFriendRequest(newStatus, request)
      .then((response) => {
        console.log({ response: response });
        return response.json();
      })
      .then(() => {
        toast.success("friend request accepted!");
        sortFriendRequests();
      });
  };

  async function handleSearchFriend(e: React.SyntheticEvent, input: string) {
    e.preventDefault();
    setpreviousSearchValue(input);
    const result = await findFriend(input);
    if (!result) {
      toast.error("user not found");
      setSelectedSearchFriend(null);
      setFriendInput("");
    } else {
      toast.success("user found!");
      setSelectedSearchFriend(result);
      setIsSendBtnDisabled(false);
    }
  }
  const alreadySent = (
    currentRequest: IFriendRequest,
    pending: IFriendRequest[]
  ) => {
    const alreadySent = pending.map((request) => {
      request.sender === user.userName;
    });
    console.log({ isreceiver: alreadySent });
    return alreadySent.length > 0;
  };
  function handleSendFriendRequest(e: React.SyntheticEvent) {
    e.preventDefault();
    if (selectedSearchFriend) {
      const isAlreadySent = alreadySent(
        {
          sender: userName,
          receiver: selectedSearchFriend.userName,
          status: "pending",
        },
        userFriendRequests.pending
      );
      if (isAlreadySent) {
        toast.error("request already exsists");
      } else
        sendFriendRequest({
          sender: userName,
          receiver: selectedSearchFriend.userName,
          status: "pending",
        })
          .then((requestObj) => {
            if (!requestObj.ok) {
              toast.error("Failed to send request");
              // console.log(requestObj);
            }
          })
          .then(() => {
            toast.success("request sent!");
            setSelectedSearchFriend(null);
            setIsSendBtnDisabled(true);
            setFriendInput("");
          })
          .catch((err) => {
            toast.error(`${err}`);
          });
    } else {
      toast.error("Search for a friend first");
    }
  }
  return (
    <FriendsContext.Provider
      value={{
        handleSendFriendRequest,
        userFriendRequests,
        handleRequestResponse,
        handleSearchFriend,
        user,
        selectedSearchFriend,
        previousSearchValue,
        friendInput,
        setFriendInput,
        isSendBtnDisabled,
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
