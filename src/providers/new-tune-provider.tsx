import React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import { childrenType } from "../Interfaces/global";
import createNewTune from "../api-calls/create-newtune";
import { INewTune } from "../Interfaces/feed";
import { toast } from "react-hot-toast";
import fetchToken from "../api-calls/fetch-token";
import { fetchTrack } from "../api-calls/fetchTrack";
import { useRequiredUser } from "./auth-provider";
import { toggle } from "../functions";
import { isValidInput, checkRefresh } from "../functions";
import moment from "moment";
import { useFeed } from "./feed-provider";

interface NewTuneInterface {
  handleClickPostNewTune: (
    e: React.SyntheticEvent,
    tuneObj: INewTune | null
  ) => void;
  handleClickSearch: (e: React.SyntheticEvent, input: string) => void;
  searchResults: Array<INewTune> | null;
  handleClickTune: (newTune: INewTune) => void;
  songInput: string;
  setSongInput: React.Dispatch<React.SetStateAction<string>>;
  selectedTune: INewTune | null;
  setCommentInput: React.Dispatch<React.SetStateAction<string>>;
  commentInput: string;
  handleChangeTagged: (e: React.SyntheticEvent) => void;
  setSelectTaggedValue: React.Dispatch<React.SetStateAction<string>>;
  selectTaggedValue: string;
  handleInputChange: (name: string, input: string) => void;
  isSearchBtnDisabled: boolean;
}
const NewTuneContext = createContext({} as NewTuneInterface);

function NewTuneProvider({ children }: childrenType) {
  const [token, setToken] = useState("");
  const [selectedTune, setSelectedTune] = useState<INewTune | null>(null);
  const [songInput, setSongInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [searchResults, setSearchResults] = useState<INewTune[]>([]);
  const [selectTaggedValue, setSelectTaggedValue] = useState("");
  const { userName } = useRequiredUser();
  const [isSearchBtnDisabled, setIsSearchBtnDisabled] = useState(false);

  const { setRefreshCards, refreshCards } = useFeed();
  const ifToken = localStorage.getItem("token");
  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 60 * 60 * 1000 * 0.9);
    if (!ifToken) {
      refreshToken();
    }
  }, []);

  const refreshToken = () => {
    return fetchToken()
      .then((response) => {
        if (!response.ok) {
          console.log({ response: response });
        } else {
          return response;
        }
      })
      .then((result) => result.json())
      .then((newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken.access_token);
      })
      .catch((val) => {
        console.log({ err: val });
      });
  };

  const handleChangeTagged = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLSelectElement;
    setSelectTaggedValue(target.value);
  };

  const handleClickPostNewTune = (
    e: React.SyntheticEvent,
    tuneObj: INewTune | null
  ) => {
    e.preventDefault();
    console.log(tuneObj);
    if (tuneObj) {
      tuneObj.comment = commentInput;
      tuneObj.tagged = selectTaggedValue;
      createNewTune(tuneObj)
        .then((response) => {
          if (response.ok) {
            console.log(response);
            return response.json();
          }
          return response;
        })
        .catch((err) => toast.error(err))
        .finally(() => {
          setSearchResults([]);
          setSongInput("");
          setCommentInput("");
          setRefreshCards(!refreshCards);
          setSelectedTune(null);
        });
    } else {
      toast.error("Please select tune");
    }
  };

  const handleInputChange = (name: string, input: string) => {
    switch (true) {
      case name === "search-song":
        setSongInput(input);
        if (!isValidInput(input)) {
          setIsSearchBtnDisabled(true);
          setSelectedTune({
            artist: "",
            title: "",
            id: "",
            createdBy: "",
            tagged: "",
          });
        } else if (isSearchBtnDisabled) {
          setIsSearchBtnDisabled(toggle(isSearchBtnDisabled));
        }
        break;
      default:
        break;
    }
  };

  const searchTrack = async (input: string, token: string) => {
    let retriesAttempted = 0;
    return fetchTrack(input, token)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          //token fails
          console.log({ FailedResponse: response });
          retriesAttempted++;
          fetchToken()
            .then((response) => {
              if (!response.ok) {
                throw new Error("failed to get token");
              } else return response;
            })
            .then((newToken) => {
              localStorage.setItem("token", newToken.access_token);
              setToken(newToken);
              fetchTrack(input, newToken);
            });
        }
        return response;
      })
      .then((response) => response.json())
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
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickSearch = async (e: React.SyntheticEvent, input: string) => {
    e.preventDefault();
    if (ifToken) {
      searchTrack(input, ifToken);
    }
  };

  const handleClickTune = (newTune: INewTune) => {
    setIsSearchBtnDisabled(true);
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
        handleInputChange,
        isSearchBtnDisabled,
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
