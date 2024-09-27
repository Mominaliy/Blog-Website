import React, { useEffect, useState } from "react";
import TrendingPostsLoading from "./TrendingPostsLoading";
import TrendingPostTile from "./TrendingPostTile";
const RelatedPost = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/posts/trendingPost`,
        { method: "GET" }
      );
      if (response.ok) {
        const { trendingPosts } = await response.json();
        setPosts(trendingPosts);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col w-full">
      <div className="bg-white flex justify-between w-full py-4 px-3 rounded-xl shadow-md">
        <p className="font-semibold text-sm  underline underline-offset-4 decoration-teal-500 decoration-dashed">
          Trending Posts
        </p>
      </div>
      <div className="flex lg:flex-col md:flex-wrap flex-wrap gap-4 mt-4 ">
        {!loading &&
          posts &&
          posts.map((post, index) => (
            <TrendingPostTile
              key={index}
              title={post.title}
              author={post.author}
              category={post.category}
              image={post.image}
              paragraph={post.paragraph}
              date={post.date}
              id={post._id}
            />
          ))}
        {loading && (
          <div className="gap-4 flex lg:flex-col md:flex-wrap flex-wrap">
            <TrendingPostsLoading />
            <TrendingPostsLoading />
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedPost;
