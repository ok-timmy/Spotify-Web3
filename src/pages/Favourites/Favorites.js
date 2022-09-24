import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AlbumCard from '../../components/AlbumCard/AlbumCard'
import { SpotifyContext } from '../../Context/SpotifyContext';

const Favorites = () => {
  const { currentAccount} = useContext(SpotifyContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!currentAccount){
       return navigate("/");
    }
 },[]);

  return (
    <div className="mt-2 px-6 pt-6">
        <div className="flex justify-between">
          <h2 className="text-white text-2xl pb-4 pt-8"> My Favorite Playlists</h2> 
        </div>
        <div className=" pb-14 pt-2 grid grid-cols-4 gap-x-8">
          <AlbumCard/>
          <AlbumCard/>
          <AlbumCard/>
          <AlbumCard/>
        </div>
        </div>
  )
}

export default Favorites