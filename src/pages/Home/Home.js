import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
// import { library } from "../../helpers/albumList";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import { SpotifyContext } from "../../Context/SpotifyContext";


const Home = () => {
  const {getUserDetails, getAllAlbums, userSubscribe, uploadAlbum, getUserAlbums, getPermissionToPlay, withdraw} = useContext(SpotifyContext)
  return (
    <>
    <button className="bg-white text-black ml-4 px-3 py-3" onClick={uploadAlbum}>Upload</button>
    <button className="bg-white text-black ml-4 px-3 py-3" onClick={getUserDetails}>Get User Details</button>
    <button className="bg-white text-black ml-4 px-3 py-3" onClick={getAllAlbums}>Get All Albums</button>
    <button className="bg-white text-black ml-4 px-3 py-3" onClick={userSubscribe}>User Subscribe</button>
    <button className="bg-white text-black ml-4 px-3 py-3" onClick={getUserAlbums}>User Albums</button>
    <button className="bg-white text-black ml-4 px-3 py-3" onClick={getPermissionToPlay}>Play Album</button>
    <button className="bg-white text-black ml-4 px-3 py-3" onClick={withdraw}>Withdraw</button>
      <div className="mt-2 px-6 pt-6">
        <div className="flex justify-between">
          <h2 className="text-white text-2xl"> Spotify Playlists</h2> 
          <span className="text-gray-400 font-bold tracking-wider">SEE ALL</span>
        </div>
        <div className=" pb-14 pt-2 grid grid-cols-4 gap-x-8">
          <AlbumCard/>
          <AlbumCard/>
          <AlbumCard/>
          <AlbumCard/>
        </div>

        <div className="flex justify-between">
          <h2 className="text-white text-2xl"> Uniquely Yours</h2> 
          <span className="text-gray-400">SEE ALL</span>
        </div>

        <div className=" pb-14 pt-2 grid grid-cols-4 gap-x-8">
          <AlbumCard/>
          <AlbumCard/>
          <AlbumCard/>
          <AlbumCard/>
        </div>

        <div className="flex justify-between">
          <h2 className="text-white text-2xl"> Popular New Releases</h2> 
          <span className="text-gray-400">SEE ALL</span>
        </div>

        <div className=" pb-14 pt-2 grid grid-cols-4 gap-x-8">
          <AlbumCard/>
          <AlbumCard/>
          <AlbumCard/>
          <AlbumCard/>
        </div>
      </div>
    </>
  );
};

export default Home;
