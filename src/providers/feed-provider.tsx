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
  postedCards: INewTune[];
  setRefreshCards: React.Dispatch<React.SetStateAction<boolean>>;
  refreshCards: boolean;
}

const FeedContext = createContext({} as IFeed);

function FeedProvider({ children }: childrenType) {
  const [tuneCards, setTuneCards] = useState<INewTune[]>([]);
  const [taggedCards, setTaggedCards] = useState<INewTune[]>([]);
  const [postedCards, setPostedCards] = useState<INewTune[]>([]);
  const [refreshCards, setRefreshCards] = useState(false);
  const user = useRequiredUser();

  useEffect(() => {
    getTunes()
      .then((response) => response.json())
      .then((parsedArray) => {
        const tagged = parsedArray.filter((card: INewTune) => {
          return user.username === card.tagged;
        });
        const posted = parsedArray.filter((card: INewTune) => {
          return user.username === card.createdBy;
        });
        setTaggedCards(tagged);
        setPostedCards(posted);
        setTuneCards(parsedArray);
        return tagged;
      })
      .then((res) => {
        console.log({ user: user, tagged: res });
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [user, refreshCards]);
  return (
    <FeedContext.Provider
      value={{
        tuneCards,
        setTuneCards,
        user,
        taggedCards,
        postedCards,
        setRefreshCards,
        refreshCards,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export const useFeed = () => {
  return useContext(FeedContext);
};

export default FeedProvider;
