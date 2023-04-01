import React from "react";
import { useState } from "react";
import { toggle } from "../../../../functions";
import { useRequiredUser } from "../../../../providers/auth-provider";
import { IFriendRequest } from "../../../../providers/friends-provider";
import { returnFriend } from "../Friends";
import Button from "../../../../Componants/Button";
import IncomingFriendRequest from "./IncomingFriendRequest";

type AllFriendsDropBarProps = {
  array: IFriendRequest[];
  label: string | JSX.Element;
};
function AllFriendsDropBar({ array, label }: AllFriendsDropBarProps) {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const user = useRequiredUser();
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        {" "}
        <h1 className="text-xl font-semibold my-4">{label}</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 inline-block cursor-pointer"
          onClick={() => setShowSubMenu(toggle(showSubMenu))}
          //   onClick={() => setToggle(() => toggle(toggleValue))}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      {showSubMenu && array && (
        <div>
          {array.map((request, index) => {
            return <div key={index}>{returnFriend(request, user)}</div>;
          })}
        </div>
      )}
    </div>
  );
}

export default AllFriendsDropBar;
