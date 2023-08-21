import React, { useContext } from "react";
import {
  PlayCircleFilled,
  HeartOutlined,
  EllipsisOutlined,
  ClockCircleOutlined,
  BorderOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { SpotifyContext } from "../../Context/SpotifyContext";
import { convertDate } from "../../Utils/convertDate";
import useAudioTime from "../../hooks/useAudioTime";
const Album = () => {
  const location = useLocation();
  const {id, albumList, genre, imageUrl, albumTitle, albumDescription, dateAdded } =
    location.state;
  const tracks = JSON.parse(albumList);

  // console.log(albumTitle);
  // console.log(tracks);

  const {
    getPermissionToPlay,
    isBeingPlayed,
    setIsBeingPlayed,
    setAlbumBeingPlayed,
    setAlbumTitleBeingPlayed,
  } = useContext(SpotifyContext);

  const {timesArray} = useAudioTime(albumList);
  console.log(timesArray[0].duration, "data2")
  console.log(isNaN(timesArray[0].duration))

  // console.log(imageUrl);
  const bgImage = `url(https://c4.wallpaperflare.com/wallpaper/493/874/387/nicki-minaj-wallpaper-preview.jpg)`

  // console.log(bgImage)

  return (
    <div>
      <div className="flex flex-col">
        <div
          className={`bg-[${bgImage}] bg-no-repeat bg-cover px-8 h-[20rem] object-fill`}
        >
          <div className="flex flex-col justify-end lg:h-72 h-80">
            <div className="text-white text-lg pb-8 font-bold">PLAYLIST</div>
            <div className="text-white text-7xl font-bold"> {albumTitle}</div>
            <div className="text-gray-300 text-lg font-semibold">
              {/* Music from Nicki Minaj, Kodak Black and EST Gee. */}
              {albumDescription}
            </div>
            <div className="text-white">
              {" "}
              {/* <span>Spotify</span>{" "} */}
              <span>
                {" "}
                <ul className="flex flex-col lg:inline-flex lg:flex-row">
                  <li className="lg:pr-2 pt-2">{genre}</li>
                  <li className="lg:pr-2 pt-2">14,648,696 likes</li>
                  <li className="pt-2">
                    <span className="lg:pl-1 font-bold">50 songs,</span> 2 hr 28
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
                {isBeingPlayed ? (
                  <BorderOutlined
                    style={{ color: "#1FDF64" }}
                    onClick={async() =>{ 
                    const response =  await getPermissionToPlay(id);
                    //Work on fixing the blockchain first and have it fixed before completing this function.
                    console.log(response);
                      setIsBeingPlayed(!isBeingPlayed)
                    }}
                  />
                ) : (
                  <PlayCircleFilled
                    style={{ color: "#1FDF64" }}
                    onClick={() => {
                      setAlbumBeingPlayed(albumList);
                      setAlbumTitleBeingPlayed(albumTitle)
                      setIsBeingPlayed(!isBeingPlayed);
                    }}
                  />
                )}
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
          <div className="px-8 pb-8">
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
                  <th scope="col" className="hidden lg:flex py-3 px-6">
                    Date Added
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <ClockCircleOutlined />
                  </th>
                </tr>
              </thead>
              <tbody>
                {tracks.map((track, idx) => {
                  return (
                    <tr
                      className=" text-gray-400 bg-transparent border-gray-700 hover:bg-gray-700 "
                      key={idx}
                    >
                      <td className="p-4 w-4">{idx + 1}</td>
                      <th
                        scope="row"
                        className="py-4 px-1 font-medium text-gray-200  whitespace-nowrap "
                      >
                        {track.trackName}
                      </th>
                      <td className="py-4 px-6">{albumTitle}</td>
                      <td className="hidden lg:flex py-4 px-6">{convertDate(dateAdded)}</td>
                      <td className="py-4 px-6">{(timesArray[0]?.duration)}</td>
                    </tr>
                  );
                })}
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
