import React, { createContext, useContext, useState, useEffect } from "react";
import { getSongs } from "../api-calls/get-songs";
import { SongCard } from "../Interfaces/";

interface UserInterface {
  songCards: SongCard[];
}

const UserContext = createContext({} as UserInterface);

function UserProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [songCards, setSongCards] = useState([] as SongCard[]);
  useEffect(() => {
    getSongs()
      .then((response) => response.json())
      .then((parsedArray) => setSongCards(parsedArray));
  }, []);
  return (
    <UserContext.Provider value={{ songCards }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider;
