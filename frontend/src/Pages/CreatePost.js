import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../Components/Navbar";
import { GrCloudUpload } from "react-icons/gr";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Health");
  const [paragraph, setParagraph] = useState("");
  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation
    if (!image) newErrors.image = "Image is required.";
    if (!title) newErrors.title = "Title is required.";
    if (!category) newErrors.category = "Category is required.";
    if (!paragraph) newErrors.paragraph = "Paragraph is required.";

    Object.values(newErrors).forEach((error) => toast.error(error));

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const postData = {
      title,
      category,
      paragraph,
      image,
    };
    console.log(postData);
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <div className="w-full bg-gradient-to-r from-[#ECEFF2] to-gray-200 min-h-screen">
        <div className="xl:w-[800px] lg:w-[700px] md:w-[650px] w-[90%] mx-auto py-4">
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-gray-900 text-center mb-8">
            Create a New Blog Post
          </h1>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <form onSubmit={handleSubmit} className="p-8">
              <div className="mb-6">
                <label
                  htmlFor="image-upload"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Upload Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-teal-400 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt="Uploaded"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <GrCloudUpload className="size-10 text-gray-400" />

                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full bg-white px-3 py-2 border focus:border-b-4 focus:border-r-4  border-gray-400 focus:border-teal-500 rounded-md outline-none transition duration-300 ease-in-out"
                  placeholder="Enter your blog post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>

                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Technology">Technology</option>
                  <option value="Sports">Sports</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paragraph
                </label>

                <textarea
                  rows={6}
                  className="w-full px-3 py-2 border focus:border-b-[6px] focus:border-r-[6px]  border-gray-400 focus:border-teal-500 outline-none rounded-md transition duration-300 ease-in-out"
                  placeholder="Write your blog post content here"
                  value={paragraph}
                  onChange={(e) => setParagraph(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-md shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition hover:scale-105 duration-300 ease-in-out"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
