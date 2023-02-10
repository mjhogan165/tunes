import React from "react";
import Card from "../../Componants/Card";
import CreatePost from "../../Componants/CreatePost";
import { getSongs } from "../../api-calls/get-songs";
import { useEffect } from "react";
import { useUser } from "../../providers/user-provider";
import { SongCard } from "../../Interfaces/";

function Feed() {
  const { songCards } = useUser();

  return (
    <div className="">
      <CreatePost />
      <div>
        {songCards.map((song: SongCard, index: number) => {
          return (
            <Card
              key={index}
              artist={song.artist}
              title={song.title}
              comment={song.comment}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Feed;
