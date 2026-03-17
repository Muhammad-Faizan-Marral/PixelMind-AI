import Main from "../components/emotion-detector/Main";
import EmotionDetector from "../components/EmotionDetector";
import Header from "../components/Header";

const page = () => {
  return (
    <div className="bg-surface-secondary min-h-screen flex flex-col">
      <Header heading={"Create new image"} paragraph={"Describe what you want to see, and let the AI handle the rest."}/>
     {/* Container to center the detector */}
      <main className="flex-1 flex items-center justify-center p-4">
        <EmotionDetector />
      </main>

    </div>
  );
};

export default page;
