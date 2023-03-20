import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { toBytes, toWei } from "../Utils/convert";
import { musicweb3Contract } from "../Utils/musicStoreContract";
import { v4 as uuidv4 } from "uuid";

export const SpotifyContext = React.createContext();

export const SpotifyProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [userDetails, setUserDetails] = useState([]);
  const [allPublishedAlbums, setAllPublishedAlbums] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [aboutToComplete, setAboutToComplete] = useState(false);
  const [isBeingPlayed, setIsBeingPlayed] = useState(false);
  const [albumBeingPlayed, setAlbumBeingPlayed] = useState([]);
  const [albumTitleBeingPlayed, setAlbumTitleBeingPlayed] = useState("");
  const [openSubscribeDialog, setOpenSubscribeDialog] = useState(false);
  const [playlistCover, setPlaylistCover] = useState();
  const [playlistDetails, setPlaylistDetails] = useState({
    title: "",
    description: "",
    genre: "general",
    cover: "",
    tracks: [],
  });
  const [tArray, setTArray] = useState([
    {
      id: uuidv4(),
      name: "",
      trackCover: [],
      trackFile: [],
    },
  ]);

  console.log(allPublishedAlbums);

  const handleChange = (e) => {
    setPlaylistDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(playlistDetails);
  };

  //Function to connect account
  const connectWallet = async () => {
    if (window.ethereum) {
      setisLoading(true);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setCurrentAccount(accounts[0]);
      setisLoading(false);
      console.log(accounts);
      // return true;
    }
    return false;
    // alert("Please Install Metamask");
  };

  //Function to get the User details of the connected account
  const getUserDetails = async (account) => {
    if (!account) {
      return [];
    }

    //Get the musicStore Contract
    const musicStoreContract = await musicweb3Contract();
    // console.log(musicStoreContract.methods);

    //Get User Details from the blockchain
    const userDetail = await musicStoreContract.methods
      .getUserDetails(account)
      .call((err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
        setUserDetails(result);
      });
    // console.log(await userDetails);
    setUserDetails(userDetail);
  };

  //Function to get all albums
  const getAllPlaylists = async () => {
    // Connect to the musicStore contract
    const musicStoreContract = await musicweb3Contract();

    //Get All albums that has been published via the smartcontract
    const allAlbums = await musicStoreContract.methods.getAllPlaylists().call();
    setAllPublishedAlbums(allAlbums);
    // console.log(allAlbums);
  };

  //Fetch User details everytime the wallet address changes
  useEffect(() => {
    setisLoading(true);
    getUserDetails(currentAccount);
    setisLoading(false);
  }, [currentAccount]);

  //Use Effect to call fetch all albums once
  useEffect(() => {
    getAllPlaylists();
  }, []);

  //Function to Upload Album
  const uploadAlbum = async (playlist) => {
    //Get the musicStore Contract
    console.log(playlist.tracks);
    console.log(playlist.cover);
    const musicStoreContract = await musicweb3Contract();

    const allAlbums = musicStoreContract.methods
      .uploadPlaylist(
        toBytes(playlist.title),
        playlist.description,
        toBytes(playlist.genre),
        playlist.tracks,
        playlist.cover,
        new Date().getTime()
      )
      .send({ from: currentAccount }, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      })
      .then((e) => {
        console.log(e);

        alert("Playlist Uploaded Successfully!!");
        setisLoading(false);
      })
      .catch((err) => console.log(err));
    console.log(allAlbums);
  };

  //Function to get the permission to play an album
  //Put the album Id in the function
  const getPermissionToPlay = async (id) => {
    // Connect to the musicStore contract
    const musicStoreContract = await musicweb3Contract();

    await musicStoreContract.methods
      .play(id)
      .send({ from: currentAccount }, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          getUserDetails(currentAccount);
          setIsBeingPlayed(true);
        }
        console.log(result);
      });
  };

  //Function for User to subscribe
  const userSubscribe = async (id) => {
    // Connect to the musicStore contract
    const musicStoreContract = await musicweb3Contract();

    const response = await musicStoreContract.methods
      .subscribe(id, currentAccount, toWei(String(id)))
      .send({ from: currentAccount }, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });

    console.log(response);
  };

  //Function to filter an album by category based on route
  const getCategory = async (category) => {
    // Connect to the musicStore contract
    const musicStoreContract = await musicweb3Contract();

    const allAlbums = await musicStoreContract.methods.getAllAlbums().call();

    const albumCategory = allAlbums.filter((e) => {
      return (category = e.category);
    });
    console.log(albumCategory);
  };

  //Function to get all published albums by a user
  const getUserAlbums = async (user) => {
    // Connect to the musicStore contract
    const musicStoreContract = await musicweb3Contract();

    await musicStoreContract.methods
      .getUserUploads(currentAccount)
      .call((err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
  };

  //Function to withdraw from the app
  const withdraw = async (amount) => {
    // Connect to the musicStore contract
    const musicStoreContract = await musicweb3Contract();

    await musicStoreContract.methods
      .withdraw(toWei(String(1000000000000000 * amount)))
      .send({ from: currentAccount }, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
  };

  return (
    <SpotifyContext.Provider
      value={{
        isLoading,
        currentAccount,
        connectWallet,
        getUserDetails,
        getAllPlaylists,
        userSubscribe,
        uploadAlbum,
        getUserAlbums,
        getPermissionToPlay,
        withdraw,
        getCategory,
        playlistCover,
        setPlaylistCover,
        setisLoading,
        playlistDetails,
        setPlaylistDetails,
        handleChange,
        isBeingPlayed,
        setIsBeingPlayed,
        userDetails,
        allPublishedAlbums,
        tArray,
        setTArray,
        aboutToComplete,
        setAboutToComplete,
        albumBeingPlayed,
        setAlbumBeingPlayed,
        albumTitleBeingPlayed,
        setAlbumTitleBeingPlayed,
        openSubscribeDialog,
        setOpenSubscribeDialog,
      }}
    >
      {children}{" "}
    </SpotifyContext.Provider>
  );
};

/*

Create a play album function that must first get permission from the blockchain to play before playing it.
Create a get all albums function that does not require a user to be connected before it can get it.
Create a filter function that can filter the all albums array when a user wants albums from a category, this will make use of the route of the current page to do this
Create a function to get all the published albums by a user, but to display this, an account needs to be connected.
Create a function that will be called whenever a user navigates to their profile to fetch their amount earned, if they have an active subscription, Number of playable albums they have left, and a link to route them to their own works.
Create a withdraw function for each user where there is a popup, the user inputs how much they will like to withdraw and they get the money paid into their wallet.


*/
