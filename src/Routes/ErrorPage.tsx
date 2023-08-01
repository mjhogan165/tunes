import React from "react";
import { useRouteError } from "react-router-dom";

interface errors {
  statusText: string;
  message: string;
}
export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>An unexpected error has occurred</p>
    </div>
  );
}
