import React, { useContext } from "react";
import { childrenType } from "../Interfaces/global";
import { useState, createContext } from "react";
import sendFriendRequest from "../api-calls/send-friend-request";
import { useAuth } from "./auth-provider";
import { findFriend } from "../functions";
import { getAccounts } from "../api-calls/get-accounts";
import { toast } from "react-hot-toast";

const FriendsContext = createContext({} as FriendsContextInterface);

interface FriendsContextInterface {
  handleSendFriendRequest: (e: React.SyntheticEvent, input: string) => void;
}

function FriendsProvider({ children }: childrenType) {
  const { user } = useAuth();
  async function handleSendFriendRequest(
    e: React.SyntheticEvent,
    input: string
  ) {
    e.preventDefault();
    const result = await findFriend(input);
    console.log(result);
    if (!result) {
      toast.error("user not found");
    } else {
      if (user) {
        const loggedUser = user.userName;
        const reciever = result.userName;
        sendFriendRequest({
          sender: loggedUser,
          reciever: reciever,
          status: "pending",
        });
      }
    }

    // console.log(findFriend(input));
    // if(user){
    // sendFriendRequest(user[id], 3, "pending")
    //   .then((response) => response.json())
    //   .then((e) => console.log(e));
    // }
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
