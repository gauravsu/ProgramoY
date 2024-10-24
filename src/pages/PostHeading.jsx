import React from "react";

import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
const PostHeading = () => {
  const words = [
    {
      text: "Nexsar",
    },
    {
      text: "Voting..!",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex items-center justify-center h-full">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
};

export default PostHeading;
