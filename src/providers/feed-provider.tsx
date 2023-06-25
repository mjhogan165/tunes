import React, { createContext, useContext, useState, useEffect } from "react";
import { getTunes } from "../api-calls/get-tunes";
import { childrenType } from "../Interfaces/global";
import { useRequiredUser } from "./auth-provider";
import { INewTune } from "../Interfaces/feed";
import { toast } from "react-hot-toast";
import { User } from "../Interfaces/user";

interface IFeed {
  tuneCards: INewTune[];
  setTuneCards: React.Dispatch<React.SetStateAction<INewTune[]>>;
  user: User;
  taggedCards: INewTune[];
}

const FeedContext = createContext({} as IFeed);

function FeedProvider({ children }: childrenType) {
  const [tuneCards, setTuneCards] = useState<INewTune[]>([]);
  const [taggedCards, setTaggedCards] = useState<INewTune[]>([]);
  const user = useRequiredUser();
  console.log("Render: *FeedProvider");
  useEffect(() => {
    getTunes()
      .then((response) => response.json())
      .then((parsedArray) => {
        const tagged = parsedArray.filter((card: INewTune) => {
          return user.userName === card.tagged;
        });
        setTaggedCards(tagged);
        setTuneCards(parsedArray);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [user]);
  return (
    <FeedContext.Provider
      value={{ tuneCards, setTuneCards, user, taggedCards }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export const useFeed = () => {
  return useContext(FeedContext);
};

export default FeedProvider;
