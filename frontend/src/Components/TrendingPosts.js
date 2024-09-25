import React from "react";
import sm1 from "../assets/sm-1.jpg";
import sm2 from "../assets/sm-2.jpg";
import sm3 from "../assets/sm-3.jpg";
import sm4 from "../assets/sm-4.jpg";
import TrendingPostTile from "./TrendingPostTile";
const RelatedPost = () => {
  const dummyData = [
    {
      id: 1,
      title: "Thhis is the best blog for your website",
      paragraph:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      image: sm4,
      category: "Health",
      author: "John Doe",
      date: "September 25, 2024",
    },
    {
      id: 2,
      title: "Second Blog",
      paragraph:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
      image: sm1,
      category: "Technology",
      author: "Jane Smith",
      date: "September 20, 2024",
    },
    {
      id: 3,
      title: "Third Blog",
      paragraph:
        "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
      image: sm3,
      category: "Education",
      author: "Alex Johnson",
      date: "September 18, 2024",
    },
  ];
  return (
    <div className="flex flex-col w-full">
      <div className="bg-white flex justify-between w-full py-4 px-3 rounded-xl shadow-md">
        <p className="font-semibold text-sm  underline underline-offset-4 decoration-teal-500 decoration-dashed">
          Trending Posts
        </p>
      </div>
      <div className="flex lg:flex-col md:flex-wrap flex-wrap gap-4 mt-4 ">
        {dummyData.map((post, index) => (
          <TrendingPostTile
            key={index}
            title={post.title}
            author={post.author}
            category={post.category}
            image={post.image}
            paragraph={post.paragraph}
            date={post.date}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedPost;
