import React from "react";

const LoadingOverlay = () => {
  return (
    // <!-- loading overlay -->

    <div className="fixed bg-white bg-opacity-70 z-[10000] h-[100vh] w-[80vw] flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* <!-- loading icon --> */}
        <svg
          className="animate-spin h-16 w-16 text-gray-900"
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
        <span className="text-3xl mt-3">Loading..</span>
        <span className="text-xl mt-3">This may take a few seconds, Please do not leave this page</span>
        
        {/* <!-- end loading icon --> */}
      </div>
    </div>

    // <!-- end loading overlay -->
  );
};

export default LoadingOverlay;
