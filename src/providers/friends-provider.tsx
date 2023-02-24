import React, { useContext, useEffect } from "react";
import { childrenType } from "../Interfaces/global";
import { useState, createContext } from "react";
import sendFriendRequest from "../api-calls/send-friend-request";
import { useAuth } from "./auth-provider";
import { findFriend } from "../functions";
import { toast } from "react-hot-toast";
import { getFriendRequests } from "../api-calls/get-friend-requests";
import { User } from "../Interfaces/forms";
import { useRequiredUser } from "./auth-provider";

const FriendsContext = createContext({} as FriendsContextInterface);

interface FriendsContextInterface {
  handleSendFriendRequest: (e: React.SyntheticEvent, input: string) => void;
}

export interface IFriendRequest {
  sender: string;
  reciever: string;
  status: "accpeted" | "rejected" | "pending";
}
function FriendsProvider({ children }: childrenType) {
  const { user } = useAuth();

  // let loggedUser = {} as User;
  // if (user) {
  //   loggedUser = user;
  // }

  // const [incomingRequest, setIncomingRequest] = useState<IFriendRequest | null>(
  //   null
  // );

  useEffect(() => {
    getFriendRequests()
      .then((response) => response.json())
      .then((requests) => {
        for (const request of requests) {
          // console.log(request);
          // if (request.reciever === loggedUser.userName) {
          //   console.log("matched");
          // }
        }
      });
  }, []);

  async function handleSendFriendRequest(
    e: React.SyntheticEvent,
    input: string
  ) {
    e.preventDefault();
    const result = await findFriend(input.toLowerCase());
    console.log(result);
    if (!result) {
      toast.error("user not found");
    } else {
      const reciever = result.userName;
      sendFriendRequest({
        status: "pending",
        sender: "",
        reciever: reciever,
      });
    }
  }
  return (
    <FriendsContext.Provider value={{ handleSendFriendRequest }}>
      {children}
    </FriendsContext.Provider>
  );
}

export const useFriends = () => {
  return useContext(FriendsContext);
};

export default FriendsProvider;
