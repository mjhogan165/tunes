import React from "react";
import { INewTune } from "../Interfaces/feed";
import { useNewTune } from "../providers/new-tune-provider";

type SearchTuneSubMenu = {
  result: INewTune;
};

function SearchTuneSubMenu({ result }: SearchTuneSubMenu) {
  const { artist, title, id } = result;
  const { handleClickTune, selectedTune } = useNewTune();
  const isSelected = selectedTune === result;
  return (
    <div
      onClick={() => handleClickTune(result)}
      className={`border-solid border-2 border-gray-30 ${
        isSelected ? "bg-indigo-400" : ""
      } hover:bg-indigo-400 active:bg-indigo-600 p-2 cursor-pointer`}
    >
      <span className="font-semibold text-lg">{artist + ": "}</span>
      <span>{title}</span>
    </div>
  );
}

export default SearchTuneSubMenu;
