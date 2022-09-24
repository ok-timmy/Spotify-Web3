import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { toWei } from "../Utils/convert";
import { musicweb3Contract } from "../Utils/musicStoreContract";

export const SpotifyContext = React.createContext();

export const SpotifyProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [userDetails, setUserDetails] = useState([]);
  const [allPublishedAlbums, setAllPublishedAlbums] = useState([])
  const [isLoading, setisLoading] = useState(false);
  const [isBeingPlayed, setIsBeingPlayed] = useState(true);
  const [playlistCover, setPlaylistCover] = useState();
  const [playlistDetails, setPlaylistDetails] = useState({
    author: "",
    title: "",
    genre: "general",
    cover: "",
    tracks: "",
  });

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
    const userDetails = await musicStoreContract.methods
      .getUserDetails(account)
      .call((err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
    // console.log(await userDetails);
    setUserDetails(userDetails);
  };

  //Function to get all albums
  const getAllAlbums = async () => {
    // Connect to the musicStore contract
    const musicStoreContract = await musicweb3Contract();

    //Get All albums that has been published via the smartcontract
    const allAlbums = await musicStoreContract.methods.getAllAlbums().call();
    setAllPublishedAlbums(allAlbums);
    console.log(allAlbums);
  };

  //Fetch User details everytime the wallet address changes
  useEffect(() => {
    setisLoading(true);
    getUserDetails(currentAccount);
    setisLoading(false);
  }, [currentAccount]);
  
  //Use Effect to call fetch all albums once
  useEffect(() => {
    getAllAlbums();
  }, [])
  
  
  //Function to Upload Album
  const uploadAlbum = async () => {
    //Get the musicStore Contract
    const musicStoreContract = await musicweb3Contract();

    const allAlbums = musicStoreContract.methods
      .uploadAlbum(
        "First Album",
        "Sungba",
        "Album",
        "Hip-Hop",
        ["Track 1", "Track 2", "Track 3", "Track 4", "Track 5"],
        "Cover_Image.png",
        200000000
      )
      .send({ from: currentAccount }, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
    console.log(allAlbums);
  };

  //Function to get the permission to play an album
  const getPermissionToPlay = async () => {
    // Connect to the musicStore contract
    const musicStoreContract = await musicweb3Contract();

    await musicStoreContract.methods
      .play(1)
      .send({ from: currentAccount }, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
  };

  

  //Function for User to subscribe
  const userSubscribe = async () => {
    // Connect to the musicStore contract
    const musicStoreContract = await musicweb3Contract();

    const response = await musicStoreContract.methods
      .subscribe(3, currentAccount, toWei("100000000000000000"))
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
  const withdraw = async (user, amount) => {
    // Connect to the musicStore contract
    const musicStoreContract = await musicweb3Contract();

    await musicStoreContract.methods
      .withdraw(toWei("1000000000000000"))
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
        getAllAlbums,
        userSubscribe,
        uploadAlbum,
        getUserAlbums,
        getPermissionToPlay,
        withdraw,
        getCategory,
        playlistCover,
        setPlaylistCover,
        playlistDetails,
        setPlaylistDetails,
        handleChange,
        isBeingPlayed,
        setIsBeingPlayed,
        userDetails,
        allPublishedAlbums
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
