import React from "react";
import { useRef } from "react";
import { INewTune } from "../Interfaces/feed";
import { useNewTune } from "../providers/new-tune-provider";
import DropDownItem from "./DropDownItem";

function SearchDropDown() {
  const { searchResults } = useNewTune();
  if (searchResults) {
    return (
      <div className="rounded-sm max-w-md">
        {searchResults.map((result: INewTune, index) => {
          return <DropDownItem key={index} result={result} />;
        })}
      </div>
    );
  } else return null;
}
export default SearchDropDown;
