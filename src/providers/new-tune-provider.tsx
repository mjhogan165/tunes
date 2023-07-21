import React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import { childrenType } from "../Interfaces/global";
import createNewTune from "../api-calls/create-newtune";
import { INewTune } from "../Interfaces/feed";
import { toast } from "react-hot-toast";
import getToken from "../api-calls/get-token";
import { searchTrack } from "../api-calls/search";
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
  console.log("Render: *NewTuneProvider");
  const [token, setToken] = useState("");
  const [selectedTune, setSelectedTune] = useState<INewTune | null>(null);
  const [songInput, setSongInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [searchResults, setSearchResults] = useState<INewTune[]>([]);
  const [selectTaggedValue, setSelectTaggedValue] = useState("");
  const { userName } = useRequiredUser();
  const [isSearchBtnDisabled, setIsSearchBtnDisabled] = useState(false);

  const ifToken = localStorage.getItem("token");
  const { setRefreshCards, refreshCards } = useFeed();

  const getAndSetToken = () => {
    if (ifToken) {
      console.log("SETTING TOKEN STATE");
      setToken(ifToken);
      return true;
    } else {
      getToken()
        .then((response) => {
          let retriesAttempted = 0;
          if (!response.ok) {
            console.log({ response: response });
            if (response.status > 399) {
              retriesAttempted++;
              return getToken(retriesAttempted);
            } else return response;
          } else {
            return response;
          }
        })
        .then((result) => result.json())
        .then((newToken) => {
          console.log("set");
          setToken(newToken.access_token);
          localStorage.setItem("token", newToken.access_token);
          return newToken;
        })
        .catch((val) => {
          console.log("Caught in gettoken()");
          console.log({ err: val });
        });
      return false;
    }
  };
  useEffect(() => {
    console.log("newtune useEffect");
    getAndSetToken();
  }, []);

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
          setRefreshCards(toggle(refreshCards));
          setSelectedTune(null);
          toast("Good Job!", {
            icon: "👏",
          });
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

  const handleClickSearch = async (e: React.SyntheticEvent, input: string) => {
    const hasToken = localStorage.getItem("token");
    e.preventDefault();
    const is = await getAndSetToken();
    if (is) {
      searchTrack(input, token)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            toast.error(response.status + " Search failed please try again");
            return Promise.reject(response);
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
        .catch((error) => {
          console.log("CAUGHT");
          console.log(error);
        });
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
