import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AlbumCard from '../../components/AlbumCard/AlbumCard'
import { SpotifyContext } from '../../Context/SpotifyContext'
import { toString } from '../../Utils/convert'

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
        <div className=" pb-14 pt-2 grid grid-cols-4 gap-x-8 gap-y-8 text-white">
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

          {/* {userDetails.length !==0 && userDetails.uploadedPlaylists.length} */}
        </div>
        </div>
  )
}

export default Published