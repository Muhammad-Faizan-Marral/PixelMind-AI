"use client";
import { useState } from "react";
import { Upload, Zap, ArrowDownToLine } from "lucide-react";
import { cloudinary } from "../../service/cloudinary";

const Main = () => {
  const [file, setFile] = useState(null);
  const handleUpload = async () => {
    console.log("Start.....")
    if (!file) return;
   let data = await cloudinary(file)
    console.log(data)
    console.log("End.....")

  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-22 lg:gap-16 mt-8 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      <div className="group relative flex flex-col items-center justify-center w-full max-w-[36rem] min-h-[25rem] lg:h-[30rem] border-2 border-dashed border-text-secondary/30 hover:border-primary transition-all duration-700 rounded-2xl bg-surface-primary p-6 text-center">
        <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="flex-item-center flex-col w-full h-full ">
            <div className="cursor-pointer h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-surface-secondary flex items-center justify-center text-primary scale-100 group-hover:scale-110 transition-all duration-700">
              <Upload className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-text-primary leading-tight">
                Drop your image here
              </h1>
              <p className="text-text-secondary text-sm sm:text-base">
                Support JPG, PNG, WEBP{" "}
                <span className="hidden sm:inline">|</span>{" "}
                <br className="sm:hidden" /> Max 10MB
              </p>
            </div>
          </div>
        </label>

        {/* action <button></button> */}
        <div className="mt-8 absolute -bottom-20 font-mono w-full sm:w-auto ">
          <button
            onClick={handleUpload}
            className="cursor-pointer w-full sm:w-auto bg-gradient-to-r from-primary to-[#8b84ff] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Zap className="w-5 h-5 fill-current" />
            <span>Analyze Image</span>
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: Glassmorphism Result Card */}
      <div className="relative w-full max-w-[29rem] aspect-[3/4] lg:h-[36rem] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
        {/* Animated Orbs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 sm:w-64 sm:h-64 animate-[pulse_8s_ease-in-out_infinite] bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-40 blur-[50px] sm:blur-[80px] rounded-full" />

        <div className="absolute bottom-1/4 -left-10 w-48 h-48 sm:w-64 sm:h-64 animate-[pulse_10s_ease-in-out_infinite] bg-[radial-gradient(circle,var(--secondary)_0%,transparent_70%)] opacity-30 blur-[50px] sm:blur-[80px] rounded-full" />

        {/* Glass Overlay Layer */}
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
