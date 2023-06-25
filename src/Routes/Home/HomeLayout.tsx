import React, { useEffect, useState } from "react";
import { Outlet, NavLink, Navigate } from "react-router-dom";
import { useAuth } from "../../providers/auth-provider";
import Loading from "../../Componants/Loading";
import { getAccounts } from "../../api-calls/get-accounts";
import { User } from "../../Interfaces/user";

function HomeLayout() {
  const { isLoading, user } = useAuth();
  const [isValid, setIsValid] = useState(false);
  console.log("Render: HomeLayout");
  // let maybeUser = localStorage.getItem("user");
  // if (maybeUser) {
  //   maybeUser = JSON.parse(maybeUser);
  //   getAccounts()
  //     .then((res) => res.json())
  //     .then((accounts) => {
  //       const foundUser: User = accounts.find(
  //         (elm: User) => elm.userName === maybeUser
  //       );
  //       if (foundUser) {
  //         setIsValid(true);
  //       } else localStorage.removeItem("user");
  //     });
  // }

  // useEffect(() => {
  //   if (maybeUser) {
  //     maybeUser = JSON.parse(maybeUser);
  //     getAccounts()
  //       .then((res) => res.json())
  //       .then((accounts) => {
  //         const foundUser: User = accounts.find(
  //           (elm: User) => elm.userName === maybeUser
  //         );
  //         if (foundUser) {
  //           setIsValid(true);
  //         } else localStorage.removeItem("user");
  //       });
  //   }
  // }, []);
  // if (isValid) {
  //   return <Navigate to="/dashboard/feed" replace />;
  // }

  if (user) {
    // console.log("HomeLayout: has user");
    // getAccounts()
    //   .then((res) => res.json())
    //   .then((accounts) => {
    //     const foundUser: User = accounts.find(
    //       (elm: User) => elm.userName === maybeUser
    //     );
    //     if (foundUser) {
    //       console.log("userfound");
    //       setIsValid(true);
    //     }
    //   });
    return <Navigate to="/dashboard/feed" replace />;
  } else console.log("HomeLayout: NO user");
  console.log(user);
  return (
    <div>
      <section className="flex content-between justify-center gap-6 items-center">
        <NavLink to="feed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-20 h-20"
          >
            <path
              fillRule="evenodd"
              d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z"
              clipRule="evenodd"
            />
          </svg>
        </NavLink>
        <h1 className="text-2xl font-semibold text-center my-10">
          Welcome to NewTunes!
        </h1>
      </section>
      <Outlet />
      {isLoading && <Loading />}
    </div>
  );
}

export default HomeLayout;
