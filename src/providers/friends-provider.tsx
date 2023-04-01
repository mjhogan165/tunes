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

const FriendsContext = createContext({} as IFriendsContext);

interface IFriendsContext {
  handleSendFriendRequest: (e: React.SyntheticEvent) => void;
  handleSearchFriend: (e: React.SyntheticEvent, input: string) => void;
  selectedSearchFriend: User | null;
  userFriendRequests: IUserFriendRequests;
  handleRequestResponse: (newStatus: string, request: IFriendRequest) => void;
  user: User;
}

export interface IFriendRequest {
  sender: string;
  reciever: string;
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
  const [selectedSearchFriend, setSelectedSearchFriend] = useState<User | null>(
    null
  );
  const user = useRequiredUser();
  console.log("Render: Friends Provider");
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
        console.log({ apiresponse: requests });
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
            if (request.status === "pending" && request.reciever === userName) {
              return true;
            }
          }),
        });
      });
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
        if (response.ok) {
          return response.json();
        }
      })
      .then(() => {
        sortFriendRequests();
      });
  };

  async function handleSearchFriend(e: React.SyntheticEvent, input: string) {
    e.preventDefault();
    const result = await findFriend(input);
    if (!result) {
      toast.error("user not found");
      setSelectedSearchFriend(null);
    } else {
      toast.success("user found!");
      setSelectedSearchFriend(result);
    }
  }

  async function handleSendFriendRequest(e: React.SyntheticEvent) {
    e.preventDefault();
    if (selectedSearchFriend) {
      sendFriendRequest({
        status: "pending",
        sender: userName,
        reciever: selectedSearchFriend.userName,
      })
        .then((requestObj) => {
          if (!requestObj.ok) {
            toast.error("Failed to send request");
          }
        })
        .then(() => {
          toast.success("request sent!");
          setSelectedSearchFriend(null);
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
