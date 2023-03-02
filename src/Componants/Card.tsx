import React from "react";
import { INewTune } from "../Interfaces/feed";

interface ICardProps {
  key: number;
  tune: INewTune;
}
function Card({ tune }: ICardProps) {
  const { artist, title, id, comment, img, createdBy } = tune;
  return (
    <div className="bg-white rounded-2xl p-2 shadow-lg sm:p-6 mb-4">
      <i className="fa-solid fa-user inline p-2 border-2 rounded-full mr-2"></i>
      <span className="text-lg font-semibold">{createdBy}</span>
      <p className="text-base p-2 break-words">{comment}</p>
      <div className="border-2 border-transparent flex gap-4 items-center w-full justify-start p-2 rounded-2xl ">
        <div className="w-24 md:w-32 overflow-hidden rounded-2xl">
          <img className="object-cover w-full" src={img} alt="imagePH" />
        </div>
        <div className="flex-col">
          <h2 className="text-lg font-bold">{artist}</h2>
          <h3 className="text-base font-semibold">{title}</h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
