import React, { useContext, useState } from "react";
import { GiBookmarklet } from "react-icons/gi";
import { HiUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("data");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="xl:w-full relative z-20 bg-white xl:px-5 xl:py-4 px-5 py-4 flex items-center justify-between shadow-md shadow-slate-200 ">
      <a href="/" className="flex gap-3 items-center group ">
        <GiBookmarklet className="size-7 text-teal-500 group-hover:scale-105 transition-all duration-300" />
        <p className="xl:text-xl font-bold group-hover:scale-105 transition-all duration-300">
          Blog Vault
        </p>
      </a>

      {!user ? (
        <div className="flex flex-row gap-2">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-teal-200 hover:bg-teal-600 hover:text-white border-b-4 border-teal-700 transition-all duration-300 text-black font-semibold px-4 py-1.5 rounded-lg"
          >
            Login
          </button>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="bg-teal-200 hover:bg-teal-600 hover:text-white border-b-4 border-teal-700 transition-all duration-300 text-black font-semibold px-3 py-1 rounded-lg"
          >
            Signup
          </button>
        </div>
      ) : (
        <div className="relative">
          <div
            className="bg-white cursor-pointer hover:bg-teal-600 transition-all duration-200 rounded-full p-1.5 group"
            onClick={toggleDropdown}
          >
            <HiUser className="size-5 text-teal-700 group-hover:text-white transition-all duration-200" />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-6 w-48 bg-white shadow-lg rounded-lg py-2 z-20">
              <p className="px-4 py-2 text-gray-700 border-b font-semibold">
                Hello, {user.user.username}
              </p>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-100">
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-teal-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
