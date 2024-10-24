import { useEffect, useState } from "react";
import { Button } from "./Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { useSelector } from "react-redux";
import { Input } from "./input";

export function PostTab({ post }) {
  console.log(post);
  var best_option = null;
  if(post.done){
    let max_voted = -1;
    let max_votes = -1;
    for (let i = 0; i < post.options.length; i++) {
      if (post.options[i].votes > max_votes) {
        best_option=post.options[i];
        max_votes = post.options[i].votes;
        max_voted = i;
      }
    }
  }

  const get_post_winner = async ()=>{

    try{
      const distributor_address = JSON.parse(localStorage.getItem("pkp"))?.ethAddress;
      const distributor_address_to_id_endpoint = `http://localhost:8000/distributor/id_from_address/${distributor_address}`
      let distributor = await fetch(distributor_address_to_id_endpoint, {
        method:"GET"
      });
      console.log("here");
      distributor = await distributor.json();
      const distributor_id = distributor.id;
      const post_done_endpoint = `http://localhost:8000/distributor/post_done/${post.id}`
  
      await fetch(post_done_endpoint, {
        method: "PATCH",
        headers: {
          'Content-Type':"application/json"
        },
        distributor_id:distributor_id
      })
      let max_voted = -1;
      let max_votes = -1;
      for (let i = 0; i < post.options.length; i++) {
        if (post.options[i].votes > max_votes) {
          setWinnerPost(post);
          max_votes = post.options[i].votes;
          max_voted = i;
        }
      }
    }catch(err){
      console.log("cannot fetch post data");
    }

  }


  const handleClose = async ()=>{
    if(post.done) return;
    await get_post_winner();
  }
  return (
    <Tabs defaultValue="post" className="w-[350px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="post">Post</TabsTrigger>
        <TabsTrigger value="winner">Winner</TabsTrigger>
      </TabsList>
      <TabsContent value="post">
        <Card>
          <CardHeader>
            <CardTitle>Post</CardTitle>
            <CardDescription>{post.content}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {post.options.map((option) => (
              <div className="h-[32px] w-[42px] flex gap-2">
                <img src={option.image_url} />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button onClick={handleClose}>Close</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="winner">
        <Card>
          <CardHeader>
            <CardTitle>Winner</CardTitle>
            <CardDescription>Status of the post is...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {post.done ? (
              <div className="h-[112px] flex">
                <div className="flex gap-3 justify-center items-center">
                  <img
                    className="h-[80px]"
                    src={best_option?.image_url}
                  />
                  <p>{best_option.votes}</p>
                </div>
              </div>
            ) : (
              <div className="h-[112px]">
                <p>Not yet completed</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Input className="" placeholder="Feedback"/>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
