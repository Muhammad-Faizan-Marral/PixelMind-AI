"use client";

import React, { useState } from "react";

const Page = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const handleDetect = async () => {
    if (!file) return alert("Pehle image select karo");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/detect", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Frontend Error:", error);
      alert("Kuch error aa gaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2">Object Detection App</h1>
        <p className="text-white/70 mb-6">
          Image upload karo aur API se detection result lo
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-black hover:file:bg-gray-200"
        />

        {preview && (
          <div className="mb-4 overflow-hidden rounded-xl border border-white/10">
            <img
              src={preview}
              alt="Preview"
              className="max-h-[400px] w-full object-contain bg-black"
            />
          </div>
        )}

        <button
          onClick={handleDetect}
          disabled={loading || !file}
          className="rounded-xl bg-white px-5 py-3 text-black font-semibold disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Detecting..." : "Upload & Detect"}
        </button>

        {result && (
          <div className="mt-6">
            <h2 className="mb-3 text-xl font-semibold">API Response</h2>
            <pre className="overflow-auto rounded-xl bg-white/10 p-4 text-sm text-green-300">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;