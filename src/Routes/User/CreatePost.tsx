import React, { useState } from "react";
import Button from "../../Componants/Button";

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

          <Button
            btnType="submit"
            label="Search"
            handleClick={() => console.log("void")}
          />
        </form>
        <form action="" className="p-4 flex flex-col">
          <label className="text-2xl">Add a comment:</label>
          <input className="border-2 h-28 w-80" type="text" name="" id="" />
          <Button
            btnType="submit"
            label="+ Create Post"
            handleClick={() => console.log("void")}
          />
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
