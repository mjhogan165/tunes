import React from "react";
import { toggle } from "../functions";
import { useRequiredUser } from "../providers/auth-provider";
import { IFriendRequest } from "../providers/friends-provider";
import { returnFriend } from "../Routes/Dashboard/Friends";
type FriendsDropBarProps = {
  toggleValue: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  array: IFriendRequest[] | null;
};
function FriendsDropBar({
  toggleValue,
  setToggle,
  array,
}: FriendsDropBarProps) {
  const user = useRequiredUser();
  return (
    <div className="bg-white rounded-2xl w-full p-2 shadow-lg sm:p-6 mb-4">
      <div className="flex justify-between items-center">
        {" "}
        <h1 className="text-xl font-semibold my-4">Friends</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 inline-block"
          onClick={() => setToggle(() => toggle(toggleValue))}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      {toggleValue && array && (
        <div>
          {array.map((request, index) => {
            console.log("map");
            return <div key={index}>{returnFriend(request, user)}</div>;
          })}
        </div>
      )}
    </div>
  );
}

export default FriendsDropBar;
