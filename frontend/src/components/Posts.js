import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PostsLoading from "./PostsLoading";
import PostTile from "./PostTile";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Posts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;
  const deletePost = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.ok) {
        await fetchData(currentPage);
        toast.success("Post Deleted!");
      }
      if (response.status === 401) {
        toast.error("Unauthorized Please Login");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (e) {
      toast.error("Unable to Delete");
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  const fetchData = async (page) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/posts/allPosts?page=${page}`,
        { method: "GET" }
      );
      if (response.ok) {
        const { posts, totalPosts } = await response.json();
        setPosts(posts);
        setTotalPages(Math.ceil(totalPosts / limit));
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <Toaster position="top-right" />
      <div className="flex flex-col w-full">
        <div className="bg-white flex justify-between w-full py-4 px-3 rounded-xl shadow-md">
          <p className="font-semibold md:text-sm text-xs underline underline-offset-4 decoration-teal-500 decoration-dashed">
            Latest Posts
          </p>
          <p className="font-bold md:text-sm text-xs">
            Today: <span className="font-normal">{formattedDate}</span>
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {!loading &&
            posts &&
            posts
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((post, index) => (
                <PostTile
                  key={index}
                  title={post.title}
                  author={post.author}
                  category={post.category}
                  image={post.image}
                  paragraph={post.paragraph}
                  date={post.date}
                  id={post._id}
                  onDelete={() => deletePost(post._id)}
                />
              ))}
          {loading && (
            <div className="flex flex-col gap-4 mt-4">
              <PostsLoading />
              <PostsLoading />
              <PostsLoading />
            </div>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 mx-2 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </p>
          <button
            className={`px-4 py-2 mx-2 ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
export default Posts;
