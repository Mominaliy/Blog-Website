import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const UserPopup = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Join!</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <IoMdClose className="size-5" />
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          Please log in or sign up to continue.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-slate-300 hover:bg-teal-500 text-black hover:text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPopup;
