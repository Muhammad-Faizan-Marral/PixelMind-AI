import Main from "../components/emotion-detector/Main";
import Header from "../components/Header";

const page = () => {
  return (
    <div className="bg-surface-secondary px-10 md:px-20  min-h-screen ">
      <Header heading={"Create new image"} paragraph={"Describe what you want to see, and let the AI handle the rest."}/>
        <Main/>
    </div>
  );
};

export default page;
