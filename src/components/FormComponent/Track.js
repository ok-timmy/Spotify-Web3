import React from "react";

const Track = ({ num }) => {
  console.log(num);
  return (
    <div className="flex flex-col border-b border-white">
      <div>Track {num + 1}</div>

      <div className="flex justify-start md:items-center md:max-w-full mb-3">
        <div className="md:w-1/3">
          <label
            className="block mb-2 pb-6 text-sm text-gray-500 font-bold md:text-right md:mb-0 pr-4"
            htmlFor="file_input"
          >
            Track {num + 1}
          </label>
        </div>

        <div className="md:w-2/3 flex flex-col">
          <input
            className="block w-full appearance-none file:px-2 file:py-2 file:mr-2 file:cursor-pointer text-sm rounded-lg border cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </div>
        </div>
      </div>
      <div className="flex justify-start md:items-center md:max-w-full mb-6">
        <div className="md:w-1/3">
          <label
            className="block mb-2 pb-6 text-sm text-gray-500 font-bold md:text-right md:mb-0 pr-4"
            htmlFor="file_input"
          >
            Track 1 Image
          </label>
        </div>

        <div className="md:w-2/3 flex flex-col">
          <input
            className="block w-full appearance-none file:px-2 file:py-2 file:mr-2 file:cursor-pointer text-sm rounded-lg border cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
