import React from "react";
import Button from "../../../../Componants/Button";
import { useNewTune } from "../../../../providers/new-tune-provider";
import SearchTuneDropDown from "../../../../Componants/SearchTuneDropDown";
import { returnFriend } from "../Friends/FriendsContainer";
import { useFriends } from "../../../../providers/friends-provider";
import FeedCard from "../../../../Componants/FeedCard";
import { INewTune } from "../../../../Interfaces/feed";
import CreateNewCard from "../../../../Componants/CreateNewCard";
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
    handleChangeTagged,
    selectTaggedValue,
    handleInputChange,
    isSearchBtnDisabled,
  } = useNewTune();
  const { userFriendRequests, user } = useFriends();
  const friendUserNames = userFriendRequests.accepted.map((request) => {
    return returnFriend(request, user);
  });

  const localTune = selectedTune ? selectedTune : ({} as INewTune);
  return (
    <div className="m-auto content-container sm:p-6 mb-4">
      <CreateNewCard key={3} tune={localTune} />
      <form className="flex flex-col" action="">
        <div className="flex flex-col bg-white rounded-2xl p-4 shadow-lg mb-4">
          <div className="flex items-center flex-wrap justify-start">
            <label className="text-lg font-bold mb-2"> 1. Search:</label>
            <input
              className="border-2 p-2 w-full"
              placeholder="Title or Artist..."
              type="search"
              name=""
              id=""
              value={songInput}
              onChange={(e) => handleInputChange("search-song", e.target.value)}
            />
          </div>

          {searchResults && <SearchTuneDropDown />}
          <Button
            btnType="submit"
            label="Search"
            handleClick={(e) => handleClickSearch(e, songInput)}
            disabled={isSearchBtnDisabled}
          />
        </div>
        <div className="flex flex-col bg-white p-4 pb-8 rounded-2xl shadow-lg mb-4">
          <h1 className="text-lg font-bold">2. Customize:</h1>
          <label className="py-2">Add a comment:</label>
          <textarea
            className="border-2 h-20 p-1"
            maxLength={140}
            placeholder="i.e Check out this hot new track!"
            name=""
            id=""
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
        </div>
        <div className="flex flex-col bg-white p-4 rounded-2xl shadow-lg">
          <h1 className="text-lg font-bold mb-2">3. Tag and Share:</h1>
          <label className="flex justify-start items-center p-4 text-lg">
            Tag a Friend!
            <select
              className="mx-4 rounded-md border-2 p-1 text-base"
              value={selectTaggedValue}
              onChange={handleChangeTagged}
            >
              <option value={""}>-</option>
              {friendUserNames.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <Button
            btnType="submit"
            label="+ Post NewTune"
            handleClick={(e) => handleClickPostNewTune(e, selectedTune)}
            disabled={false}
          />
        </div>
      </form>
    </div>
  );
  {
    /* <div className="bg-white  rounded-2xl shadow-lg">
        <form className="p-4 flex flex-col" action="">
          <div className="bg-white  rounded-2xl shadow-lg"></div>
          <div className="flex items-center flex-wrap justify-start">
            <label className="text-lg font-bold py-4 pr-2"> 1. Search:</label>
            <span className="text-base font-semibold ">
              {selectedTune.title}{" "}
            </span>
          </div>
          <input
            className="border-2 p-2"
            placeholder="Title or Artist..."
            type="search"
            name=""
            id=""
            value={songInput}
            onChange={(e) => handleInputChange("search-song", e.target.value)}
          />
          {searchResults && <SearchTuneDropDown />}
          <Button
            btnType="submit"
            label="Search"
            handleClick={(e) => handleClickSearch(e, songInput)}
            disabled={isSearchBtnDisabled}
          />
          <h1 className="text-lg font-bold py-4 pr-2">2. Customize:</h1>
          <label className="text-lg">Add a comment:</label>
          <textarea
            className="border-2 h-20 p-1"
            maxLength={140}
            placeholder="i.e Check out this hot new track!"
            name=""
            id=""
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <label className="flex justify-center items-center p-4 text-lg">
            Tag a Friend!
            <select
              className="mx-4 rounded-md border-2 p-1 text-base"
              value={selectTaggedValue}
              onChange={handleChangeTagged}
            >
              {<option value={""}>-</option>}
              {friendUserNames.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <Button
            btnType="submit"
            label="+ Post NewTune"
            handleClick={(e) => handleClickPostNewTune(e, selectedTune)}
            disabled={false}
          />
        </form>
      </div> */
  }
}

export default CreateNewTune;
