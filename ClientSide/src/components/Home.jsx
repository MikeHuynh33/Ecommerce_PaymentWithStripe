import React from "react";
import Wallpaper from "../assets/Wallpaper.png";
const Home = () => {
  return (
    <div className="relative">
      <div className="container mx-auto">
        <img className="w-full h-full object-contain" src={Wallpaper}></img>
      </div>
      <div className="flex flex-col absolute mb-4 inset-0 flex items-center justify-center">
        <p className="max-w-2xl leading-[4rem] text-white text-4xl font-bold mt-[-10%]">
          Discover the magic of photography with our captivating Camera
          E-commerce Emporium. Explore cutting-edge cameras and accessories to
          elevate your creative vision. Start capturing unforgettable moments
          today!
        </p>
      </div>
      <a className="absolute bg-indigo-500 mt-[-15%] ml-[45%] text-white px-7 py-3 rounded-full">
        New Products
      </a>
    </div>
  );
};

export default Home;
