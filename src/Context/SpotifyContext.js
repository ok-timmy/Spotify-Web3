import React, { useEffect, useState } from "react";
import Web3 from "web3";
import musicStoreJSON from "../contract_abi/MusicStore.json";
import { toWei } from "../Utils/convert";


export const SpotifyContext = React.createContext();

export const SpotifyProvider = ({ children }) => {

  const musicStoreABI = musicStoreJSON.abi;
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setisLoading] = useState(false);

  var Contract = require("web3-eth-contract");
    const web3 = window.web3;
    



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

  //Function to Upload Album
  const uploadAlbum = async() => {
    await Contract.setProvider(
      "https://rinkeby.infura.io/v3/9e1456b5bcab482c94916c854b7a0736"

    );
    const musicStoreContract = await new web3.eth.Contract(
      musicStoreABI,
      // "0xA844156Ba166535dD3ab29cA0fB93Ab48Dd6b953"
      "0x36A033f26b97bE9fAA4DD004C092f028ebF32aDc"
    );

    const allAlbums = musicStoreContract.methods
    .uploadAlbum(
      "First Album",
      "Sungba",
      "Album",
      "Hip-Hop",
      ["Track 1", "Track 2", "Track 3", "Track 4", "Track 5"],
      "Cover_Image.png",
      200000000
    ).send({from: currentAccount}, (err, result)=> {
      if(err){console.log(err)} console.log(result);
    });
    console.log(allAlbums);
  }

  //Function to get the User details of the connected account
  const getUserDetails = async () => {
    await Contract.setProvider(
      "https://rinkeby.infura.io/v3/9e1456b5bcab482c94916c854b7a0736"

    );
    const musicStoreContract = await new web3.eth.Contract(
      musicStoreABI,
      // "0xA844156Ba166535dD3ab29cA0fB93Ab48Dd6b953"
      "0x36A033f26b97bE9fAA4DD004C092f028ebF32aDc"
    );
    // console.log(musicStoreContract.methods);
    const userDetails = await musicStoreContract.methods
      .getUserDetails(currentAccount).call((err, result)=> {
        if(err){
          console.log(err);
        } console.log(result)
      });
    console.log(await userDetails);
  };

  //Function to get the permission to play an album
  const getPermissionToPlay = async () => {
    await Contract.setProvider(
      "https://rinkeby.infura.io/v3/9e1456b5bcab482c94916c854b7a0736"

    );
    const musicStoreContract = await new web3.eth.Contract(
      musicStoreABI,
      // "0xA844156Ba166535dD3ab29cA0fB93Ab48Dd6b953"
      "0x36A033f26b97bE9fAA4DD004C092f028ebF32aDc"
    );

    await musicStoreContract.methods.play(1).send({from: currentAccount}, (err, result)=> {
      if(err){
        console.log(err)
      } console.log(result);
    })
  };

  //Function to get all albums
  const getAllAlbums = async () => {
    await Contract.setProvider(
      "https://rinkeby.infura.io/v3/9e1456b5bcab482c94916c854b7a0736"

    );
    const musicStoreContract = await new web3.eth.Contract(
      musicStoreABI,
      // "0xA844156Ba166535dD3ab29cA0fB93Ab48Dd6b953"
      "0x36A033f26b97bE9fAA4DD004C092f028ebF32aDc"
    );

    const allAlbums = await musicStoreContract.methods
    .getAllAlbums().call();
    console.log(allAlbums);
  };


  //Function for User to subscribe
  const userSubscribe = async () => {
    await Contract.setProvider(
      "https://rinkeby.infura.io/v3/9e1456b5bcab482c94916c854b7a0736"

    );
    const musicStoreContract = await new web3.eth.Contract(
      musicStoreABI,
      // "0xA844156Ba166535dD3ab29cA0fB93Ab48Dd6b953"
      "0x36A033f26b97bE9fAA4DD004C092f028ebF32aDc"
    );

    const allAlbums = await musicStoreContract.methods
    .subscribe(3, currentAccount, toWei("100000000000000000")).send({from: currentAccount}, (err, result)=> {
      if(err){
        console.log(err) 
      } console.log(result)
    });
    console.log(allAlbums);
  }

  //Function to filter an album by category based on route
  const getCategory = async (category) => {
    await Contract.setProvider(
      "https://rinkeby.infura.io/v3/9e1456b5bcab482c94916c854b7a0736"

    );
    const musicStoreContract = await new web3.eth.Contract(
      musicStoreABI,
      // "0xA844156Ba166535dD3ab29cA0fB93Ab48Dd6b953"
      "0x36A033f26b97bE9fAA4DD004C092f028ebF32aDc"
    );

    const allAlbums = await musicStoreContract.methods
    .getAllAlbums().call();

    const albumCategory = allAlbums.filter((e)=>{
      return category = e.category
    })
    console.log(albumCategory);
  };

  //Function to get all published albums by a user
  const getUserAlbums = async (user) => {
    await Contract.setProvider(
      "https://rinkeby.infura.io/v3/9e1456b5bcab482c94916c854b7a0736"

    );
    const musicStoreContract = await new web3.eth.Contract(
      musicStoreABI,
      // "0xA844156Ba166535dD3ab29cA0fB93Ab48Dd6b953"
      "0x36A033f26b97bE9fAA4DD004C092f028ebF32aDc"
    );

   await musicStoreContract.methods.getUserUploads(currentAccount).call((err, result)=> {
    if(err){
      console.log(err)
    } console.log(result)
   })
  };

  //Function to withdraw from the app
  const withdraw = async (user, amount) => {
    await Contract.setProvider(
      "https://rinkeby.infura.io/v3/9e1456b5bcab482c94916c854b7a0736"

    );
    const musicStoreContract = await new web3.eth.Contract(
      musicStoreABI,
      // "0xA844156Ba166535dD3ab29cA0fB93Ab48Dd6b953"
      "0x36A033f26b97bE9fAA4DD004C092f028ebF32aDc"
    );

    await musicStoreContract.methods.withdraw(toWei("1000000000000000")).send({from: currentAccount}, (err, result)=> {
      if(err) {
        console.log(err)
      } console.log(result);
    })
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
        getCategory
      }}
    >
      {children}{" "}
    </SpotifyContext.Provider>
  );
};

