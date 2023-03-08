import React from "react";
import { useRouteError } from "react-router-dom";

interface errors {
  statusText: string;
  message: string;
}
export default function ErrorPage() {
  const error: any = useRouteError();
  console.log("render error");
  // if (error.error.message) {
  //   console.log(error.error.message);
  //   message = error.error.message;
  // }
  // console.error(error.message);
  console.log(error.message);
  console.log({ error });

  // console.error((err) => console.log(err));
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>An unexpected error has totally occurred!!!.</p>
      <p>
        <i>{error.message + " "}</i>
      </p>
    </div>
  );
}
