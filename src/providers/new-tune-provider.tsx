import React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import { childrenType } from "../Interfaces/global";
import createNewTune from "../api-calls/create-newtune";
import { INewTune } from "../Interfaces/feed";
import { toast } from "react-hot-toast";
import getToken from "../api-calls/get-token";
import { searchTrack } from "../api-calls/search";
import { useRequiredUser } from "./auth-provider";

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
  handleChangeTagged: (e: React.SyntheticEvent) => void;
  setSelectTaggedValue: React.Dispatch<React.SetStateAction<string>>;
  selectTaggedValue: string;
}
const NewTuneContext = createContext({} as NewTuneInterface);

function NewTuneProvider({ children }: childrenType) {
  console.log("Render: *NewTuneProvider");
  const [token, setToken] = useState("");
  const [selectedTune, setSelectedTune] = useState<INewTune>({
    artist: "",
    title: "",
    id: "",
    createdBy: "",
    tagged: "",
  });
  const [songInput, setSongInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [searchResults, setSearchResults] = useState<INewTune[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [selectTaggedValue, setSelectTaggedValue] = useState("");
  const { userName } = useRequiredUser();
  useEffect(() => {
    const ifToken = localStorage.getItem("token");
    if (ifToken && !refresh) {
      setToken(ifToken);
    } else {
      getToken()
        .then((result) => result.json())
        .then((token) => {
          setToken(token.access_token);
          localStorage.setItem("token", token.access_token);
          return token;
        });
    }
  }, [refresh]);
  const handleChangeTagged = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLSelectElement;
    setSelectTaggedValue(target.value);
  };
  const handleClickPostNewTune = (
    e: React.SyntheticEvent,
    tuneObj: INewTune
  ) => {
    e.preventDefault();
    if (tuneObj) {
      tuneObj.comment = commentInput;
      tuneObj.tagged = selectTaggedValue;
      createNewTune(tuneObj)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .catch((err) => toast.error(err))
        .finally(() => {
          toast.success("Tune Posted!");
          setSearchResults([]);
          setSongInput("");
          setCommentInput("");
        });
    } else {
      toast.error("Please select tune");
    }
  };

  const handleClickSearch = async (e: React.SyntheticEvent, input: string) => {
    e.preventDefault();

    searchTrack(input, token)
      .then((response) => {
        if (!response.ok) {
          toast.error(response.status + "Search failed: please try again");
          setRefresh(!refresh);
          throw new Error("API Error: Refresh Token");
        }
        return response.json();
      })
      .then((trackObj) => {
        const filteredResponse = [];
        for (const elm of trackObj.tracks.items) {
          filteredResponse.push({
            artist: elm.artists[0].name,
            title: elm.name,
            id: elm.id,
            img: elm.album.images[0].url,
            createdBy: userName,
          });
        }
        return filteredResponse;
      })
      .then((filteredResponse) => {
        setSearchResults(filteredResponse);
      })
      .catch((error) => toast.error(error));
  };
  const handleClickTune = (newTune: INewTune) => {
    setSelectedTune(newTune);
    setSearchResults([]);
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
        handleChangeTagged,
        setSelectTaggedValue,
        selectTaggedValue,
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
