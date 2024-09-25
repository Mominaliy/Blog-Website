import React, { useState } from "react";
import { GiBookmarklet } from "react-icons/gi";
import { HiUser } from "react-icons/hi2";

const Navbar = () => {
  const [user, setUser] = useState(true);
  return (
    <div className="xl:w-full xl:bg-white xl:px-5 xl:py-4 px-5 py-4 flex items-center justify-between shadow-md shadow-slate-900">
      <a href="/" className="flex gap-3 items-center group ">
        <GiBookmarklet className="size-7 text-teal-500 group-hover:scale-105 transition-all duration-300" />
        <p className="xl:text-xl font-bold group-hover:scale-105 transition-all duration-300">
          Blog Vault
        </p>
      </a>

      {!user ? (
        <div className="flex flex-row gap-2">
          <button className="bg-teal-200 hover:bg-teal-600 hover:text-white transition-all duration-300 text-black font-semibold px-3 py-1 rounded-lg">
            Login
          </button>
          <button className="bg-teal-200 hover:bg-teal-600 hover:text-white transition-all duration-300 text-black font-semibold px-3 py-1 rounded-lg">
            Signup
          </button>
        </div>
      ) : (
        <div className="bg-white cursor-pointer hover:bg-teal-600 transition-all duration-200 rounded-full p-1.5 group">
          <HiUser className="size-5 text-teal-700 group-hover:text-white transition-all duration-200" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
