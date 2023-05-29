import React, { createContext, useContext, useState, useEffect } from "react";
import { getTunes } from "../api-calls/get-tunes";
import { childrenType } from "../Interfaces/global";
import { useRequiredUser } from "./auth-provider";
import { INewTune } from "../Interfaces/feed";
import { User } from "../Interfaces/forms";
// import { useAuthenticatedUser } from "../Routes/Dashboard/DashboardLayout";
interface IFeed {
  tuneCards: INewTune[];
  setTuneCards: React.Dispatch<React.SetStateAction<INewTune[]>>;
  user: User;
}

const FeedContext = createContext({} as IFeed);

function FeedProvider({ children }: childrenType) {
  console.log("Render: FeedProvider");
  const [tuneCards, setTuneCards] = useState<INewTune[]>([]);
  const user = useRequiredUser();
  // const authUser = useAuthenticatedUser();
  // console.log(authUser);
  useEffect(() => {
    getTunes()
      .then((response) => response.json())
      .then((parsedArray) => {
        console.log("Feed PROVIDERS call");
        setTuneCards(parsedArray);
      })
      .catch((err) => {
        console.log("damn it messed up");
      });
  }, [user]);
  return (
    <FeedContext.Provider value={{ tuneCards, setTuneCards, user }}>
      {children}
    </FeedContext.Provider>
  );
}

export const useFeed = () => {
  return useContext(FeedContext);
};

export default FeedProvider;
