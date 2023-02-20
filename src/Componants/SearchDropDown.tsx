import React from "react";
import { INewTune } from "../Interfaces/feed";
import { useNewTune } from "../providers/new-tune-provider";
import DropDownItem from "./DropDownItem";
// parent wrapper (body)
// export interface OuterSearchResultsInterface {
//   tracks: SearchResultInterface;
// }
// export interface SearchResultInterface {
//   //called tracks
//   href: string;
//   items: Array<ItemInterface>;
//   limit: number;
//   next?: string;
//   offset?: 0;
//   previous?: null | string;
//   total?: number;
// }

function SearchDropDown() {
  const { searchResults } = useNewTune();
  if (searchResults) {
    return (
      <div className=" rounded-sm">
        <div className="max-w-md">
          {searchResults.map((result: INewTune, index) => {
            return <DropDownItem key={index} result={result} />;
          })}
        </div>
      </div>
    );
  } else return null;
}
export default SearchDropDown;
