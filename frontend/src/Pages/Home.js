import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import TrendingPosts from "../components/TrendingPosts";
import UserPopup from "../components/UserPopup";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();

  const [isOpen, setisOpen] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      {isOpen && (
        <UserPopup
          onClose={() => {
            setisOpen(false);
          }}
        />
      )}
      <div className="w-full flex flex-col items-center relative bg-gradient-to-r from-[#ECEFF2] to-gray-200 min-h-screen py-4">
        <div className="absolute h-64 md:w-[600px] w-[350px] backdrop-filter blur-3xl bg-gradient-to-r from-indigo-200/70 via-emerald-200/70 to-blue-200/70 left-[50%] top-[5%] z-0 rounded-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex flex-col z-10 xl:h-56 lg:h-52 md:h-52 gap-2 w-full items-center justify-center">
          <h1 className="xl:text-[40px] lg:text-4xl md:text-4xl text-2xl font-extrabold">
            Blogs Section For Everyone
          </h1>
          <h2 className="font-semibold xl:text-base lg:text-sm md:text-sm text-xs text-gray-600">
            Explore, Share, and Engage with Insightful Content
          </h2>
          <div className="flex flex-row md:ml-1 2xl:mt-14 mt-4">
            <div class="flex h-20 2xl:w-48 xl:w-48 lg:w-48 flex-row items-start justify-start ">
              <button
                onClick={() => {
                  if (user !== null) {
                    navigate("/create-post");
                  } else {
                    setisOpen(true);
                  }
                }}
                class="animate-border group inline-block rounded-lg bg-white bg-gradient-to-bl from-lime-400 via-green-600 to-teal-700 bg-[length:400%_400%] p-1"
              >
                <span class="block rounded-lg text-white xl:px-5 xl:py-2 md:px-4 md:py-1.5 px-3 py-1 bg-teal-200/20 group-hover:bg-green-600 font-bold  2xl:text-base xl:text-base lg:text-base md:text-base text-sm">
                  {" "}
                  CREATE BLOG{" "}
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="z-10 flex lg:flex-row flex-col justify-center items-start mx-4 gap-4 h-full xl:w-[1200px] lg:w-[950px] md:w-[700px] w-[350px]">
          <div className="lg:w-[70%] md:w-full w-full h-full">
            <Posts />
          </div>
          <div className="lg:w-[25%] md:w-full w-full h-full">
            <TrendingPosts />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
