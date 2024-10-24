import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WorkerFeed from "./WorkerFeed";
import WorkerDetails from "./WorkerDetails";

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.type != "worker") {
      navigate("/home");
    }
  }, []);

  return (
    <div className="flex gap-3 justify-center">
      <div className="w-[75vw]">
        <WorkerFeed />
      </div>
      <div className="right-0 w-[20vw] h-screen sticky">
        <WorkerDetails />
      </div>
    </div>
  );
};

export default WorkerDashboard;
