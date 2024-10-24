import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GeneralDashboard } from "./GeneralDashboard";
import { addPost } from "../lib/distributorFunctions";

const DistributorDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  if (!user) {
    navigate("/");
  }

  useEffect(() => {
    console.log("getting all posts from the backend to send to blockchain..!");
    async function sync() {
      try {
        const address = JSON.parse(localStorage.getItem('pkp')).ethAddress;
        console.log("address", address);

        const posts_endpoint = `http://192.168.45.90:8000/posts/distributor/${address}`
        const posts_for_this_distributor = await fetch(posts_endpoint, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        })
        console.log("posts for this distributor", posts_for_this_distributor);
        setPosts(posts_for_this_distributor);

        const postIdsList = posts.map((post) => post.id);
        const postDescriptionList = posts.map((post) => post.content);

        let optionIdsList = [];
        let optionImgsList = [];
        for (const post in posts) {
          let option_ids = [];
          let option_imgs = [];
          for (const option in post.options) {
            option_ids.push(option.id)
            option_imgs.push(option.image_url);
          }
          optionIdsList.push(option_ids);
          optionImgsList.push(option_imgs);
        }
        const distributor_address = JSON.parse(localStorage.getItem("pkp")).ethAddress;
        const tx = await addPost(postIdsList, postDescriptionList, optionIdsList, optionImgsList, distributor_address);
        console.log("added posts", tx);


        //send this to contract
      } catch (err) {
        console.log("error:", err);
      }
    }

    // sync();
  }, []);

  return (
    <div className="flex mt-4 h-[50vh]">
      <GeneralDashboard posts_list={posts} />
    </div>
  );
};

export default DistributorDashboard;
