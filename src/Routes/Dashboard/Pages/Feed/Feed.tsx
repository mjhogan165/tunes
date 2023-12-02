import React from "react";
import { useTestAuth } from "../../../../testauth/TestAuth";

export default function Feed() {
  const testAuth = useTestAuth();

  console.log(testAuth.logout);
  return <div>Feed</div>;
}
