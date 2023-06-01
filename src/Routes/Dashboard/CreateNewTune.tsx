import React, { useState, useEffect } from "react";
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
  useEffect(() => {
    console.log("CREATE");
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg sm:p-6 mb-4 p-4 flex flex-col max-w-xl m-auto">
      <div>
        <form className="p-4 flex flex-col" action="">
          <div className="flex items-center flex-wrap justify-start">
            <label className="text-xl font-medium py-4 pr-2">Song:</label>
            {/* <span className="text-lg ">{selectedTune.title} </span> */}
            <span className="text-lg ">{selectedTune.title} </span>
          </div>

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
            disabled={false}
          />

          <label className="text-lg">Add a comment:</label>
          <textarea
            className="border-2 h-28 p-1"
            maxLength={140}
            name=""
            id=""
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <Button
            btnType="submit"
            label="+ Post NewTune"
            handleClick={(e) => handleClickPostNewTune(e, selectedTune)}
            disabled={false}
          />
        </form>
      </div>
    </div>
  );
}

export default CreateNewTune;
