import React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import { childrenType } from "../Interfaces/global";
import createNewTune from "../api-calls/create-newtune";
import { INewTune } from "../Interfaces/feed";
import { toast } from "react-hot-toast";
import getToken from "../api-calls/gets-token";
const client_id = "e9b1abef9cd84cecb883434c4d6de44b";
const redirect_uri = "http://localhost:5173/Home/Redirect";
const client_secret = "e0f968f004f54c22ad052f3e3a634326";
const url = "https://accounts.spotify.com/api/token";
import { searchTrack } from "../api-calls/search";
import { useAuth } from "./auth-provider";

interface NewTuneInterface {
  handleClickPostNewTune: (e: React.SyntheticEvent, tuneObj: INewTune) => void;
  handleClickSearch: (e: React.SyntheticEvent, input: string) => void;
  searchResults: Array<INewTune> | null;
  handleClickTune: (newTune: INewTune) => void;
  songInput: string;
  setSongInput: React.Dispatch<React.SetStateAction<string>>;
  selectedTune: INewTune;
  setCommentInput: React.Dispatch<React.SetStateAction<string>>;
  commentInput: string;
}
const NewTuneContext = createContext({} as NewTuneInterface);

function NewTuneProvider({ children }: childrenType) {
  const [token, setToken] = useState("");
  const [selectedTune, setSelectedTune] = useState({} as INewTune);
  const [songInput, setSongInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [searchResults, setSearchResults] = useState<null | Array<INewTune>>(
    null
  );
  const { user } = useAuth();
  let loggedUser = "";
  if (user) {
    loggedUser = user.userName;
  }

  useEffect(() => {
    console.log("useEffect token called");
    const ifToken = localStorage.getItem("token");
    if (ifToken) {
      console.log(ifToken);
      setToken(ifToken);
    } else {
      getToken()
        .then((result) => result.json())
        .then((token) => {
          setToken(token.access_token);
          console.log("getToken()");
          console.log({
            tokenResponse: token.access_token,
            type: typeof token.access_token,
          });
          localStorage.setItem("token", token.access_token);
          return token;
        });
    }
  }, []);

  const handleClickPostNewTune = (
    e: React.SyntheticEvent,
    tuneObj: INewTune
  ) => {
    e.preventDefault();
    createNewTune(tuneObj)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((parsed) => {
        toast.success("Tune Posted!");
        // console.log({ parsed: parsed });
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setSearchResults(null);
        setSongInput("");
        setCommentInput("");
      });
  };

  const handleClickSearch = async (e: React.SyntheticEvent, input: string) => {
    e.preventDefault();

    searchTrack(input, token)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        console.log({ response: response, status: response.statusText });
        return response.json();
      })
      .then((trackObj) => {
        console.log({ response: trackObj });
        const filteredResponse = [];
        for (const elm of trackObj.tracks.items) {
          filteredResponse.push({
            artist: elm.artists[0].name,
            title: elm.name,
            id: elm.id,
            img: elm.album.images[0].url,
            createdBy: loggedUser,
          });
        }
        return filteredResponse;
      })
      .then((filteredResponse) => {
        setSearchResults(filteredResponse);
        console.log({ filtered: filteredResponse });
      })
      .catch((error) => console.log(error));

    // const response = TEST_RESPONSE.tracks.items;
    // const filteredResponse = [];
    // for (const elm of response) {
    //   filteredResponse.push({
    //     artist: elm.artists[0].name,
    //     title: elm.name,
    //     id: elm.id,
    //   });
    // }
    // setSearchResults(filteredResponse);
  };
  const handleClickTune = (newTune: INewTune) => {
    setSelectedTune(newTune);
    setSongInput(`${newTune.artist}: ${newTune.title}`);
  };

  return (
    <NewTuneContext.Provider
      value={{
        handleClickPostNewTune,
        handleClickSearch,
        searchResults,
        handleClickTune,
        selectedTune,
        setSongInput,
        songInput,
        setCommentInput,
        commentInput,
      }}
    >
      {children}
    </NewTuneContext.Provider>
  );
}

export const useNewTune = () => {
  return useContext(NewTuneContext);
};
export default NewTuneProvider;
