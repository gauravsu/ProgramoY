import { Button } from "../components/ui/Button.jsx";
import * as React from "react";

import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { useEffect } from "react";
import { useState } from "react";
import { Input } from "../components/ui/input.jsx";

// import {
//   initWorker,
//   removeWorker,
//   updateRewards,
//   updateVotingMapping,
//   withdrawRewards,
//   getWorker,
//   getRewards,
//   getVotedOption,
//   getAllWorkersRewards,
// } from "../lib/worker.js";

import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Terminal } from "lucide-react";

// import * as Distributor from "../lib/distributor.js";
import AnimatedOption from "./AnimatedOption.jsx";
import OptionGrid from "./OptionGrid.jsx";
import { Heart } from "lucide-react";
import PostHeading from "./PostHeading.jsx";

//fetch from postgres

const WorkerFeed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "which is the best wallet?",
      options: [
        {
          id: 1,
          image_url: "/metamask.png",
          votes: 12,
        },
        {
          id: 2,
          image_url: "/phantom.png",
          votes: 34,
        },
        {
          id: 3,
          image_url: "/safe.jpg",
          votes: 90,
        },
      ],
    },
    {
      id: 2,
      content: "which is the best image",
      options: [
        {
          id: 4,
          image_url: "https://storage.googleapis.com/galadriel-assets/20ef1d22-3a0a-46a1-b02a-51904ec555f9.png",
          votes: 12,
        },
        {
          id: 5,
          image_url: "https://storage.googleapis.com/galadriel-assets/3c5498ab-0ff6-4c72-9487-c8e5b8f6571e.png",
          votes: 34,
        },
        {
          id: 6,
          image_url: "https://storage.googleapis.com/galadriel-assets/856e324a-2d51-422f-ac26-4b4d3c150d84.png",
          votes: 90,
        },
      ],
    },
    {
      id: 3,
      content: "which is the best image",
      options: [
        {
          id: 7,
          image_url: "https://storage.googleapis.com/galadriel-assets/4a6c7456-147d-4e64-999e-2bbd29442ad3.png",
          votes: 12,
        },
        {
          id: 8,
          image_url: "https://storage.googleapis.com/galadriel-assets/434d7410-9ada-4b67-a680-15e13684c074.png",
          votes: 34,
        },
        {
          id: 9,
          image_url: "https://storage.googleapis.com/galadriel-assets/e1d17a54-2125-41ce-9848-fea010122cbc.png",
          votes: 90,
        },
      ],
    },
  ]);
  const be_url = "http://localhost:8000/data/all_posts";

  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = (post_id) => {
    if (post_id != selectedPost) return;

    console.log(
      `voting for option id ${selectedOption} for the post id ${selectedPost}`,
    );
  };

  ////// We need List of all the Distributor Addresses.... (So that we can fetch all the Post corresponding to all the distributors)

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(be_url);
        const data = await response.json();
        setPosts(data.posts);
      } catch (err) {
        console.log("could not fetch posts...");
      }
    };

    // getPosts();
  }, [posts]);

 

  const handleSelected = (post_id, option_id) => {
    setSelectedPost(post_id);
    setSelectedOption(option_id);
  };

  return (
    <ScrollArea className="h-screen w-full rounded-md border">
      <div className="p-4 w-full h-full">
        <PostHeading />
        {posts &&
          posts.map((post) => (
            <>
              <div key={post.id} className="text-sm">
                <div className="w-[75vw] h-[55vh]">
                  <Alert className="text-xl">
                    <Terminal className="h-4 w-4" />
                    <div className="flex gap-3 justify-between items-center px-4">
                      <AlertTitle>Somyajeet</AlertTitle>
                      <AlertDescription>
                        <h1>
                          {post.content.substr(
                            0,
                            Math.min(post.content.length, 100),
                          ) + "..."}
                        </h1>
                      </AlertDescription>
                    </div>
                  </Alert>
                  <div className="flex gap-2 justify-between px-10 py-3 items-center">
                    {post.options.map((option) => {
                      return (
                        <div
                          key={option.id}
                          className="shadow-md w-[20vw] h-[20vh]"
                          onClick={() => handleSelected(post.id, option.id)}
                        >
                          <OptionGrid option={option} />
                          <div className="flex justify-between px-4 items-center">
                            <AnimatedOption
                              post_title={post.content}
                              image_url={option.image_url}
                            />
                            {selectedOption === option.id && (
                              <Heart fill="red" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-around px-4 py-3 mx-5">
           
                  <Input className="h-[62px] w-[400px]"placeholder="Feedback"/>
                  <Button
                    variant="destructive"
                    onClick={() => handleVote(post.id)}
                  >
                    Vote
                  </Button>
                </div>
              </div>

              <Separator className="my-2" />
            </>
          ))}
      </div>
    </ScrollArea>
  );
};

export default WorkerFeed;
