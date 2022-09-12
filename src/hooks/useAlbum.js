import { useState, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

export const useAlbum = (contract) => {
  const { token } = useMoralisWeb3Api();
  const { isInitialized } = useMoralis();

  const [albumDetails, setAlbumDetails] = useState();

  
  useEffect(() => {
    const fetchAlbum = async () => {
      return await token
        .getAllTokenIds({ address: contract, chain: "mumbai" })
        .then((result) => result);
    };
    if(isInitialized) {
      console.log( isInitialized)
        fetchAlbum().then((song)=> {
            setAlbumDetails(song.result);
            console.log(song.result)
        })
    }
  }, [isInitialized, contract])
  
  console.log(albumDetails);

  return { albumDetails};
};
