"use client";

import React, { useState } from "react";

const YouTubePlayer: React.FC = () => {
  const defaultVideoId = "videoseries?list=PLRH7Kv1Vr04TF6cUlx6f-_Vgn3UIVyZFh";
  const [videoSrc, setVideoSrc] = useState(
    `https://www.youtube.com/embed/${defaultVideoId}&loop=1&iv_load_policy=3&controls=1&modestbranding=1&playsinline=1&color=white`
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const url = new URL(event.target.value);
      let newVideoId;

      // Ensure that the URL is a YouTube URL
      if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
        const vParam = url.searchParams.get("v");
        const listParam = url.searchParams.get("list");

        if (vParam && listParam) {
          newVideoId = `${vParam}?list=${listParam}&loop=1&iv_load_policy=3&controls=1&modestbranding=1&playsinline=1&color=white&autoplay=1`;
        } else if (vParam) {
          newVideoId = `${vParam}?loop=1&iv_load_policy=3&controls=1&modestbranding=1&playsinline=1&color=white&autoplay=1`;
        } else if (listParam) {
          newVideoId = `videoseries?list=${listParam}&loop=1&iv_load_policy=3&controls=1&modestbranding=1&playsinline=1&color=white&autoplay=1`;
        } else {
          throw new Error("URL does not contain a video or playlist ID");
        }
      } else if (url.hostname === "youtu.be") {
        newVideoId = url.pathname.slice(1); // remove the leading "/"
        newVideoId = `${newVideoId}?loop=1&iv_load_policy=3&controls=1&modestbranding=1&playsinline=1&color=white&autoplay=1`;
      } else {
        throw new Error("URL is not a YouTube URL");
      }

      if (newVideoId) {
        const newVideoSrc = `https://www.youtube.com/embed/${newVideoId}`;
        setVideoSrc(newVideoSrc);
      } else {
        throw new Error("URL does not contain a video or playlist ID");
      }
    } catch (error) {
      if (error instanceof Error) {
        // Only alert the message if error is an instance of Error
        alert(`Error: ${error.message}`);
      } else {
        // Otherwise, it's an unknown error type and we should handle it accordingly
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <iframe
        className="w-full h-fit md:w-fit md:h-full border-0 aspect-video"
        src={videoSrc}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <input
        type="text"
        placeholder="Enter YouTube video or playlist URL"
        className="my-7 p-2 border border-gray-300 dark:bg-black opacity-25 hover:opacity-50 delay-75 duration-300 w-full md:w-1/2"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default YouTubePlayer;
