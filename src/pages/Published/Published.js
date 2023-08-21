import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import { SpotifyContext } from "../../Context/SpotifyContext";
import { toString } from "../../Utils/convert";
import Upload from "../../images/Upload.png";

const Published = () => {
  const { userDetails, isLoading, currentAccount } = useContext(SpotifyContext);
  console.log(userDetails);

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
    <div className="mt-2 px-6 pt-6">
      <div className="flex justify-between">
        <h2 className="text-white text-2xl pb-4 pt-8">
          {" "}
          My Published Playlists
        </h2>
      </div>
      {userDetails.uploadedPlaylists.length !== 0 ? (
        <div className=" pb-14 pt-2 grid gap-y-4 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-4 xl:gap-x-8 text-white">
          {userDetails.uploadedPlaylists.map((album) => {
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
        <div className="px-8 py-1 mt-[-3rem] mx-auto mb-8 w-[60%] h-auto text-white text-lg">
        <img src={Upload} alt="No Favourites" />
        <p className="text-center text-lg">
          Ooops.. You do not have not created a playlist before
        </p>
        <p className="text-center">
          {" "}
          <button
            className="px-4 py-1 rounded-md bg-gray-600"
            onClick={() => navigate("/upload")}
          >
            Click here
          </button>{" "}
          to create your first playlist
        </p>
      </div>
      )}
    </div>
  );
};
export default Published;
