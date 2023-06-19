import React from "react";
import { useEffect, useState } from "react";
import FeedCard from "../../../../Componants/FeedCard";
import { useFeed } from "../../../../providers/feed-provider";
import { INewTune } from "../../../../Interfaces/feed";
import { useAuth, useRequiredUser } from "../../../../providers/auth-provider";
import { getTunes } from "../../../../api-calls/get-tunes";
import { useLoaderData } from "react-router-dom";
import {
  IFriendRequest,
  useFriends,
} from "../../../../providers/friends-provider";

function Feed() {
  const { tuneCards, setTuneCards, user, taggedCards } = useFeed();
  const { userFriendRequests } = useFriends();
  // const [taggedCards, setTaggedCards] = useState<INewTune[]>([]);
  // const [stringy, setStringy] = useState("");

  // const load = useLoaderData();
  // console.log({ userFriendRequests: userFriendRequests });
  // useEffect(() => {
  //   getTunes()
  //     .then((response) => {
  //       if (!response.ok) {
  //         // console.log("ERROR IN FEED");
  //         throw new Response("Bad Request", { status: 400 });
  //       } else {
  //         // console.log("Feed API call");
  //         return response.json();
  //       }
  //     })
  //     .then((parsedArray) => {
  //       setTuneCards(parsedArray);
  //     });
  // }, [user]);
  // if (tuneCards.length > 0) {
  //   const tagged = tuneCards.filter((card) => {
  //     return card.tagged === user.userName;
  //   });
  //   setTaggedCards(tagged);
  //   console.log(tagged);
  // }
  // const tagged = tuneCards.filter((card) => {
  //   return card.tagged === user.userName;
  // });
  // setTaggedCards([]);
  console.log({ taggedCards: taggedCards });
  return (
    <div className="m-auto content-container">
      {taggedCards.map((tune: INewTune, index: number) => {
        return <FeedCard key={index} tune={tune} />;
      })}
    </div>
    // <div className="m-auto content-container"></div>
  );
  // );
  // return (
  //   <div className="border-2 border-slate-200 rounded-sm p-4">
  //     <h4 className="text-lg font-semibold">UserName:</h4>
  //     <p className="text-base">{"comment"}</p>
  //     <div className="border-2 border-slate-500 flex items-center w-inherit justify-start p-3 rounded-xl m-6">
  //       <div className="p-4">
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           viewBox="0 0 24 24"
  //           fill="currentColor"
  //           className="w-14 h-14"
  //         >
  //           <path
  //             fillRule="evenodd"
  //             d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
  //             clipRule="evenodd"
  //           />
  //         </svg>
  //       </div>
  //       <iframe
  //         style={{ borderRadius: "12", border: "none" }}
  //         src="https://open.spotify.com/embed/track/0r2Bul2NuCViraT2zX1l5j?utm_source=generator"
  //         width="100%"
  //         height="352"
  //         allowFullScreen={false}
  //         allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  //         loading="lazy"
  //       ></iframe>
  //     </div>
  //   </div>
  // );
}
export default Feed;