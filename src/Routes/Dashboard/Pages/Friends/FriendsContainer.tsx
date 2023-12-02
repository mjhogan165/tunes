import React from "react";
import { useEffect } from "react";
import { getAccounts } from "../../../../api-calls/get-accounts";
import {
  IFriendRequest,
  useFriends,
} from "../../../../providers/friends-provider";
import { User } from "../../../../Interfaces/user";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";

function Friends() {
  return (
    <div>
      <p>Friends</p>
    </div>
  );
}
export default Friends;
