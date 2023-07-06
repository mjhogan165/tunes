import React from "react";
import { useFeed } from "../../../../providers/feed-provider";
import FeedCard from "../../../../Componants/FeedCard";
import { INewTune } from "../../../../Interfaces/feed";
export default function MyPosts() {
  const { postedCards } = useFeed();

  return (
    <div>
      <div className="m-auto content-container">
        {postedCards.map((tune: INewTune, index: number) => {
          return <FeedCard key={index} tune={tune} />;
        })}
      </div>
    </div>
  );
}
