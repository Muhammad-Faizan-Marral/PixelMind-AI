import PromptInput from "../components/ai-image-generator/PromptInput";
import Gallary from "../components/Gallary";
import Header from "../components/Header";

const page = () => {
  return (
    <div className="bg-surface-secondary px-20  min-h-screen ">
      <Header heading={"Create new image"} paragraph={"Describe what you want to see, and let the AI handle the rest."}/>
      <PromptInput/>
      <Gallary/>
    </div>
  );
};

export default page;
