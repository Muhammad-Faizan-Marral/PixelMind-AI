'use client'
import { Upload, Zap, ArrowDownToLine, Video,Camera,CameraOff,Focus  } from "lucide-react";
import { useState } from "react";

const Main = () => {
    const [isCaptured,setIsCaptured]=useState(false)
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mt-8 w-full md:w-full ">
      <div className="w-full  md:max-w-[36rem]">
        {/* top header live */}
        <div className=" font-display pb-7 w-full max-w-[36rem]  ">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <span className="material-symbols-outlined text-primary ">
                <Video />
              </span>
              Live Feed
            </h3>
            <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-500 text-xs font-bold uppercase tracking-wider">
                Live
              </span>
            </div>
          </div>
        </div>
        {/* main live screen */}
        <div className="w-full max-w-[36rem] min-h-[25rem] lg:h-[30rem]  border-2  border-text-secondary/30 hover:border-primary transition-all duration-700 rounded-2xl bg-surface-primary p-6 text-center"></div>
        {/* bottom live buttons */}
        <div className="flex flex-wrap gap-4 mt-6 font-display w-full max-w-[36rem]  ">
          <button className="flex-1 min-w-[100px] flex items-center justify-center gap-2 bg-primary text-white font-bold  rounded-lg hover:brightness-110 transition-all">
            <span className="material-symbols-outlined">{isCaptured ? <Camera /> : <CameraOff />}</span>
            Stop Camera
          </button>
          <button className="flex-1 min-w-[100px] flex items-center justify-center gap-2 bg-primary/20 text-primary border border-primary/40 font-bold py-3  rounded-lg hover:bg-primary/30 transition-all">
            <span className="material-symbols-outlined"><Focus /></span>
            Take Snapshot
          </button>
        </div>
      </div>


      <div className="relative  w-full md:max-w-[36rem] min-h-[32rem]  lg:h-[36rem] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
     
        <div className="absolute -top-10 -right-10 w-48 h-48 sm:w-64 sm:h-64 animate-[pulse_8s_ease-in-out_infinite] bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-40 blur-[50px] sm:blur-[80px] rounded-full" />
        <div className="absolute bottom-1/4 -left-10 w-48 h-48 sm:w-64 sm:h-64 animate-[pulse_10s_ease-in-out_infinite] bg-[radial-gradient(circle,var(--secondary)_0%,transparent_70%)] opacity-30 blur-[50px] sm:blur-[80px] rounded-full" />
        <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl" />

        {/* Content Layer */}
        <div className="relative z-10 p-6 sm:p-9 flex flex-col h-full">
          <div className="flex items-center justify-between w-full">
            <h1 className="font-display text-2xl text-text-primary">
              Analysis Results
            </h1>
            <button
              title="button"
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-text-primary"
            >
              <ArrowDownToLine size={24} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Main;
