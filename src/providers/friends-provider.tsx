import React, { useContext, useEffect } from "react";
import { childrenType } from "../Interfaces/global";
import { useState, createContext } from "react";
import sendFriendRequest from "../api-calls/send-friend-request";
import { useAuth } from "./auth-provider";
import { findFriend } from "../functions";
import { toast } from "react-hot-toast";
import { getAllFriendRequests } from "../api-calls/get-friend-requests";
import { User } from "../Interfaces/forms";
import { useRequiredUser } from "./auth-provider";
import patchFriendRequest from "../api-calls/patch-friend-request";

// import { useAuthenticatedUser } from "../Routes/Dashboard/DashboardLayout";

const FriendsContext = createContext({} as FriendsContextInterface);

interface FriendsContextInterface {
  handleSendFriendRequest: (e: React.SyntheticEvent, input: string) => void;
  userFriendRequests: IUserFriendRequests;
  handleRequestResponse: (newStatus: string, request: IFriendRequest) => void;
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
  const [refresh, setRefresh] = useState(true);
  console.log("Render: Friends Provider");
  const [userFriendRequests, setUserFriendRequests] =
    useState<IUserFriendRequests>({
      accepted: [],
      rejected: [],
      pending: [],
    });
  useEffect(() => {
    (async function sortFriendRequests() {
      getAllFriendRequests() //get All from API
        .then((response) => response.json())
        .then((requests) => {
          console.log({ apiresponse: requests });
          const userFriendRequests: IFriendRequest[] = requests.filter(
            (request: IFriendRequest) =>
              Object.values(request).includes(userName)
          );
          setUserFriendRequests({
            accepted: userFriendRequests.filter(
              (request) => request.status === "accepted"
            ),
            rejected: userFriendRequests.filter(
              (request) => request.status === "rejected"
            ),
            pending: userFriendRequests.filter((request) => {
              if (
                request.status === "pending" &&
                request.reciever === userName
              ) {
                return true;
              }
            }),
          });
        });
    })();
  }, [refresh]);

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
        // setUserFriendRequests((prevState) => {
        //   return {
        //     ...prevState,
        //     ["newStatus"]: prevState.accepted.push(parsed),
        //   };
        // });
        setRefresh(!refresh);
      });
  };

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
      value={{
        handleSendFriendRequest,
        userFriendRequests,
        handleRequestResponse,
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
