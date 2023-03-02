import React from "react";
import { useRouteError } from "react-router-dom";

interface errors {
  statusText: string;
  message: string;
}
export default function ErrorPage() {
  const error: any = useRouteError();

  // if (error.error.message) {
  //   console.log(error.error.message);
  //   message = error.error.message;
  // }
  console.error(error);
  console.log(error.statusText);

  // console.error((err) => console.log(err));
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, n unexpected error has totally occurred!!!.</p>
      <p>
        <i>{error.status + " "}</i>
      </p>
    </div>
  );
}
