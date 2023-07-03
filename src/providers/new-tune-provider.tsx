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
import { isValidInput } from "../functions";
import moment from "moment";

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
  handleInputChange: (name: string, input: string) => void;
  isSearchBtnDisabled: boolean;
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
  const [timeTokenFetched, setTimeTokenFetched] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [selectTaggedValue, setSelectTaggedValue] = useState("");
  const { userName } = useRequiredUser();
  const [isSearchBtnDisabled, setIsSearchBtnDisabled] = useState(false);

  console.log({ token: token });
  // useEffect(() => {
  //   const ifToken = localStorage.getItem("token");
  //   if (ifToken && !refresh) {
  //     setToken(ifToken);
  //   } else {
  //     getToken()
  //       .then((result) => result.json())
  //       .then((token) => {
  //         setToken(token.access_token);
  //         localStorage.setItem("token", token.access_token);
  //         return token;
  //       })
  //       .catch((val) => console.log(val));
  //   }
  // }, [refresh]);

  const checkRefresh = (timeFetchedStr: string) => {
    const now = moment();
    const timeFetchedObj = moment(timeFetchedStr);
    const hourLater = moment(timeFetchedObj).add(1, "hours");
    return moment(now).isAfter(hourLater);
  };

  useEffect(() => {
    console.log("newtune useEffect");
    const ifToken = localStorage.getItem("token");
    if (ifToken && !refresh) {
      console.log("SETTING TOKEN");
      setToken(ifToken);
    } else {
      getToken()
        .then((response) => {
          if (!response.ok) {
            console.log({ response: response });
            return Promise.reject(response);
          } else {
            //log timeFetched
            console.log("LOGGING TIME FETCHED");
            const timeToken = moment().format();
            localStorage.setItem("timeTokenFetched", timeToken);
          }
          return response;
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
    e.preventDefault();

    const maybeTimeTokenFetched = localStorage.getItem("timeTokenFetched");
    console.log({ maybeTimeTokenFetched: maybeTimeTokenFetched });
    if (maybeTimeTokenFetched) {
      const needsRefresh = checkRefresh(maybeTimeTokenFetched);
      console.log("CLICKSEARCH");
      console.log({ needsRefresh: needsRefresh });
      if (needsRefresh) {
        setRefresh(needsRefresh);
      }
    }
    if (isValidInput(input)) {
      searchTrack(input, token)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            console.log("not ok");
            toast.error(
              response.status + " Session Timed out: please try again"
            );
            console.log("after toast");
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
