import React, { useContext, useEffect } from "react";
import { childrenType } from "../Interfaces/global";
import { useState, createContext } from "react";
import sendFriendRequest from "../api-calls/send-friend-request";
import { findFriend } from "../functions";
import { toast } from "react-hot-toast";
import { getAllFriendRequests } from "../api-calls/get-friend-requests";
import { User } from "../Interfaces/user";
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
  previousSearchValue: null | string;
  friendInput: string;
  setFriendInput: React.Dispatch<React.SetStateAction<string>>;
  isSendBtnDisabled: boolean;
  userFriendAccounts: User[];
  setUserFriendAccounts: React.Dispatch<React.SetStateAction<User[]>>;
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

  async function sortFriendRequests() {
    getAllFriendRequests()
      .then((response) => response.json())
      .then((requests) => {
        const userFriendRequests: IFriendRequest[] = requests.filter(
          (request: IFriendRequest) =>
            Object.values(request).includes(user.username)
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
        return response.json();
      })
      .then(() => {
        if (newStatus === "rejected") {
          toast.success("friend request rejected");
        } else {
          toast.success("friend request accepted!");
        }
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

  const searchSelectedSearchFriend = () => {
    let message = "";
    const allRequests = userFriendRequests.accepted.concat(
      userFriendRequests.pending,
      userFriendRequests.rejected
    );
    const found = allRequests.find((request) => {
      return (
        request.sender === selectedSearchFriend?.username ||
        request.receiver === selectedSearchFriend?.username
      );
    });
    if (found) {
      switch (true) {
        case found.status === "accepted":
          message = "you are already friends";
          break;
        case found.status === "rejected":
          message = "this user has previously rejected your request";
          break;
        case found.status === "pending":
          message = "request is pending";
          break;
        default:
          message = "";
          break;
      }
    }
    return message;
  };
  function handleSendFriendRequest(e: React.SyntheticEvent) {
    e.preventDefault();

    if (selectedSearchFriend) {
      const searchError = searchSelectedSearchFriend();
      if (searchError) {
        toast.error(searchError);
      } else
        sendFriendRequest({
          sender: user.username,
          receiver: selectedSearchFriend.username,
          status: "pending",
        })
          .then((requestObj) => {
            if (!requestObj.ok) {
              toast.error("Failed to send request");
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
        userFriendAccounts,
        setUserFriendAccounts,
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
