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

// import { useAuthenticatedUser } from "../Routes/Dashboard/DashboardLayout";

const FriendsContext = createContext({} as FriendsContextInterface);

interface FriendsContextInterface {
  handleSendFriendRequest: (e: React.SyntheticEvent, input: string) => void;
  allFriendRequests: IFriendRequestsSorted | null;
}

export interface IFriendRequest {
  sender: string;
  reciever: string;
  status: "accpeted" | "rejected" | "pending";
  id?: number;
}
export interface IFriendRequestsSorted {
  accepted: IFriendRequest[];
  rejected: IFriendRequest[];
  pending: IFriendRequest[];
}
function FriendsProvider({ children }: childrenType) {
  const { userName } = useRequiredUser();
  console.log("Render: Friends Provider");
  const [allFriendRequests, setAllFriendRequests] =
    useState<IFriendRequestsSorted | null>(null);
  // const [friendsList, setFriendsList] = useState<User[] | null>(null);
  // const [incomingRequest, setIncomingRequest] = useState<IFriendRequest | null>(
  //   null
  // );

  // let rejectedRequests
  // let pendingRequests
  useEffect(() => {
    //get friend requests containing the user
    (async function sortFriendRequests() {
      getFriendRequests()
        .then((response) => response.json())
        .then((accounts) => {
          const friendRequestObject: IFriendRequestsSorted = {
            accepted: [],
            rejected: [],
            pending: [],
          };
          for (const acc of accounts) {
            if (Object.values(acc).includes(userName)) {
              if (acc.status === "accepted") {
                friendRequestObject.accepted.push(acc);
              } else if (acc.status === "rejected") {
                friendRequestObject.rejected.push(acc);
              } else {
                friendRequestObject.pending.push(acc);
              }
            }
          }
          setAllFriendRequests(friendRequestObject);
        });
    })();
    // sort requests by status
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
      sendFriendRequest({
        status: "pending",
        sender: userName,
        reciever: result.userName,
      })
        .then((requestObj) => {
          if (!requestObj.ok) {
            toast.error("Failed to send request");
          }
        })
        .catch((err) => {
          toast.error(`${err}`);
        })
        .finally(() => toast.success("request sent!"));
      //} else toast.error("must be logged in to use this feature");
    }
  }
  return (
    <FriendsContext.Provider
      value={{ handleSendFriendRequest, allFriendRequests }}
    >
      {children}
    </FriendsContext.Provider>
  );
}

export const useFriends = () => {
  return useContext(FriendsContext);
};

export default FriendsProvider;
