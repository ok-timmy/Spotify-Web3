import React from "react";
import {
  PlayCircleFilled,
  HeartOutlined,
  EllipsisOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const Album = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="bg-[url('https://c4.wallpaperflare.com/wallpaper/493/874/387/nicki-minaj-wallpaper-preview.jpg')] bg-no-repeat bg-cover px-8 h-[20rem] object-fill">
          <div className="flex flex-col content-end h-64">
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
          <div className="flex justify-start items-center pb-4 px-8">
            <div className="w-44 flex justify-between content-center">
              <div className=" text-white text-[3.5rem] z-50 hover:scale-110 hover:cursor-default">
                <PlayCircleFilled style={{ color: "#1FDF64" }} />
              </div>
              <div className=" text-white text-[2rem] pt-6 hover:cursor-pointer">
                <HeartOutlined
                  style={{ color: "#FDFDFD", fontWeight: "100" }}
                />
              </div>
              <div className=" text-white text-[2rem] hover:cursor-pointer pt-6">
                <EllipsisOutlined
                  style={{ color: "#FDFDFD", fontWeight: "200" }}
                />
              </div>
            </div>
          </div>
          <div className="px-8">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className=" uppercase bg-transparent text-gray-400 border-b border-gray-200 text-[1rem] font-normal">
                <tr>
                  <th scope="col" className="p-4">
                    #
                  </th>
                  <th scope="col" className="py-3 px-1">
                    Title
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Album
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Date Added
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <ClockCircleOutlined />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className=" text-gray-400 bg-transparent border-gray-700 hover:bg-gray-700 ">
                  <td className="p-4 w-4">0</td>
                  <th
                    scope="row"
                    className="py-4 px-1 font-medium text-gray-200  whitespace-nowrap "
                  >
                    Apple MacBook Pro 17
                  </th>
                  <td className="py-4 px-6">Sliver</td>
                  <td className="py-4 px-6">Laptop</td>
                  <td className="py-4 px-6">3:22</td>
                </tr>
                <tr className="bg-transparent hover:bg-gray-700 hover:rounded-md ">
                  <td className="p-4 w-4">1</td>
                  <th
                    scope="row"
                    className="py-4 px-1font-medium text-gray-200 whitespace-nowrap "
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="py-4 px-6">White</td>
                  <td className="py-4 px-6">Laptop PC</td>
                  <td className="py-4 px-6">3:47</td>
                </tr>
                <tr className="bg-transparent hover:bg-gray-700">
                  <td className="p-4 w-4">2</td>
                  <th
                    scope="row"
                    className="py-4 px-1 font-medium text-gray-200 whitespace-nowrap"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="py-4 px-6">Black</td>
                  <td className="py-4 px-6">Accessories</td>
                  <td className="py-4 px-6">3:05</td>
                </tr>
                <tr className="bg-transparent  hover:bg-gray-700">
                  <td className="p-4 w-4">3</td>
                  <th
                    scope="row"
                    className="py-4 px-1 font-medium text-gray-200 whitespace-nowrap "
                  >
                    Apple Watch
                  </th>
                  <td className="py-4 px-6">Silver</td>
                  <td className="py-4 px-6">Accessories</td>
                  <td className="py-4 px-6">2:15</td>
                </tr>
                <tr className="bg-transparent  ">
                  <td className="p-4 w-4">4</td>
                  <th
                    scope="row"
                    className="py-4 px-1 font-medium text-gray-200 whitespace-nowrap"
                  >
                    iPad
                  </th>
                  <td className="py-4 px-6">Gold</td>
                  <td className="py-4 px-6">Tablet</td>
                  <td className="py-4 px-6">4:00</td>
                </tr>
                <tr className="bg-transparent hover:bg-gray-700">
                  <td className="p-4 w-4">5</td>
                  <th
                    scope="row"
                    className="py-4 px-1 font-medium text-gray-200 whitespace-nowrap"
                  >
                    Apple iMac 27"
                  </th>
                  <td className="py-4 px-6">Silver</td>
                  <td className="py-4 px-6">PC Desktop</td>
                  <td className="py-4 px-6">2:45</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
