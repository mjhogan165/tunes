import React, { useState } from "react";
import Button from "../../Componants/Button";
import { useNewTune } from "../../providers/new-tune-provider";
import SearchDropDown from "../../Componants/SearchDropDown";
function CreateNewTune() {
  const {
    handleClickPostNewTune,
    handleClickSearch,
    searchResults,
    selectedTune,
    setSongInput,
    songInput,
    commentInput,
    setCommentInput,
  } = useNewTune();

  return (
    <div className="border-2 p-4 flex flex-col max-w-xl m-auto">
      <div>
        <form className="p-4 flex flex-col" action="">
          <label className="text-2xl py-4">Song:</label>
          <input
            className="border-2 p-2"
            placeholder="Search..."
            type="search"
            name=""
            id=""
            value={songInput}
            onChange={(e) => setSongInput(e.target.value)}
          />
          {searchResults && <SearchDropDown />}
          <Button
            btnType="submit"
            label="Search"
            handleClick={(e) => handleClickSearch(e, songInput)}
          />

          <label className="text-xl">Add a comment:</label>
          <textarea
            className="border-2 h-28  p-1"
            name=""
            id=""
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <Button
            btnType="submit"
            label="+ Post NewTune"
            handleClick={(e) =>
              handleClickPostNewTune(e, {
                artist: selectedTune.artist,
                title: selectedTune.title,
                id: selectedTune.id,
                comment: commentInput,
                createdBy: selectedTune.createdBy,
                img: selectedTune.img,
              })
            }
          />
        </form>
      </div>
    </div>
  );
}

export default CreateNewTune;
