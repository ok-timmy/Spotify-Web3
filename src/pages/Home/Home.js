import React, { useContext } from "react";
import "./Home.css";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import { SpotifyContext } from "../../Context/SpotifyContext";
import { useNavigate } from "react-router-dom";
import { toString } from "../../Utils/convert";

const Home = () => {
  const { getPermissionToPlay, allPublishedAlbums } =
    useContext(SpotifyContext);
  let navigate = useNavigate();

  return (
    <>
      <button
        className="bg-white text-black ml-4 px-3 py-3"
        onClick={getPermissionToPlay}
      >
        Play Album
      </button>
      <div className="mt-2 px-6 pt-6">
        <div className="flex justify-between">
          <h2 className="text-white text-2xl"> Spotify Playlists</h2>
          <span
            className="text-gray-400 font-bold tracking-wider cursor-pointer hover:text-white"
            onClick={() => navigate("/library")}
          >
            SEE ALL
          </span>
        </div>
        <div className=" pb-14 pt-2 grid gap-y-4 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-4 xl:gap-x-8">
          {allPublishedAlbums.slice(0, 4).map((album) => {
            return (
              <div key={album.id}>
                <AlbumCard
                  id={album.id}
                  imageUrl={album.coverImage}
                  albumTitle={toString(album.title)}
                  albumDescription={album.description}
                  albumList={album.tracks}
                  genre={toString(album.genre)}
                  dateAdded={Number(album.releaseDate)}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-between">
          <h2 className="text-white text-2xl"> Uniquely Yours</h2>
          <span
            className="text-gray-400 font-bold tracking-wider cursor-pointer hover:text-white"
            onClick={() => navigate("/favourites")}
          >
            SEE ALL
          </span>
        </div>

        <div className=" pb-14 pt-2 grid gap-y-4 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-4 xl:gap-x-8">
          <AlbumCard />
          <AlbumCard />
          <AlbumCard />
          <AlbumCard />
        </div>

        <div className="flex justify-between">
          <h2 className="text-white text-2xl"> Popular New Releases</h2>
          <span
            className="text-gray-400 font-bold tracking-wider cursor-pointer hover:text-white"
            onClick={() => navigate("/library?query=popular")}
          >
            SEE ALL
          </span>
        </div>

        <div className=" pb-14 pt-2 grid gap-y-4 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-4 xl:gap-x-8">
          <AlbumCard />
          <AlbumCard />
          <AlbumCard />
          <AlbumCard />
        </div>
      </div>
    </>
  );
};

export default Home;
