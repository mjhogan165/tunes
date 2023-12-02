import React from "react";
import FeedCard from "../../../../Componants/FeedCard";
import { useFeed } from "../../../../providers/feed-provider";
import { INewTune } from "../../../../Interfaces/feed";

function MyFeed() {
  // const { taggedCards } = useFeed();

  return (
    <div>
      <div className="m-auto content-container">
        <p>myfeed</p>
        {/* {taggedCards.map((tune: INewTune, index: number) => {
          return <FeedCard key={index} tune={tune} />;
        })} */}
      </div>
    </div>
  );
}
export default MyFeed;
