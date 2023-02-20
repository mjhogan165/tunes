import React, { createContext, useContext, useState, useEffect } from "react";
import { getTunes } from "../api-calls/get-tunes";
import { childrenType } from "../Interfaces/global";
import { useAuth } from "./auth-provider";
import { INewTune } from "../Interfaces/feed";

interface FeedInterface {
  tuneCards: INewTune[];
  setTuneCards: React.Dispatch<React.SetStateAction<INewTune[]>>;
}

const FeedContext = createContext({} as FeedInterface);

function FeedProvider({ children }: childrenType) {
  const [tuneCards, setTuneCards] = useState([] as INewTune[]);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      getTunes()
        .then((response) => response.json())
        .then((parsedArray) => setTuneCards(parsedArray));
    }
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
