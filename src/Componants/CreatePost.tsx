import React, { useState } from "react";
import Button from "./Button";

function CreatePost() {
  return (
    <div className="border-2 p-4 flex flex-col">
      <div>
        <form className="p-4 flex flex-col" action="">
          <label className="text-2xl py-4">Song:</label>
          <input
            className="border-2 w-4/6 p-2"
            placeholder="Search..."
            type="search"
            name=""
            id=""
          />

          <Button btnType="submit" label="+ Create Post" />
        </form>
        <form action="" className="p-4 flex flex-col">
          <label className="text-2xl">Add a comment:</label>
          <input className="border-2 h-28 w-80" type="text" name="" id="" />
          <button
            className="bg-indigo-400 border-2 rounded-md p-2 my-4 w-40 text-center"
            type="submit"
          >
            +Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
