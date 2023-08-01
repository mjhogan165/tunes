import React from "react";
import { INewTune } from "../Interfaces/feed";
import { useNewTune } from "../providers/new-tune-provider";
import SearchTuneSubMenu from "./SearchTuneSubMenu";

function SearchTuneDropDown() {
  const { searchResults } = useNewTune();
  if (searchResults) {
    return (
      <div className="rounded-sm max-w-md">
        {searchResults.map((result: INewTune, index) => {
          return <SearchTuneSubMenu key={index} result={result} />;
        })}
      </div>
    );
  } else return null;
}
export default SearchTuneDropDown;
