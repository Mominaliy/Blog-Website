import React from "react";

const TrendingPostTile = ({
  title,
  image,
  paragraph,
  date,
  category,
  author,
}) => {
  const categoryColors = {
    Health: "bg-red-400",
    Technology: "bg-blue-400",
    Education: "bg-green-400",
    Sports: "bg-yellow-400",
    Business: "bg-purple-400",
  };
  const textColors = {
    Health: "text-red-500",
    Technology: "text-blue-500",
    Education: "text-green-500",
    Sports: "text-yellow-500",
    Business: "text-purple-500",
  };
  return (
    <div className="bg-white group flex md:flex-row flex-col p-4 gap-4 rounded-2xl cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-300 shadow-md">
      <div>
        <img
          className="xl:w-[100px] lg:w-[70px] md:w-[150px] w-[350px] rounded-xl"
          src={image}
        ></img>
      </div>
      <div className="flex flex-col justify-between py-3 gap-4">
        <div className="flex flex-col xl:gap-4 lg:gap-2 md:gap-2 gap-2">
          <div className="flex gap-3 items-center">
            <div
              className={`${
                categoryColors[category] || "bg-white"
              } p-2 rounded-lg bg-opacity-15`}
            >
              <p
                className={`${
                  textColors[category] || "bg-white"
                } xl:text-xs lg:text-xs md:text-xs text-xs font-semibold`}
              >
                {category}
              </p>
            </div>
          </div>
          <h1 className="xl:text-lg lg:text-sm md:text-sm text-sm font-extrabold text-gray-900/70 xl:w-[150px] lg:w-[100px] md:w-[143px] w-[250px] truncate">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default TrendingPostTile;
