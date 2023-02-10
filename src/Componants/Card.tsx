import React from "react";
import { SongCard } from "../Interfaces/forms";

function Card({ artist, title, img }: SongCard) {
  return (
    <div className="border-2 border-slate-200 rounded-sm p-4">
      <h4 className="text-lg font-semibold">UserNdfdame:</h4>
      <p className="text-base">Comment...</p>
      <div className="border-2 border-slate-500 flex items-center w-inherit justify-start p-3 rounded-xl m-6">
        <div className="p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-14 h-14"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <img className="p-4" src={img} alt="imagePH" />
        <div className="p-4 flex-col">
          <h2 className="text-2xl font-bold">{artist}</h2>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
