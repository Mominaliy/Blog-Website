import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { HiUser } from "react-icons/hi2";
import { FaRegComment, FaRegUser } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import PostsLoading from "../components/PostsLoading";
import { AuthContext } from "../context/AuthContext";
import { toast, Toaster } from "react-hot-toast";

const PostDetails = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line
  }, []);

  const fetchPost = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/posts/${id}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPost(data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      navigate("/");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (user === null) {
      toast("Login to Comment", {
        icon: "❗️",
      });
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/posts/addComment/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ comment: newComment, userId: user.user._id }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setPost((prevPost) => ({
          ...prevPost,
          comments: [
            ...prevPost.comments,
            {
              comment: newComment,
              commentby: { _id: user.user._id, username: user.user.username },
            },
          ],
        }));
        console.log(post);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/posts/deleteComment/${id}/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.ok) {
        setPost((prevPost) => ({
          ...prevPost,
          comments: prevPost.comments.filter(
            (comment) => comment._id !== commentId
          ),
        }));
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <div className="w-full flex flex-col items-center relative bg-gradient-to-r from-[#ECEFF2] to-gray-200 min-h-screen py-4">
        {!loading && post ? (
          <div className="flex flex-col items-center xl:w-[700px] lg:w-[600px] md:w-[650px] w-[90%] mx-auto py-4 gap-4">
            <h1 className="xl:text-5xl lg:text-4xl md:text-3xl text-3xl font-sans font-bold ">
              {post.title}
            </h1>
            <div className="flex flex-row gap-4 w-full items-center justify-start mt-6">
              <HiUser className="text-teal-500 size-10" />
              <div className="flex flex-col items-start">
                <p className="lg:text-base font-semibold">
                  {post.author.username}
                </p>
                <p className="lg:text-sm text-gray-700">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row border-t border-b py-2 px-1 border-gray-300">
              <div className="flex gap-2">
                <p className="font-semibold text-gray-700">
                  {post.comments.length}
                </p>
                <FaRegComment className="size-5 text-gray-700" />
              </div>
            </div>
            <div>
              <img
                className="xl:w-[700px] xl:h-[300px]"
                src={post.image}
                alt="Post"
              ></img>
            </div>
            <p className="lg:text-lg font-semibold-">{post.paragraph}</p>
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
              {post.comments !== undefined &&
                post.comments.length > 0 &&
                post.comments
                  .slice()
                  .reverse()
                  .map((comment, index) => (
                    <div className="flex flex-row justify-between" key={index}>
                      <div className="flex flex-row w-full items-center justify-start gap-4 my-4">
                        <div className="bg-white rounded-full p-2.5">
                          <FaRegUser className="size-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="lg:text-base font-semibold">
                            {comment.commentby.username}
                          </p>
                          <p className="lg:text-base font-normal">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                      {user !== null &&
                        user.user._id === comment.commentby._id && (
                          <div className="flex flex-row items-center gap-2">
                            <button className="flex flex-row h-fit px-4 py-3 rounded-lg gap-3 bg-blue-500 items-center hover:bg-blue-600 transition-all duration-200">
                              <FaRegEdit className="text-white" />
                              <p className="lg:text-xs text-xs text-white">
                                Edit
                              </p>
                            </button>
                            <button
                              onClick={() => {
                                handleCommentDelete(comment._id);
                              }}
                              className="flex flex-row h-fit px-4 py-3 rounded-lg gap-3 bg-red-500 items-center hover:bg-red-600 transition-all duration-200"
                            >
                              <MdOutlineDelete className="text-white size-4" />
                              <p className="lg:text-xs text-xs text-white">
                                Delete
                              </p>
                            </button>
                          </div>
                        )}
                    </div>
                  ))}
            </div>
          </div>
        ) : (
          <PostsLoading />
        )}
      </div>
    </>
  );
};

export default PostDetails;
