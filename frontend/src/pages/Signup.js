import React, { useContext, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("data", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data });
        navigate("/");
      } else {
        toast.error("Account already exists");
        setLoading(false);
      }
    } catch (e) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <div className="w-full flex flex-col items-center justify-center relative bg-gradient-to-r from-[#C4DAD2] to-[#CDE8E5] min-h-screen py-4">
        <div className="bg-white flex flex-col items-center md:w-[500px] p-6 rounded-lg">
          <h1 className="text-gray-800 font-bold lg:text-2xl text-xl">
            Get Started!
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6 w-full mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Username
              </label>
              <input
                type="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:border-b-[6px] focus:border-r-[6px] focus:border-teal-500 outline-none rounded-md bg-gray-200 focus:bg-white transition duration-200 focus:shadow-md"
                placeholder="Momin Ali"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 block mb-2"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:border-b-[6px] focus:border-r-[6px] focus:border-teal-500 outline-none rounded-md bg-gray-200 focus:bg-white transition duration-200 focus:shadow-md"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 focus:border-b-[6px] focus:border-r-[6px] focus:border-teal-500 outline-none rounded-md bg-gray-200 focus:bg-white transition duration-200 focus:shadow-md"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-200"
              >
                {loading ? (
                  <div className="border-r-gray-200 border-l-gray-200 border-t-teal-600 border-b-teal-600 animate-spin inline-block size-5 border-[2px] rounded-full"></div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
