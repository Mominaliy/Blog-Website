import React, { useContext, useState } from "react";
import { HiUser } from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
const PostTile = ({
  title,
  image,
  paragraph,
  date,
  category,
  author,
  id,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
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
  const handlePostClick = () => {
    navigate(`/post/${id}`);
  };
  const EditPostClick = (e) => {
    e.stopPropagation();
    navigate(`/edit-post/${id}`);
  };
  const DeletePostClick = async (e) => {
    e.stopPropagation();
    setLoading(true);
    await onDelete();
    setLoading(false);
  };
  return (
    <>
      <div
        onClick={handlePostClick}
        className="bg-white group flex md:flex-row flex-col p-4 gap-4 rounded-2xl cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-300 shadow-md"
      >
        <div>
          <img
            className="xl:w-[300px] lg:w-[300px] md:w-[250px] w-[350px] h-auto rounded-xl"
            src={image}
            alt="Post"
          ></img>
        </div>
        <div className="flex flex-col justify-between py-3 gap-4 xl:w-[550px] lg:w-[500px] md:w-[500px] w-full">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <div
                  className={`${
                    categoryColors[category] || "bg-white"
                  } p-2 rounded-lg bg-opacity-15`}
                >
                  <p
                    className={`${
                      textColors[category] || "bg-white"
                    } md:text-xs text-xs font-semibold`}
                  >
                    {category}
                  </p>
                </div>
                <p className="text-xs font-semibold">
                  {new Date(date).toLocaleDateString()}
                </p>
              </div>
              {user !== null && user.user._id === author._id && (
                <div className="flex flex-row items-center gap-2">
                  <button
                    onClick={EditPostClick}
                    className="flex flex-row h-fit md:px-4 px-2 md:py-2 py-1 rounded-lg md:gap-3 gap-1 bg-blue-500 items-center hover:bg-blue-600 transition-all duration-200"
                  >
                    <FaRegEdit className="text-white md:size-4 size-3" />
                    <p className="lg:text-xs text-[10px] text-white">Edit</p>
                  </button>
                  <button
                    onClick={DeletePostClick}
                    className="flex flex-row h-fit md:px-4 px-2 md:py-2 py-1 rounded-lg md:gap-3 gap-1 bg-red-500 items-center hover:bg-red-600 transition-all duration-200"
                  >
                    <MdOutlineDelete className="text-white md:size-4 size-3" />
                    {loading ? (
                      <div className="border-r-gray-200 border-l-gray-200  border-t-red-500 border-b-red-500 animate-spin inline-block md:size-4 size-4 border-[2px] rounded-full"></div>
                    ) : (
                      <p className="lg:text-xs text-[10px] text-white">
                        Delete
                      </p>
                    )}
                  </button>
                </div>
              )}
            </div>
            <h1 className="font-spectral xl:text-3xl lg:text-2xl md:text-2xl text-lg tracking-wide font-bold">
              {title}
            </h1>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex gap-2">
              <HiUser className="size-5 text-blue-500" />
              <p className="font-semibold text-sm">{author.username}</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="underline decoration-dashed underline-offset-4 decoration-teal-500 text-gray-700/50 font-bold text-sm group-hover:text-gray-700 transition-all duration-200">
                Read More
              </p>
              <FaArrowRight className="text-gray-700/50 group-hover:text-teal-500 transition-all duration-200" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostTile;
