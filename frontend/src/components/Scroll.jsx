import React from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";

function Scroll({ messages }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="">
      <ScrollableFeed className="flex flex-col gap-2 md:p-2 w-full">
        {messages &&
          messages.map((message, index) => (
            <p
              className={`${
                message.sender._id === user._id
                  ? "ml-auto text-white bg-green-900 min-w-[50px]"
                  : " text-white bg-black min-w-[60px]"
              }  p-2 rounded`}
              style={{ width: `${message.content.length * 13}px` }}
              key={index}
            >
              {message.content}
            </p>
          ))}
      </ScrollableFeed>
    </div>
  );
}

export default Scroll;