// let fs = require("fs");
// let axios = require("axios");

// let media = ["JTiger.mp3", "JTwinkle.mp3", "NonFungible.png"];
// let ipfsArray = [];
// let promises = [];

// for (let i = 0; i < media.length; i++) {
//   promises.push(
//     new Promise((res, rej) => {
//       fs.readFile(`${__dirname}/export/${media[i]}`, (err, data) => {
//         if (err) rej();
//         ipfsArray.push({
//           path: `media/${i}`,
//           content: data.toString("base64"),
//         });
//         res();
//       });
//     })
//   );
// }
// Promise.all(promises).then(() => {
//   axios
//     .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
//       headers: {
//         "X-API-KEY":
//           "AASBLH8iONxGtbGgOGjtNCDhAslKNUnOYtdBx1UYN6fbkqb1PxOg33aBBnahEBMZ",
//         "Content-Type": "application/json",
//         accept: "application/json",
//       },
//     })
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

/*
Wrap this codes into a function that is usable on the frontend.
The media array will be populated by an object containing the track image and track song for each track the author selects for each input on the frontend.
Then we get the response.data and use it for the metadata to upload it on the blockchain from the frontend.

Create context api with the web3js or etherjs api.
create a connect button function that will only be connecting to the particular network we want to use it with.
Create a user variable that keeps record of the connected user and is reusable on other pages.
Create an isLoading function that will be true whenever we are communicating with the blockchain
Create an upload function that will contain the functions described above.
Create a play album function that must first get permission from the blockchain to play before playing it.
Create a get all albums function that does not require a user to be connected before it can get it.
Create a filter function that can filter the all albums array when a user wants albums from a category, this will make use of the route of the current page to do this
Create a function to get all the published albums by a user, but to display this, an account needs to be connected.
Create a function that will be called whenever a user navigates to their profile to fetch their amount earned, if they have an active subscription, Number of playable albums they have left, and a link to route them to their own works.
Create a withdraw function for each user where there is a popup, the user inputs how much they will like to withdraw and they get the money paid into their wallet.


*/
