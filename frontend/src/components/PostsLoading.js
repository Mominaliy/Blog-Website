import React from "react";

const PostsLoading = () => {
  return (
    <div className="bg-white animate-pulse flex md:flex-row flex-col p-4 gap-4 rounded-2xl shadow-md">
      <div className="bg-gray-300 md:w-[250px] w-[350px] h-[150px] rounded-xl"></div>
      <div className="flex flex-col justify-between py-3 gap-4 xl:w-[550px] lg:w-[500px] md:w-[500px] w-[300px]">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <div className="bg-gray-300 p-2 rounded-lg bg-opacity-15 h-6 w-24"></div>
            <div className="bg-gray-300 h-6 w-16 rounded"></div>
          </div>
          <div className="bg-gray-300 h-8 w-full rounded"></div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex gap-2">
            <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
            <div className="bg-gray-300 h-6 w-20 rounded"></div>
          </div>
          <div className="flex gap-1 items-center">
            <div className="bg-gray-300 h-6 w-24 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsLoading;
