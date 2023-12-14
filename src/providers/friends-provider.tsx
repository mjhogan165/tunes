import React, { useContext, useEffect } from "react";
import { childrenType } from "../Interfaces/global";
import { useState, createContext } from "react";
import sendFriendRequest from "../api-calls/send-friend-request";
import { findFriend } from "../functions";
import { toast } from "react-hot-toast";
import { getAllFriendRequests } from "../api-calls/get-friend-requests";
import { User } from "../Interfaces/user";
import { useRequiredUser } from "./auth-provider";
// import patchFriendRequest from "../api-calls/patch-friend-request";
// import { getUserFriendRequests } from "../api-calls/get-user-friends";

const FriendsContext = createContext({} as IFriendsContext);

interface IFriendsContext {
  // handleSendFriendRequest: (e: React.SyntheticEvent) => void;
  // handleSearchFriend: (e: React.SyntheticEvent, input: string) => void;
  // selectedSearchFriend: User | null;
  // userFriendRequests: IUserFriendRequests;
  // handleRequestResponse: (newStatus: string, request: IFriendRequest) => void;
  // user: User;
  // previousSearchValue: null | string;
  // friendInput: string;
  // setFriendInput: React.Dispatch<React.SetStateAction<string>>;
  isSendBtnDisabled: boolean;
  // userFriendAccounts: User[];
  // setUserFriendAccounts: React.Dispatch<React.SetStateAction<User[]>>;
}

export interface IFriendRequest {
  id: number;
  sender: User;
  senderId: number;
  receiver: User;
  receiverId: number;
  status: "accepted" | "rejected" | "pending";
}
export interface IUserFriendRequests {
  accepted: IFriendRequest[];
  rejected: IFriendRequest[];
  pending: IFriendRequest[];
}

function FriendsProvider({ children }: childrenType) {
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
  const [userFriendAccounts, setUserFriendAccounts] = useState<User[]>([]);

  return (
    <FriendsContext.Provider
      value={{
        // handleSendFriendRequest,
        // userFriendRequests,
        // handleRequestResponse,
        // handleSearchFriend,
        // user,
        // selectedSearchFriend,
        // previousSearchValue,
        // friendInput,
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
