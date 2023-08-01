import React from "react";
import FeedCard from "../../../../Componants/FeedCard";
import { useFeed } from "../../../../providers/feed-provider";
import { INewTune } from "../../../../Interfaces/feed";

function Feed() {
  const { taggedCards } = useFeed();

  return (
    <div>
      <div className="m-auto content-container">
        {taggedCards.map((tune: INewTune, index: number) => {
          return <FeedCard key={index} tune={tune} />;
        })}
      </div>
    </div>
  );
}
export default Feed;
