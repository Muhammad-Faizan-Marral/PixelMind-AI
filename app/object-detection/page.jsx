
import Header from "../components/Header";
import Main from "../components/object-detection/Main";


const page = () => {
  return (
    <div className="bg-surface-secondary px-20  min-h-screen ">
      <Header
        heading={"Object Detection"}
        paragraph={
          "Real-time computer vision analysis with high-precision bounding boxes."
        }
      />
      <Main />
     
    </div>
  );
};

export default page;
