"use client";
import { useState, useEffect } from "react";
import { Upload, Zap, X, CheckCircle2 } from "lucide-react";
import { cloudinaryService } from "../../service/cloudinaryService";
import ImageLoading from "../ImageLoading";
import Analytics from "./Analytics";
import toast, { Toaster } from "react-hot-toast";
import { analyzeImage } from "../../service/googleVision";
import { imageAnalyze } from "../../service/imageAnalyze";

const Main = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [AnalysisData, setAnalysisData] = useState();

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsLoading(true);
      const data = await cloudinaryService(file);
      console.log(data.imageUrl);
      if (!data?.imageUrl) {
        toast.error("Upload failed. Try again!");
        return;
      } else {
        const payload = { imageUrl: data.imageUrl };
        console.log(typeof payload);
        console.log("Payload result is : " + payload);
        const serviceData = await imageAnalyze(payload);
        console.log("main data", serviceData);
        if (serviceData) {
          setAnalysisData(serviceData);
          toast.success("AI Analysis Complete!");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    toast.dismiss();
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mt-12 px-6 max-w-7xl mx-auto w-full mb-20">
      <Toaster position="top-center" />

      {/* Upload Section */}
      <div className="w-full max-w-[38rem]">
        {file ? (
          <div className="relative group overflow-hidden rounded-3xl border border-primary/20 bg-surface-primary shadow-2xl transition-all duration-500">
            {/* Image Container */}
            <div className="relative h-[25rem] lg:h-[32rem] w-full overflow-hidden">
              {isLoading ? (
                <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-md flex items-center justify-center">
                  <ImageLoading />
                </div>
              ) : null}

              <img
                src={previewUrl}
                alt="Preview"
                className={`w-full h-full object-cover transition-transform duration-700 ${isLoading ? "scale-110 blur-sm" : "scale-100"}`}
              />

              {/* Cancel Button - Top Right */}
              {!isLoading && (
                <button
                  onClick={handleCancel}
                  className="absolute top-4 right-4 z-30 p-2 bg-black/50 hover:bg-red-500 backdrop-blur-md text-white rounded-full transition-all duration-300 transform hover:rotate-90"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Action Footer */}
            <div className="p-6 bg-linear-to-b from-transparent to-black/10">
              <button
                onClick={handleUpload}
                disabled={isLoading}
                className="w-full relative group overflow-hidden bg-primary py-4 rounded-2xl font-bold text-white shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Zap className="w-5 h-5 fill-current" />
                  )}
                  <span className="tracking-wide">
                    {isLoading
                      ? "Processing AI Analysis..."
                      : "Analyze Image Now"}
                  </span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* Dropzone */
          <label className="group relative flex flex-col items-center justify-center w-full min-h-[30rem] border-2 border-dashed border-primary/20 hover:border-primary/60 transition-all duration-500 rounded-3xl bg-surface-primary/50 cursor-pointer backdrop-blur-sm shadow-inner">
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
            />

            <div className="flex flex-col items-center p-10 text-center">
              <div className="mb-6 p-6 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 scale-100 group-hover:scale-110 shadow-lg">
                <Upload className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-display font-semibold text-text-primary mb-2">
                Drop your creative work here
              </h2>
              <p className="text-text-secondary max-w-62.5 leading-relaxed">
                PNG, JPG or WEBP (Max 10MB). <br />
                <span className="text-primary font-medium">
                  Click to browse files
                </span>
              </p>
            </div>
          </label>
        )}
      </div>

      {/* Analytics Section */}
      <div className="w-full lg:sticky lg:top-8 max-w-[32rem] ">
        <div className="rounded-3xl overflow-hidden border border-text-secondary/10 shadow-2xl bg-surface-primary">
          <Analytics AnalysisData={AnalysisData} isLoading={isLoading} />
        </div>
      </div> 
    </div>
  );
};

export default Main;
