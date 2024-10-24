import { Button } from "../components/ui/Button.jsx";
import * as React from "react";

import { ScrollArea } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";
import { useEffect } from "react";
import { useState } from "react";
import {
  initWorker,
  removeWorker,
  updateRewards,
  updateVotingMapping,
  withdrawRewards,
  getWorker,
  getRewards,
  getVotedOption,
  getAllWorkersRewards,
} from "../lib/worker.js";



//fetch from postgres

export function ScrollView() {
  const [posts, setPosts] = useState([]);
  const be_url = "http://localhost:8000/data/all_posts";

  ////// We need List of all the Distributor Addresses.... (So that we can fetch all the Post corresponding to all the distributors)

  useEffect(() => {
    let allAddresses = [];
    const f = async () => {
      // let data = await fetch(be_url, {
      //   method: "GET",
      // });
      let data = []; // List of all Posts....
      for (let index = 0; index < allAddresses.length; index++) {
        const distributorAddress = allAddresses[index];
        let post = await Distributor.getAllPosts(distributorAddress);
        data.push(post);
      }
      // data = await data.json();
      console.log("data", data);
      setPosts(data);
    };

    // f();
  }, [posts]);

  const handleVotes = async (postId) => {
    return await Distributor.getTotalVotesOnPost(postId);
  };

  const handleOptions = async (postId) => {
    return await Distributor.getAllOptions(postId);
  };

  return (
    <ScrollArea className="h-screen w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Posts</h4>
        {posts &&
          posts.map((post) => (
            <>
              <div key={post.id} className="text-sm">
                <div className="w-30 h-[45vh] border-2 bg-black">
                  {post.content}
                  <div className="flex gap-2">
                    {/* <img
                      src={post.options[0].image_url}
                      alt="noimg"
                      className="w-20 w-30"
                    />
                    <div className="w-20 w-30">option 1</div>
                    <div className="w-20 w-30">option 3</div> */}
                    {handleOptions(post.id).map((option) => {
                      return (
                        <div>
                          {/* IS THIS CORRECT- RED FLAG */}
                          {option}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <Button variant="destructive">Vote</Button>
                  <p>{handleVotes(post.id)}</p>
                </div>
              </div>
              <Separator className="my-2" />
            </>
          ))}
      </div>
    </ScrollArea>
  );
}
