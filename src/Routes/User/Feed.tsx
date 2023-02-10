import React from "react";
import Card from "../../Componants/Card";
import { useUser } from "../../providers/user-provider";
import { SongCard } from "../../Interfaces/forms";

function Feed() {
  const { songCards } = useUser();

  return (
    <div className="">
      <div>
        {songCards.map((song: SongCard, index: number) => {
          return (
            <Card
              key={index}
              artist={song.artist}
              title={song.title}
              img={song.img}
              comment={song.comment}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Feed;
