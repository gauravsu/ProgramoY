import { GlareCard } from "../components/ui/glare-card";
import React from "react";
import { GeminiEffect } from "./GeminiEffect";
import { Navbar } from "./Navbar";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleReg = () => {
    navigate("/lit");
  };

  useEffect(() => {
    console.log("reached here...");
  }, []);
  return (
    <>
      {/* TODO: hardcoded postion, fix later */}
      <div className="fixed z-30 top-2 right-2 bg-black mr-4 mt-3">
        <Button
          onClick={handleReg}
          className="inline-flex h-[72px] text-xl w-[132px] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white"
        >
          Register
        </Button>
      </div>{" "}
      <div className="fixed top-[85vh] left-[40.5vw] z-30 h-[15vh]">
        <Navbar />
      </div>
      <div>
        <GeminiEffect />
      </div>
    </>
  );
};

export default LandingPage;
