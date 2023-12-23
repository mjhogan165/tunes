import React from "react";
import FeedCard from "../../../../Componants/FeedCard";
import { useFeed } from "../../../../providers/feed-provider";
import { INewTune } from "../../../../Interfaces/feed";
import { TEST_RESPONSE } from "../../../../constants";
function Feed() {
  const { tuneCards } = useFeed();
  // console.log({ taggedCards: taggedCards });
  return (
    <div>
      <div className="m-auto content-container">
        {tuneCards.map((tune: INewTune, index: number) => {
          return <FeedCard key={index} tune={tune} />;
        })}
      </div>
    </div>
  );
}
export default Feed;
