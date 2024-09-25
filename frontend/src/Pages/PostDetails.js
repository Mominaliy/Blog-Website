import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import sm1 from "../assets/sm-1.jpg";
import { HiUser } from "react-icons/hi2";
import { FaRegComment, FaRegUser } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const PostDetails = () => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const newCommentObj = {
        commentby: "Current User",
        comment: newComment,
      };
    }
  };

  const dummyData = [
    {
      id: 1,
      title: "This is the best blog for your website and what can you do",
      paragraph:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: sm1,
      category: "Health",
      author: "John Doe",
      date: "September 25, 2024",
      comments: [
        {
          commentby: "John Doe",
          comment: "This is a good post",
        },
        {
          commentby: "John Doe",
          comment: "This is a nice good post",
        },
      ],
    },
  ];
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center relative bg-gradient-to-r from-[#ECEFF2] to-gray-200 min-h-screen py-4">
        <div className="flex flex-col items-center xl:w-[700px] lg:w-[600px] md:w-[650px] w-[90%] mx-auto py-4 gap-4">
          <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-3xl font-sans font-bold ">
            {dummyData[0].title}
          </h1>
          <div className="flex flex-row gap-4 w-full items-center justify-start mt-6">
            <HiUser className="text-teal-500 size-10" />
            <div className="flex flex-col items-start">
              <p className="lg:text-base font-semibold">
                {dummyData[0].author}
              </p>
              <p className="lg:text-sm text-gray-700">{dummyData[0].date}</p>
            </div>
          </div>
          <div className="w-full flex flex-row border-t border-b py-2 px-1 border-gray-300">
            <div className="flex gap-2">
              <p className="font-semibold text-gray-700">
                {dummyData[0].comments.length}
              </p>
              <FaRegComment className="size-5 text-gray-700" />
            </div>
          </div>
          <div>
            <img
              className="xl:w-[700px] xl:h-[300px]"
              src={dummyData[0].image}
            ></img>
          </div>
          <p className="lg:text-lg font-semibold-">{dummyData[0].paragraph}</p>
          <div className="border-t-2 border-b-2 border-gray-300 flex w-full py-2">
            <p className="font-bold text-2xl">Comments</p>
          </div>
          <form onSubmit={handleCommentSubmit} className="w-full space-y-4">
            <textarea
              rows={3}
              placeholder="Write Your Thoughts."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 rounded-lg focus:outline-teal-500"
            />
            <button
              className="bg-teal-500 p-2 hover:bg-teal-600 transition-all duration-200 rounded-lg text-white"
              type="submit"
            >
              Post Comment
            </button>
          </form>
          <div className="w-full">
            {dummyData[0].comments.map((comment, index) => (
              <div className="flex flex-row justify-between">
                <div className="flex flex-row w-full items-center justify-start gap-4 my-4">
                  <div className="bg-white rounded-full p-2.5">
                    <FaRegUser className="size-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="lg:text-base font-semibold">
                      {comment.commentby}
                    </p>
                    <p className="lg:text-base font-normal">
                      {comment.comment}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <button className="flex flex-row h-fit px-4 py-3 rounded-lg gap-3 bg-blue-500 items-center hover:bg-blue-600 transition-all duration-200">
                    <FaRegEdit className="text-white" />
                    <p className="lg:text-xs text-white">Edit</p>
                  </button>
                  <button className="flex flex-row h-fit px-4 py-3 rounded-lg gap-3 bg-red-500 items-center hover:bg-red-600 transition-all duration-200">
                    <MdOutlineDelete className="text-white size-4" />
                    <p className="lg:text-xs text-white">Delete</p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
