import React from "react";
import { INewTune } from "../Interfaces/feed";

interface ICardProps {
  key: number;
  tune: INewTune;
  tagged?: string;
}
function CreateNewCard({ tune }: ICardProps) {
  const { artist, title, comment, img, createdBy, tagged } = tune;

  const artistDiv = artist ? (
    <h2 className="text-lg font-bold truncate">{artist}</h2>
  ) : (
    <div className="text-lg font-bold text-neutral-400 w-full h-7">Artist</div>
  );
  const titleDiv = title ? (
    <h3 className="text-base font-semibold">{title}</h3>
  ) : (
    <div className="text-lg font-bold w-full h-7 text-neutral-300">Title</div>
  );

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Create New Tune</h1>
      <h3 className=" text-center text-lg p-2">
        Search for a song to share with your friends!
      </h3>
      <div className="bg-white rounded-2xl p-2 shadow-lg sm:p-6 mb-4">
        <div className="flex items-center text-xl"></div>
        <p className="text-base p-2 break-words">{comment}</p>
        <div className="border-2 border-transparent flex gap-4 items-center w-full justify-start p-2 rounded-2xl ">
          <div className="basis-32 h-32 flex-none overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
            {img && (
              <img className="object-cover w-full" src={img} alt="imagePH" />
            )}
          </div>
          <div className="flex-col w-full">
            {artistDiv}
            {titleDiv}
          </div>
        </div>
        <div className="">
          {tagged && <span className="text-gray-600 pl-3">#{tagged}</span>}
        </div>
      </div>
    </div>
  );
}

export default CreateNewCard;
