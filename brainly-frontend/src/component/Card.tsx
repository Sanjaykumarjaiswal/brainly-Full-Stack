import axios from "axios";
import { BACKEND_URL } from "../config";
import DeleteIcon from "./Icon/DeleteIcon";
import { ShareIcon } from "./Icon/shareIcon";
import { useEffect } from "react";
import YoutubeIcon from "./Icon/YoutubeIcon";
import TwitterIcon from "./Icon/TwitterIcon";

interface CardProps {
  id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
  refresh?: () => void;
}

export const Card = ({ id, title, link, type, refresh }: CardProps) => {
  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.head.appendChild(script);

      return () => {
        const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [type]);
  async function deleteItem() {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(BACKEND_URL + "/api/v1/content", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { contentId: id },
      });
      if (refresh) refresh();
    } catch {
      alert("Failed to delete item");
    }
  }

  const typeIcon = type === "youtube" ? (
    <span className="text-red-500"><YoutubeIcon /></span>
  ) : (
    <span className="text-blue-400"><TwitterIcon /></span>
  );

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-md min-h-56 max-w-xs flex flex-col hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {typeIcon}
          <span className="font-semibold text-lg text-gray-800 truncate max-w-[8rem]" title={title}>{title}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <button className="hover:text-purple-500 transition" title="Share"><ShareIcon /></button>
          <button onClick={deleteItem} className="hover:text-red-500 transition" title="Delete"><DeleteIcon /></button>
        </div>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-500 truncate mb-2 hover:underline"
        title={link}
      >
        {link.length > 40 ? link.slice(0, 37) + "..." : link}
      </a>
      <div className="flex-1 flex items-center justify-center">
        {type === "youtube" && (() => {
          let videoId = "";
          if (link.includes("youtube.com/watch?v=")) {
            videoId = link.split("v=")[1]?.split("&")[0];
          } else if (link.includes("youtu.be/")) {
            videoId = link.split("youtu.be/")[1]?.split("?")[0];
          }
          return videoId ? (
            <iframe
              className="w-full aspect-video rounded-lg border"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="text-xs text-red-400">Invalid YouTube link</div>
          );
        })()}
        {type === "twitter" && (() => {
          let tweetId = "";
          let username = "";
          const match = link.match(/(?:x\.com|twitter\.com)\/(\w+)\/status\/(\d+)/);
          if (match) {
            username = match[1];
            tweetId = match[2];
          }
          return tweetId && username ? (
            <div className="mt-2 w-full flex justify-center">
              <blockquote className="twitter-tweet" data-theme="light">
                <a href={`https://twitter.com/${username}/status/${tweetId}`}></a>
              </blockquote>
            </div>
          ) : (
            <div className="text-xs text-red-400">Invalid Twitter/X link</div>
          );
        })()}
      </div>
    </div>
  );
};