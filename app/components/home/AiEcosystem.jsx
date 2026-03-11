import React from "react";
import {
  ImagePlus,
  ArrowRight,
  WandSparkles,
  Smile,
  PanelsTopLeft,
} from "lucide-react";
import Link from "next/link";
const AiEcosystem = () => {

  return (
    <div className="bg-surface-primary p-12">
      <div className="flex items-start justify-center flex-col max-w-[44rem]  ">
        <h1 className="font-display text-3xl text-text-primary ">
          Our AI Ecosystem
        </h1>
        <p className="font-mono text-[0.9rem] text-[#8b8ba0] tracking-tight  pt-2.5">
          Everything you need to manipulate, analyze and create stunning digital
          assets with state-of-the-art neural networks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {/* <!-- Card 1 --> */}
        <div className="glass p-8 rounded-2xl group border-[1px] border-text-secondary ease-in-out duration-500  hover:border-primary/50 transition-all ">
          <div className="size-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">
              <ImagePlus />
            </span>
          </div>
          <h3 className="text-xl font-bold mb-3 font-display">
            Image Analyzer
          </h3>
          <p className="text-slate-400 mb-6 leading-relaxed font-sans">
            Extract hidden metadata, identify lighting conditions, and
            understand composition with deep neural analysis.
          </p>
          <Link
            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all font-display"
            ease-in-out
            duration-700
            
            href="/imageanlyzer"
          >
            Try Now{" "}
            <span className="material-symbols-outlined">
              <ArrowRight />
            </span>
          </Link>
        </div>
        {/* <!-- Card 2 --> */}
        <div className="glass p-8 rounded-2xl group border-[1px] border-text-secondary ease-in-out duration-500 hover:border-secondary/50 transition-all">
          <div className="size-14 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">
              <WandSparkles />
            </span>
          </div>
          <h3 className="text-xl font-bold mb-3 font-display">
            AI Image Generator
          </h3>
          <p className="text-slate-400 mb-6 leading-relaxed font-sans">
            Turn simple text descriptions into high-fidelity photorealistic
            images or stylized digital art instantly.
          </p>
          <Link
            className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-4 transition-all ease-in-out duration-700 font-display"
            href="/ai-image-generator"
          >
            Try Now{" "}
            <span className="material-symbols-outlined">
              <ArrowRight />
            </span>
          </Link>
        </div>
        {/* <!-- Card 3 --> */}
        <div className="glass p-8 rounded-2xl group border-[1px] border-text-secondary ease-in-out duration-500 hover:border-primary/50 transition-all">
          <div className="size-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">
              <Smile />
            </span>
          </div>
          <h3 className="text-xl font-bold mb-3 font-display">
            Emotion Detector
          </h3>
          <p className="text-slate-400 mb-6 leading-relaxed font-sans">
            Advanced facial recognition that identifies human sentiments and
            micro-expressions across 12 distinct categories.
          </p>
          <Link
            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all font-display"
            ease-in-out
            duration-700
            href="/emotion-detector"
          >
            Try Now{" "}
            <span className="material-symbols-outlined">
              <ArrowRight />
            </span>
          </Link>
        </div>
        {/* <!-- Card 4 --> */}
        <div className="glass p-8 rounded-2xl group border-[1px] border-text-secondary ease-in-out duration-500 hover:border-secondary/50 transition-all">
          <div className="size-14 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl">
              <PanelsTopLeft />
            </span>
          </div>
          <h3 className="text-xl font-bold mb-3 font-display">
            Object Detection
          </h3>
          <p className="text-slate-400 mb-6 leading-relaxed font-sans">
            Real-time object classification and spatial mapping. Label thousands
            of unique object classes with 99.9% accuracy.
          </p>
          <a
            className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-4 transition-all ease-in-out duration-700 font-display"
            href="/object-detection"
          >
            Try Now{" "}
            <span className="material-symbols-outlined">
              <ArrowRight />
            </span>
          </a>
        </div>
      </div>

      
    </div>
  );
};

export default AiEcosystem;
