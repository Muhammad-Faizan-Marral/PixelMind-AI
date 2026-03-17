"use client";

import React, { useMemo, useRef, useState } from "react";

const CONFIDENCE_THRESHOLD = 0.5;

const Page = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgNaturalSize, setImgNaturalSize] = useState({ width: 0, height: 0 });
  const [imgRenderedSize, setImgRenderedSize] = useState({ width: 0, height: 0 });

  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const imageUrl = URL.createObjectURL(selectedFile);

    setFile(selectedFile);
    setPreview(imageUrl);
    setResult([]);
    setImgNaturalSize({ width: 0, height: 0 });
    setImgRenderedSize({ width: 0, height: 0 });
  };

  const handleDetect = async () => {
    if (!file) {
      alert("First select image !");
      return;
    }

    try {
      setLoading(true);
      setResult([]);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/detect", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("API Error:", data);
        alert(data?.error || "Detection failed");
        return;
      }

      if (Array.isArray(data)) {
        setResult(data);
      } else {
        setResult([]);
        console.warn("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Frontend Error:", error);
      alert("Please Try again .");
    } finally {
      setLoading(false);
    }
  };

  const handleImageLoad = (e) => {
    const img = e.target;

    setImgNaturalSize({
      width: img.naturalWidth,
      height: img.naturalHeight,
    });

    setImgRenderedSize({
      width: img.clientWidth,
      height: img.clientHeight,
    });
  };

  const filteredPredictions = useMemo(() => {
    return result.filter((item) => {
      const score = item?.confidence_score ?? 0;
      const region = item?.region;

      const validRegion =
        region &&
        typeof region.top_left_x === "number" &&
        typeof region.top_left_y === "number" &&
        typeof region.bottom_right_x === "number" &&
        typeof region.bottom_right_y === "number" &&
        region.bottom_right_x > region.top_left_x &&
        region.bottom_right_y > region.top_left_y;

      return score >= CONFIDENCE_THRESHOLD && validRegion;
    });
  }, [result]);

  const overlayBoxes = useMemo(() => {
    if (
      !imgNaturalSize.width ||
      !imgNaturalSize.height ||
      !imgRenderedSize.width ||
      !imgRenderedSize.height
    ) {
      return [];
    }

    const scaleX = imgRenderedSize.width / imgNaturalSize.width;
    const scaleY = imgRenderedSize.height / imgNaturalSize.height;

    return filteredPredictions.map((item, index) => {
      const { region } = item;

      const left = region.top_left_x * scaleX;
      const top = region.top_left_y * scaleY;
      const width = (region.bottom_right_x - region.top_left_x) * scaleX;
      const height = (region.bottom_right_y - region.top_left_y) * scaleY;

      return {
        id: `${item.object_name}-${index}`,
        label: item.object_name,
        confidence: item.confidence_score,
        left,
        top,
        width,
        height,
      };
    });
  }, [filteredPredictions, imgNaturalSize, imgRenderedSize]);

  return (
    <div className="min-h-screen  text-white flex items-center justify-center p-6 font-display">
      <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2">Object Detection App</h1>
        <p className="text-white/70 mb-6">
          Image upload karo aur detected objects ke bounding boxes dekho
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4 block w-full text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-black hover:file:bg-gray-200"
            />

            <button
              onClick={handleDetect}
              disabled={loading || !file}
              className="rounded-xl bg-white px-5 py-3 text-black font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Detecting..." : "Upload & Detect"}
            </button>

          
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
              <h2 className="text-lg font-semibold mb-3">Detected Objects</h2>

              {filteredPredictions.length > 0 ? (
                <div className="space-y-3">
                  {filteredPredictions.map((item, index) => (
                    <div
                      key={`${item.object_name}-${index}`}
                      className="rounded-lg border border-white/10 bg-black/30 p-3"
                    >
                      <p className="font-medium">
                        Label:{" "}
                        <span className="text-green-400">
                          {item.object_name}
                        </span>
                      </p>
                      <p className="text-sm text-white/80">
                        Confidence: {(item.confidence_score * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-white/60 break-all">
                        Region: ({item.region.top_left_x}, {item.region.top_left_y}) → (
                        {item.region.bottom_right_x}, {item.region.bottom_right_y})
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/60">
                  No strong detection found.
                </p>
              )}
            </div>
          </div>

          <div>
            {preview ? (
              <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                <div
                  className="relative inline-block w-full overflow-hidden rounded-xl"
                  style={{ lineHeight: 0 }}
                >
                  <img
                    ref={imgRef}
                    src={preview}
                    alt="Preview"
                    onLoad={handleImageLoad}
                    className="w-full max-h-[500px] object-contain rounded-xl"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      width: imgRenderedSize.width || "100%",
                      height: imgRenderedSize.height || "100%",
                    }}
                  >
                    {overlayBoxes.map((box) => (
                      <div
                        key={box.id}
                        className="absolute border-2 border-red-500"
                        style={{
                          left: `${box.left}px`,
                          top: `${box.top}px`,
                          width: `${box.width}px`,
                          height: `${box.height}px`,
                        }}
                      >
                        <span className="absolute -top-7 left-0 rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white whitespace-nowrap">
                          {box.label} ({(box.confidence * 100).toFixed(1)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 text-sm text-white/60">
                  {imgNaturalSize.width > 0 && (
                    <p>
                      Original Size: {imgNaturalSize.width} × {imgNaturalSize.height}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 text-white/40">
                Image preview 
              </div>
            )}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Page;