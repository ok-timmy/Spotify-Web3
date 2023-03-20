import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import { SpotifyContext } from "../../Context/SpotifyContext";
import FavouritePage from "../../images/FavouritesPage.png";

const Favorites = () => {
  const { userDetails, isLoading, currentAccount } = useContext(SpotifyContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!currentAccount) {
      return navigate("/");
    }
  }, []);

  if (isLoading) {
    return <div className="text-white">Loading....</div>;
  }

  return (
    <div className="mt-2 px-6 pt-6 text-white">
      <div className="flex justify-between">
        <h2 className="text-white text-2xl pb-4 pt-8">
          {" "}
          My Favorite Playlists
        </h2>
      </div>
      {userDetails.likedPlaylists.length !== 0 ? (
        <div className=" pb-14 pt-2 grid grid-cols-4 gap-x-8 gap-y-8 text-white">
          {userDetails.likedPlaylists.map((album) => {
            return (
              <div key={album.id}>
                <AlbumCard
                  id={album.id}
                  imageUrl={album.coverImage}
                  albumTitle={toString(album.title)}
                  albumDescription={album.description}
                  albumList={album.tracks[0]}
                  genre={toString(album.genre)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="px-8 py-1 mx-auto mb-8 w-[60%] h-auto text-white text-lg">
          <img src={FavouritePage} alt="No Favourites" />
          <p className="text-center">
            Ooops.. You do not have any favourite playlists at the moment
          </p>
          <p className="text-center">
            {" "}
            <button
              className="px-4 py-1 rounded-md bg-gray-600"
              onClick={() => navigate("/")}
            >
              Go Home
            </button>{" "}
            to select Favourites
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
