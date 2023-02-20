import React from "react";
import { useRouteError } from "react-router-dom";

interface errors {
  statusText: string;
  message: string;
}
export default function ErrorPage() {
  const error: any = useRouteError();

  // console.error(error);
  // console.log(error.statusText);
  // console.log(error.error.message);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has totally occurred!!!.</p>
      <p>
        {/* <i>{error.statusText || error.message}</i> */}
        <i>{error.status + " " + error.error.message}</i>
      </p>
    </div>
  );
}
