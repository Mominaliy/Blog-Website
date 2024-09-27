import React, { useContext, useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { GrCloudUpload } from "react-icons/gr";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../utils/firebase";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router";

const EditPost = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const { id } = useParams();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Health");
  const [paragraph, setParagraph] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadprogress, setUploadprogress] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

    const timestamp = Date.now();

    if (file) {
      const storageRef = ref(storage, `blogImages/${timestamp}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadprogress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          toast.error("Image upload failed!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
            toast.success("Image uploaded successfully!");
          });
        }
      );
    }
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const postData = {
      title,
      paragraph,
      category,
      image: imageUrl,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success("Post updated successfully!");
        navigate("/");
      }
    } catch (e) {
      toast.error("Error updating Post");
      navigate("/");
    }
    setLoading(false);
  };

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
        setImage(data.image);
        setTitle(data.title);
        setCategory(data.category);
        setParagraph(data.paragraph);
        setImageUrl(data.image);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <div className="w-full bg-gradient-to-r from-[#ECEFF2] to-gray-200 min-h-screen">
        <div className="xl:w-[800px] lg:w-[700px] md:w-[650px] w-[90%] mx-auto py-4">
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-gray-900 text-center mb-8">
            Edit Your Blog Post
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
                      <>
                        <img
                          src={image}
                          alt="Uploaded"
                          className="w-full h-full object-fit rounded-lg"
                        />
                      </>
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
              {image && (
                <div className="h-1 rounded-xl w-full bg-gray-300 mt-0.5 mb-3">
                  <div
                    className="h-full rounded-xl bg-gradient-to-r from-green-500 to-teal-800"
                    style={{
                      width: `${uploadprogress}%`,
                      transition: "width 0.5s linear",
                    }}
                  ></div>
                </div>
              )}
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
                  className="w-40 py-3 flex items-center justify-center bg-teal-500 text-white font-semibold rounded-md shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition hover:scale-105 duration-300 ease-in-out"
                >
                  {loading ? (
                    <div className="border-r-gray-200 border-l-gray-200 border-t-teal-500 border-b-teal-500 animate-spin inline-block size-5 border-[2px] rounded-full"></div>
                  ) : (
                    "Save Post"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
