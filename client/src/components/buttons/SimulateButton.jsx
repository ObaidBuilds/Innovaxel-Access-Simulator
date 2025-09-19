import React from "react";

const SimulateButton = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      className="text-sm bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
    >
      {loading ? (
        <span className="flex items-center justify-center text-[0.8rem]">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Simulating..
        </span>
      ) : (
        <>
          <i className="fas fa-play"></i>
          Simulate Access
        </>
      )}
    </button>
  );
};

export default SimulateButton;
