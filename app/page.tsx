import AiEcosystem from "@/components/home/AiEcosystem";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Landing from "@/components/home/Landing";
import PixelMindWork from "@/components/home/PixelMindWork";
import React from "react";

const page = () => {
  return (
    <div className="">
        <Header />
        <Landing/>
        <AiEcosystem/>
        <PixelMindWork/>
        <Footer/>
    </div>
  );
};

export default page;
