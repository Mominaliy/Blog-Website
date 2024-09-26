import React from "react";

const TrendingPostsLoading = () => {
  return (
    <div className="bg-white group flex md:flex-row flex-col p-4 gap-4 rounded-2xl cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-300 shadow-md animate-pulse">
      <div className="w-[150px] md:w-[100px] lg:w-[70px] xl:w-[100px]">
        <div className="h-full bg-gray-200 rounded-xl" />
      </div>
      <div className="flex flex-col justify-between py-1 gap-4 w-full">
        <div className="flex flex-col xl:gap-4 lg:gap-2 md:gap-2 gap-2">
          <div className="flex gap-3 items-center">
            <div className="bg-gray-200 p-2 rounded-lg w-[50px] h-[20px]" />
          </div>
          <div className="bg-gray-200 rounded-md h-6 w-[200px] xl:w-[150px] lg:w-[100px] md:w-[143px] truncate" />
        </div>
      </div>
    </div>
  );
};

export default TrendingPostsLoading;
