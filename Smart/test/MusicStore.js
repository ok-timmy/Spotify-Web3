const { expect } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num.toString());

describe("Should Deploy the Contract", () => {
  let musicStore, deployer, user1, user2, user3, user4;
  beforeEach(async () => {
    const MusicStore = await ethers.getContractFactory("MusicStore");
    musicStore = await MusicStore.deploy();

    await musicStore.deployed();
    [deployer, user1, user2, user3, user4] = await ethers.getSigners();
  });
  describe("Confirms Contract Address", () => {
    it("Contracts deploys properly", async () => {
      console.log(`Music Store Contract is deployed to ${musicStore.address}`);
        console.log(deployer.address, "Deployer");
        console.log(user1.address, "User 1");
        console.log(user2.address, "User 2");
        console.log(user3.address, "User 3");
        console.log(user4.address, "User 4");
    });

    // Test For Playlist creation with User 1
    it("Test For Playlist Creation with user 1", async () => {
      expect(
        await musicStore
          .connect(user1)
          .uploadPlaylist(
            ethers.utils.formatBytes32String("First Playlist"),
            ethers.utils.formatBytes32String("Sungba"),
            ethers.utils.formatBytes32String("Hip-Hop"),
            ["Track 1", "Track 2", "Track 3", "Track 4", "Track 5"],
            "Cover_Image.png",
            200000000
          )
      ).emit("Uploaded");

      const albumOne = await musicStore.playlists(1);
      expect(albumOne.author).equal(user1.address);
      expect(ethers.utils.parseBytes32String(albumOne.title)).equal("First Playlist");
      expect(ethers.utils.parseBytes32String(albumOne.description)).equal("Sungba");
      expect(ethers.utils.parseBytes32String(albumOne.genre)).equal("Hip-Hop");
      expect(albumOne.ratings).equal(0);
    });
    // Test For Playlist creation with User 2
    it("Test For Playlist Creation with user 2", async () => {
      expect(
        await musicStore
          .connect(user2)
          .uploadPlaylist(
            ethers.utils.formatBytes32String("First Playlist"),
            ethers.utils.formatBytes32String("Sweet Songs"),
            ethers.utils.formatBytes32String("Mood"),
            ["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"],
            "Cover_Image.png",
            1000000000
          )
      ).emit("Uploaded");
    });
    // Test For Playlist creation with User 3
    it("Test For Playlist Creation with user 3", async () => {
      expect(
        await musicStore
          .connect(user3)
          .uploadPlaylist(
            ethers.utils.formatBytes32String("My First Playlist"),
            ethers.utils.formatBytes32String("Idupe"),
            ethers.utils.formatBytes32String("Gospel"),
            ["Ebe", "Iri", "Idupe", "Asise", "Mimo"],
            "Cover_Image.png",
            45000000000
          )
      ).emit("Uploaded");
    });
    // Test For Playlist creation with User 1 again
    it("Test For Playlist Creation with user 1 again", async () => {
      expect(
        await musicStore
          .connect(user1)
          .uploadPlaylist(
            ethers.utils.formatBytes32String("Second Playlist"),
            ethers.utils.formatBytes32String("Nzaza"),
            ethers.utils.formatBytes32String("Jazz"),
            ["Nzaza", "Sungba", "Adisa", "Bandana", "PBUY"],
            "Cover_Image.png",
            45000000000
          )
      ).emit("Uploaded");
    });

    it("Check for the number of Playlist Uploaded", async () => {
      //Upload Playlist 1
      await musicStore
        .connect(user1)
        .uploadPlaylist(
          ethers.utils.formatBytes32String("First Playlist"),
          ethers.utils.formatBytes32String("Sungba"),
          ethers.utils.formatBytes32String("Hip-Hop"),
          ["Track 1", "Track 2", "Track 3", "Track 4", "Track 5"],
          "Cover_Image.png",
          200000000
        );

      //Upload Playlist 2
      await musicStore
        .connect(user2)
        .uploadPlaylist(
          ethers.utils.formatBytes32String("First Playlist"),
          ethers.utils.formatBytes32String("Sweet Songs"),
          ethers.utils.formatBytes32String("Mood"),
          ["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"],
          "Cover_Image.png",
          1000000000
        );

      //Upload  Playlist 3
      await musicStore
        .connect(user3)
        .uploadPlaylist(
          ethers.utils.formatBytes32String("My First Playlist"),
          ethers.utils.formatBytes32String("Idupe"),
          ethers.utils.formatBytes32String("Gospel"),
          ["Ebe", "Iri", "Idupe", "Asise", "Mimo"],
          "Cover_Image.png",
          45000000000
        );

      //Upload Playlist 4
      await musicStore
        .connect(user1)
        .uploadPlaylist(
          ethers.utils.formatBytes32String("Second Playlist"),
          ethers.utils.formatBytes32String("Nzaza"),
          ethers.utils.formatBytes32String("Jazz"),
          ["Nzaza", "Sungba", "Adisa", "Bandana", "PBUY"],
          "Cover_Image.png",
          45000000000
        );

      // Test to fetch all Playlists
      const albums = await musicStore.getAllPlaylists();
      expect(albums.length).equal(4);
    });

    // Test for Subscribe function for User 1
    it("Test For Subscribe Function for user 1", async () => {
      expect(await musicStore.connect(user1).subscribe(1, user1.address, toWei(2)))
        .emit("Subscribed")
        .withArgs(user1, toWei(2), 1);

      const userOne = await musicStore.users(user1.address);
      expect(userOne.isSubscribed).equal(true);

      // Test to confirm the number of playable albums a person gets upon subscribing
      expect(userOne.playablePlaylists).equal(50);

      it("Check if they can play a song");
    });
    // Test for Subscribe function for User 2
    it("Test For Subscribe Function for user 2", async () => {
      expect(await musicStore.connect(user2).subscribe(2, user2.address, toWei(4)))
        .emit("Subscribed")
        .withArgs(user2, toWei(4), 2);

      const userTwo = await musicStore.users(user2.address);
      expect(userTwo.isSubscribed).equal(true);

      // Test to confirm the number of playable albums a person gets upon subscribing
      expect(userTwo.playablePlaylists).equal(100);
    });
    // Test for Subscribe function for User 3
    it("Test For Subscribe Function for user 3", async () => {
      expect(await musicStore.connect(user3).subscribe(3, user3.address, toWei(6)))
        .emit("Subscribed")
        .withArgs(user3, toWei(6), 3);

      const userThree = await musicStore.users(user3.address);
      expect(userThree.isSubscribed).equal(true);

      // Test to confirm the number of playable albums a person gets upon subscribing
      expect(userThree.playablePlaylists).equal(200);
    });

    //Test to see if Users Can Play an Playlist
    it("Check if users have the authority to play a Playlist", async () => {
          
     const data = await musicStore.getUserDetails(user2.address);
      console.log(data, "User2 Data and Details");
      //Upload Playlist 1
      await musicStore
        .connect(user1)
        .uploadPlaylist(
          ethers.utils.formatBytes32String("First Playlist"),
          ethers.utils.formatBytes32String("Sungba"),
          ethers.utils.formatBytes32String("Hip-Hop"),
          ["Track 1", "Track 2", "Track 3", "Track 4", "Track 5"],
          "Cover_Image.png",
          200000000
        );

      //Upload Playlist 2
      await musicStore
        .connect(user2)
        .uploadPlaylist(
          ethers.utils.formatBytes32String("First Playlist"),
          ethers.utils.formatBytes32String("Sweet Songs"),
          ethers.utils.formatBytes32String("Mood"),
          ["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"],
          "Cover_Image.png",
          1000000000
        );

      //Upload Playlist 3
      await musicStore
        .connect(user3)
        .uploadPlaylist(
          ethers.utils.formatBytes32String("My First Playlist"),
          ethers.utils.formatBytes32String("Idupe"),
          ethers.utils.formatBytes32String("Gospel"),
          ["Ebe", "Iri", "Idupe", "Asise", "Mimo"],
          "Cover_Image.png",
          45000000000
        );

      //Upload Playlist 4
      await musicStore
        .connect(user1)
        .uploadPlaylist(
          ethers.utils.formatBytes32String("Second Playlist"),
          ethers.utils.formatBytes32String("Nzaza"),
          ethers.utils.formatBytes32String("Jazz"),
          ["Nzaza", "Sungba", "Adisa", "Bandana", "PBUY"],
          "Cover_Image.png",
          45000000000
        );

          // Test for array of all published works
        const allPlaylists = await musicStore.getAllPlaylists();
        // console.log(allPlaylists, "All Playlist published on the blockchain");

        //  Test for array of all published works by a user
        const worksByUserOne = await musicStore.getUserUploads(user1.address);
        // console.log("Works published by User 1", worksByUserOne);

        await musicStore.connect(user1).subscribe(1, user1.address, toWei(2))
        await musicStore.connect(user2).subscribe(2, user2.address, toWei(4));
        const data2 = await musicStore.getUserDetails(user2.address);
        console.log(data2, "User2 Data and Details after subscribing");
        await musicStore.connect(user3).subscribe(3, user3.address, toWei(6))

      
      //Test to see if the user can play as much as possible albums as they like
        let playables;
        let earned;
        for (let i = 0; i < 60; i++) {
          await musicStore.connect(user2).play(1);     
        }  
        // Test to confirm the amount earned function
        earned = await musicStore.users(user1.address)
        // console.log("Amount earned by User 1 after his Playlist was streamed 99 times", fromWei( earned.amountEarned));
        
        playables = await musicStore.users(user2.address);
        // console.log(playables.playablePlaylists);
        // console.log(playables.isSubscribed);
        
        await musicStore.connect(user2).play(1); 
        // console.log(playables.isSubscribed);
        
        // Test to confirm the amount earned function
        earned = await musicStore.users(user1.address)
        // console.log("Amount earned by User 1 after his Playlist was streamed 100 times", fromWei(earned.amountEarned));
        
        // Test for withdraw function
        await musicStore.connect(user1).withdraw(toWei(4));
        
        earned = await musicStore.users(user1.address)
        // console.log("Amount earned by User 1 after he withdrew 4.0 eth", fromWei(earned.amountEarned));
        await expect(musicStore.connect(user1).withdraw(toWei(5))).revertedWith("Insuficient Balance");
        
        // Test for ability to like an Playlist
        await musicStore.connect(user2).likePlaylist(1);
        const userTwoLikes = await musicStore.users(user2.address);
        console.log(userTwoLikes, "User 2 likes");
        // await expect( musicStore.connect(user2).likePlaylist(1)).revertedWith("Playlist Has been liked already");
      });
    });
  });
  

// Test for array of liked albums
// Test for ratings of a particular Playlist
// Test for songs in Playlist/rating count
// Test for ability to rate a Playlist
