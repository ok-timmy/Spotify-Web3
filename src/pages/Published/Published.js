import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import AlbumCard from '../../components/AlbumCard/AlbumCard'
import { SpotifyContext } from '../../Context/SpotifyContext'

const Published = () => {
  const {userDetails, isLoading, currentAccount} = useContext(SpotifyContext)
  console.log(userDetails.uploadedAlbums)

  let navigate = useNavigate();

  useEffect(() => {
    if (!currentAccount){
       return navigate("/");
    }
 },[]);

  if(isLoading) {
    return <div className='text-white'>Loading....</div>
  }

  return (
    <div className="mt-2 px-6 pt-6">
        <div className="flex justify-between">
          <h2 className="text-white text-2xl pb-4 pt-8"> My Published Playlists</h2> 
        </div>
        <div className=" pb-14 pt-2 grid grid-cols-4 gap-x-8 text-white">
          {/* <AlbumCard/>
          <AlbumCard/>
          <AlbumCard/>
          <AlbumCard/> */}

          {userDetails.length !==0 && userDetails.uploadedAlbums.length}
        </div>
        </div>
  )
}

export default Published