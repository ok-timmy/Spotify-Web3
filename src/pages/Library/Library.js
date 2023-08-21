import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import { SpotifyContext } from "../../Context/SpotifyContext";
import { toString } from "../../Utils/convert";

const Library = () => {
  const { allPublishedAlbums, isLoading } = useContext(SpotifyContext);

  const search = useLocation().search;
  console.log(useLocation());
  console.log(search)

  let query, category, sortedAlbums, sortedCategories;

  if (search !== '') {
    query = new URLSearchParams(search).get("query");
    category =  search.split("=")[1].replaceAll("%20", " ");
  } else {
    query = null;
    category = null;
  }



  if (query) {
    sortedAlbums =
      query &&
      [...allPublishedAlbums].sort((a, b) => {
        // console.log(b.releaseDate - a.releaseDate)
        return b.releaseDate - a.releaseDate;
      });
  } else if (category) {
    const sortedCategories =
      category &&
      [...allPublishedAlbums].filter((allPublishedAlbum) => {
        return category === toString(allPublishedAlbum.genre);
      });

    console.log(sortedCategories);
    console.log(category);
  } else {
    sortedAlbums = [];
    sortedCategories = [];
  }

  if (isLoading) {
    return <div>Loading....</div>;
  }


  return (
    <div className="mt-2 px-6 pt-6">
      <div className="flex justify-between">
        <h2 className="text-white text-2xl pb-4 pt-8">
          {" "}
          {query !== null
            ? "Popular New Release"
            : category !== null
            ? `${category}`
            : "Spotify Top Playlists"}
        </h2>
      </div>
      <div className=" pb-14 pt-2 grid gap-y-4 justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-4 xl:gap-x-8 text-white">
        {query !== null ? (
          sortedAlbums.map((album) => {
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
          })
        ) : category !== null ? (
          sortedCategories ? (
            sortedCategories.map((album) => {
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
            })
          ) : (
            <div>{`There Are No Playlists for ${category} Yet`}</div>
          )
        ) : (
          allPublishedAlbums.map((album) => {
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
          })
        )}
      </div>
    </div>
  );
};

export default Library;
