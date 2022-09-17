import React from "react";

const Album = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="bg-[url('https://c4.wallpaperflare.com/wallpaper/493/874/387/nicki-minaj-wallpaper-preview.jpg')] bg-no-repeat bg-cover px-8 h-[20rem] object-fill">
          <div className="flex flex-col justify-between">
            <div className="text-white text-lg font-bold">PLAYLIST</div>
            <div className="text-white text-7xl font-bold"> RapCaviar</div>
            <div className="text-gray-300 text-lg font-semibold">
              Music from Nicki Minaj, Kodak Black and EST Gee.
            </div>
            <div className="text-white">
              {" "}
              <span>Spotify</span>{" "}
              <span>
                {" "}
                <ul className="inline-flex">
                  <li className="px-1">14,648,696 likes</li>
                  <li>
                    <span className="pl-1 font-bold">50 songs,</span> 2 hr 28
                    min
                  </li>
                </ul>
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <div className="flex justify-start items-center pb-4">
            <div className="w-48 flex justify-between"></div>
          </div>
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">#</div>
                </th>
                <th scope="col" className="py-3 px-6">
                  Product name
                </th>
                <th scope="col" className="py-3 px-6">
                  Color
                </th>
                <th scope="col" className="py-3 px-6">
                  Category
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" border-b text-gray-400 bg-gray-600 border-gray-700 hover:bg-gray-700">
                <td className="p-4 w-4">
                  <div className="flex items-center">0</div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium  whitespace-nowrap "
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="py-4 px-6">Sliver</td>
                <td className="py-4 px-6">Laptop</td>
                <td className="py-4 px-6">$2999</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">1</div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="py-4 px-6">White</td>
                <td className="py-4 px-6">Laptop PC</td>
                <td className="py-4 px-6">$1999</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">2</div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="py-4 px-6">Black</td>
                <td className="py-4 px-6">Accessories</td>
                <td className="py-4 px-6">$99</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">3</div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple Watch
                </th>
                <td className="py-4 px-6">Silver</td>
                <td className="py-4 px-6">Accessories</td>
                <td className="py-4 px-6">$179</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">4</div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  iPad
                </th>
                <td className="py-4 px-6">Gold</td>
                <td className="py-4 px-6">Tablet</td>
                <td className="py-4 px-6">$699</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 w-4">
                  <div className="flex items-center">5</div>
                </td>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple iMac 27"
                </th>
                <td className="py-4 px-6">Silver</td>
                <td className="py-4 px-6">PC Desktop</td>
                <td className="py-4 px-6">$3999</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Album;
