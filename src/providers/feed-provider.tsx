import React, { createContext, useContext, useState, useEffect } from "react";
import { getTunes } from "../api-calls/get-tunes";
import { childrenType } from "../Interfaces/global";
import { useAuth, useRequiredUser } from "./auth-provider";
import { INewTune } from "../Interfaces/feed";
// import { useAuthenticatedUser } from "../Routes/Dashboard/DashboardLayout";
interface FeedInterface {
  tuneCards: INewTune[];
  setTuneCards: React.Dispatch<React.SetStateAction<INewTune[]>>;
}

const FeedContext = createContext({} as FeedInterface);

function FeedProvider({ children }: childrenType) {
  console.log("Render: FeedProvider");
  const [tuneCards, setTuneCards] = useState([] as INewTune[]);
  const user = useRequiredUser();
  // const authUser = useAuthenticatedUser();
  // console.log(authUser);
  useEffect(() => {
    console.log("Called: useEffect getTunes");
    getTunes()
      .then((response) => response.json())
      .then((parsedArray) => setTuneCards(parsedArray));
  }, [user]);
  return (
    <FeedContext.Provider value={{ tuneCards, setTuneCards }}>
      {children}
    </FeedContext.Provider>
  );
}

export const useFeed = () => {
  return useContext(FeedContext);
};

export default FeedProvider;
