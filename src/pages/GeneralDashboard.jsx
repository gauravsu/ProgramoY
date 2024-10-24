"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { useEffect } from "react";
import { PostTab } from "../components/ui/post-tab";

export function GeneralDashboard() {
  const [posts, setPosts] = useState([
    {
      id: 301,
      content: "which is the best wallet",
      options: [
        {
          id: 90,
          image_url: "/phantom.png",
          votes: 40,
        },
        {
          id: 91,
          image_url: "/metamask.png",
          votes: 50,
        },
        {
          id: 92,
          image_url: "/safe.png",
          votes: 10,
        },
      ],
      done: true,
    },
    {
      id: 302,
      content: "which is the best image",
      options: [
        {
          id: 90,
          image_url: "https://storage.googleapis.com/galadriel-assets/e1d17a54-2125-41ce-9848-fea010122cbc.png",
          votes: 40,
        },
        {
          id: 91,
          image_url: "https://storage.googleapis.com/galadriel-assets/434d7410-9ada-4b67-a680-15e13684c074.png",
          votes: 50,
        },
        {
          id: 92,
          image_url: "https://storage.googleapis.com/galadriel-assets/4a6c7456-147d-4e64-999e-2bbd29442ad3.png",
          votes: 10,
        },
      ],
      done: true,
    },
    {
      id: 303,
      content: "which is the best image",
      options: [
        {
          id: 90,
          image_url: "https://storage.googleapis.com/galadriel-assets/856e324a-2d51-422f-ac26-4b4d3c150d84.png",
          votes: 40,
        },
        {
          id: 91,
          image_url: "https://storage.googleapis.com/galadriel-assets/3c5498ab-0ff6-4c72-9487-c8e5b8f6571e.png",
          votes: 50,
        },
        {
          id: 92,
          image_url: "/https://storage.googleapis.com/galadriel-assets/20ef1d22-3a0a-46a1-b02a-51904ec555f9.png",
          votes: 10,
        },
      ],
      done: false,
    },
  ]);
  useEffect(() => {
    // setPosts(posts_list)
    //call the getData function here
  }, []);

  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Register",
      href: "/home",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-[80vh]",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: `${JSON.parse(localStorage.getItem("pkp"))?.ethAddress.substr(0,7)}..`,
                href: "#",
                icon: (
                  <img
                    src="/metamask.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard posts={posts} />
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Distributor Dashboard
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </a>
  );
};

// Dummy dashboard component with content
const Dashboard = ({ posts }) => {
  return (
    <div className="flex flex-1 h-full overflow-y-auto w-[80vw] ">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-screen py-3">
        <div className="flex gap-2">
          <div className="h-20 w-full flex justify-center items-center rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse">
            Your posts
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 flex-1">
          {posts.map((post) => (
            <div key={post.id}>
              <PostTab post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
