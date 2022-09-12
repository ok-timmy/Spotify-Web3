const { expect } = require("chai");
const {ethers} = require("hardhat")


describe("Should Deploy the Contract", ()=> {
    let musicStore, deployer, user1, user2, user3, user4;
    beforeEach(async()=> {
        const MusicStore = await ethers.getContractFactory("MusicStore");
         musicStore = await MusicStore.deploy();
      
        await musicStore.deployed();
        [deployer, user1, user2, user3, user4] = await ethers.getSigners()
    
    })
    describe("Confirms Contract Address", ()=> {

        it("Contracts deploys properly", async()=> {
          
            console.log(
              `Music Store Contract is deployed to ${musicStore.address}`
            );
            console.log(deployer.address, "Deployer");
            console.log(user1.address, "User 1");
            console.log(user2.address, "User 2");
            console.log(user3.address, "User 3");
            console.log(user4.address, "User 4");
        })
    })
})

// Test For Album/Playlist creation
// Test to confirm all details of each album
// Test to fetch all Albums/Playlists
// Test for Subscribe function
// Test to confirm the number of playable albums a person gets upon subscribing
// Test for play function
// Test to confirm the amount earned function
// Test for withdraw function
// Test for array of published works function
// Test for array of liked albums
// Test for ratings of a particular album
// Test for songs in album/rating count
// Test for ability to like an album
// Test for ability to rate an album