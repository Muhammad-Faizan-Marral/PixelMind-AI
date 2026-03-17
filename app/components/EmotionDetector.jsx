"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Video } from "lucide-react";
import { ScanFace } from "lucide-react";

export default function EmotionDetector() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [dominantEmotion, setDominantEmotion] = useState("");

  useEffect(() => {
    loadModels();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const loadModels = async () => {
    try {
      const MODEL_URL = "/models";

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);

      setModelsLoaded(true);
      startVideo();
    } catch (error) {
      console.error("Model loading error:", error);
    }
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      alert("Camera access error:", error);
    }
  };

  const handleVideoPlay = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const displaySize = {
      width: video.videoWidth || 640,
      height: video.videoHeight || 480,
    };

    canvas.width = displaySize.width;
    canvas.height = displaySize.height;

    faceapi.matchDimensions(canvas, displaySize);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(async () => {
      if (!video || video.paused || video.ended) return;

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks(true)
        .withFaceExpressions();
      
      const resizedResults = faceapi.resizeResults(detections, displaySize);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resizedResults);
      faceapi.draw.drawFaceLandmarks(canvas, resizedResults);
      faceapi.draw.drawFaceExpressions(canvas, resizedResults);

      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        const topEmotion = Object.entries(expressions).reduce((a, b) =>
          a[1] > b[1] ? a : b,
        );

        setDominantEmotion(
          `${topEmotion[0]} (${(topEmotion[1] * 100).toFixed(1)}%)`,
        );
      } else {
        setDominantEmotion("No face detected");
      }
    }, 500);
  };

return (
<div className="w-full max-w-[36rem] flex flex-col items-center justify-center mx-auto">
  {/* Header Section */}
  <div className="font-display pb-6 w-full">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <h3 className="text-2xl font-bold flex items-center gap-3 text-white">
        <span className="p-2 bg-primary/10 rounded-lg text-primary shadow-[0_0_15px_rgba(108,99,255,0.3)]">
          <Video size={24} />
        </span>
        Live Feed
      </h3>
      
      {/* The "Live" Badge - Using Success Green */}
      <div className="flex items-center gap-2 bg-success/10 px-4 py-1.5 rounded-full border border-success/20 shadow-[0_0_10px_rgba(0,245,160,0.1)]">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
        </span>
        <span className="text-success text-[10px] font-bold uppercase tracking-widest">
          Live Now
        </span>
      </div>
    </div>
  </div>

  {/* Loading State */}
  {!modelsLoaded && (
    <div className="flex flex-col items-center gap-2 py-10 animate-pulse">
      <div className="w-12 h-12 border-4 border-surface-secondary border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-medium text-text-secondary font-mono">Loading Neural Models...</p>
    </div>
  )}

  {/* Video Container: Pro Dark Look */}
  <div className="relative w-full aspect-video bg-surface-primary border-2 border-white/5 shadow-2xl rounded-3xl overflow-hidden group">
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      onPlay={handleVideoPlay}
      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
    />
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    
    {/* Techy Scanline Effect Overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,33,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
  </div>

  {/* The Status Button: Dark Modern Glassmorphism */}
  <div className="mt-8 w-full group relative">
    {/* Glow background using primary & secondary colors */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
    
    <button className="relative w-full flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 bg-surface-secondary/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl transition-all hover:translate-y-[-2px] active:scale-[0.98]">
      
      {/* Left: Icon & Text */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/20 rounded-xl text-primary shadow-inner group-hover:scale-110 transition-transform duration-300">
          <ScanFace size={28} />
        </div>
        <div className="flex flex-col items-start text-center sm:text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary font-bold font-mono">
            Analysis Engine
          </span>
          <span className="text-base font-bold text-text-primary font-display">
            Current Emotion
          </span>
        </div>
      </div>

      {/* Right: The actual result badge */}
      <div className="flex items-center gap-3 bg-background px-6 py-3 rounded-xl border border-white/5 min-w-[150px] justify-center shadow-inner">
        <span className={`h-2 w-2 rounded-full transition-colors duration-500 ${dominantEmotion ? 'bg-secondary animate-pulse shadow-[0_0_10px_#00d4ff]' : 'bg-white/10'}`} />
        <span className="text-lg font-mono font-bold text-secondary capitalize tracking-tight">
          {dominantEmotion || "Syncing..."}
        </span>
      </div>
    </button>
  </div>
</div>
);
}
