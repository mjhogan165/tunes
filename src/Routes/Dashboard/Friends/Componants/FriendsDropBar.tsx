import React from "react";
import { useState } from "react";
import { toggle } from "../../../../functions";
import { useRequiredUser } from "../../../../providers/auth-provider";
import { IFriendRequest } from "../../../../providers/friends-provider";
import { returnFriend } from "../Friends";
import Button from "../../../../Componants/Button";
import IncomingFriendRequest from "./IncomingFriendRequest";

type FriendsDropBarProps = {
  array: IFriendRequest[];
  label: string | JSX.Element;
};
function FriendsDropBar({ array, label }: FriendsDropBarProps) {
  const [showSubMenu, setShowSubMenu] = useState(false);
  return (
    <div className="bg-white rounded-2xl w-full p-2 shadow-lg sm:p-6 mb-4">
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
            console.log("map");
            return (
              <IncomingFriendRequest request={request} key={index} />

              // <div
              //   key={index}
              //   className="flex items-center justify-between box-border"
              // >
              //   <div>{returnFriend(request, user)}</div>
              //   <div className="flex w-32">
              //     <Button
              //       btnType="button"
              //       label="Accept"
              //       handleClick={() => undefined}
              //     />
              //     <Button
              //       btnType="button"
              //       label="Decline"
              //       handleClick={() => undefined}
              //     />
              //   </div>
              // </div>
              // <FriendRequest key={index} request={request} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FriendsDropBar;
