let fs = require("fs");
let axios = require("axios");

let media = ["JTiger.mp3", "JTwinkle.mp3", "NonFungible.png"];
let ipfsArray = [];
let promises = [];

for (let i = 0; i < media.length; i++) {
  promises.push(
    new Promise((res, rej) => {
      fs.readFile(`${__dirname}/export/${media[i]}`, (err, data) => {
        if (err) rej();
        ipfsArray.push({
          path: `media/${i}`,
          content: data.toString("base64"),
        });
        res();
      });
    })
  );
}
Promise.all(promises).then(() => {
  axios
    .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
      headers: {
        "X-API-KEY":
          "AASBLH8iONxGtbGgOGjtNCDhAslKNUnOYtdBx1UYN6fbkqb1PxOg33aBBnahEBMZ",
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

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
