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
      //   console.log(deployer.address, "Deployer");
      //   console.log(user1.address, "User 1");
      //   console.log(user2.address, "User 2");
      //   console.log(user3.address, "User 3");
      //   console.log(user4.address, "User 4");
    });

    // Test For Album/Playlist creation with User 1
    it("Test For Album/Playlist Creation with user 1", async () => {
      expect(
        await musicStore
          .connect(user1)
          .uploadAlbum(
            "First Album",
            "Sungba",
            "Album",
            "Hip-Hop",
            ["Track 1", "Track 2", "Track 3", "Track 4", "Track 5"],
            "Cover_Image.png",
            200000000
          )
      ).emit("Uploaded");

      const albumOne = await musicStore.albums(1);
      expect(albumOne.author).equal(user1.address);
      expect(albumOne.title).equal("First Album");
      expect(albumOne.name).equal("Sungba");
      expect(albumOne.category).equal("Album");
      expect(albumOne.genre).equal("Hip-Hop");
      expect(albumOne.ratings).equal(0);
    });
    // Test For Album/Playlist creation with User 2
    it("Test For Album/Playlist Creation with user 2", async () => {
      expect(
        await musicStore
          .connect(user2)
          .uploadAlbum(
            "First Playlist",
            "Sweet Songs",
            "Playlist",
            "Mood",
            ["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"],
            "Cover_Image.png",
            1000000000
          )
      ).emit("Uploaded");
    });
    // Test For Album/Playlist creation with User 3
    it("Test For Album/Playlist Creation with user 3", async () => {
      expect(
        await musicStore
          .connect(user3)
          .uploadAlbum(
            "My First Album",
            "Idupe",
            "Album",
            "Gospel",
            ["Ebe", "Iri", "Idupe", "Asise", "Mimo"],
            "Cover_Image.png",
            45000000000
          )
      ).emit("Uploaded");
    });
    // Test For Album/Playlist creation with User 1 again
    it("Test For Album/Playlist Creation with user 1 again", async () => {
      expect(
        await musicStore
          .connect(user1)
          .uploadAlbum(
            "Second Album",
            "Nzaza",
            "Album",
            "Jazz",
            ["Nzaza", "Sungba", "Adisa", "Bandana", "PBUY"],
            "Cover_Image.png",
            45000000000
          )
      ).emit("Uploaded");
    });

    it("Check for the number of albums/Playlist Uploaded", async () => {
      //Upload album 1
      await musicStore
        .connect(user1)
        .uploadAlbum(
          "First Album",
          "Sungba",
          "Album",
          "Hip-Hop",
          ["Track 1", "Track 2", "Track 3", "Track 4", "Track 5"],
          "Cover_Image.png",
          200000000
        );

      //Upload album 2
      await musicStore
        .connect(user2)
        .uploadAlbum(
          "First Playlist",
          "Sweet Songs",
          "Playlist",
          "Mood",
          ["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"],
          "Cover_Image.png",
          1000000000
        );

      //Upload Album 3
      await musicStore
        .connect(user3)
        .uploadAlbum(
          "My First Album",
          "Idupe",
          "Album",
          "Gospel",
          ["Ebe", "Iri", "Idupe", "Asise", "Mimo"],
          "Cover_Image.png",
          45000000000
        );

      //Upload Album 4
      await musicStore
        .connect(user1)
        .uploadAlbum(
          "Second Album",
          "Nzaza",
          "Album",
          "Jazz",
          ["Nzaza", "Sungba", "Adisa", "Bandana", "PBUY"],
          "Cover_Image.png",
          45000000000
        );

      // Test to fetch all Albums/Playlists
      const albums = await musicStore.getAllAlbums();
      expect(albums.length).equal(4);
    });

    // Test for Subscribe function for User 1
    it("Test For Subscribe Function for user 1", async () => {
      expect(await musicStore.connect(user1).subscribe(1, toWei(2)))
        .emit("Subscribed")
        .withArgs(user1, toWei(2), 1);

      const userOne = await musicStore.users(user1.address);
      expect(userOne.isSubscribed).equal(true);

      // Test to confirm the number of playable albums a person gets upon subscribing
      expect(userOne.playableAlbums).equal(50);

      it("Check if they can play a song");
    });
    // Test for Subscribe function for User 2
    it("Test For Subscribe Function for user 2", async () => {
      expect(await musicStore.connect(user2).subscribe(2, toWei(4)))
        .emit("Subscribed")
        .withArgs(user2, toWei(4), 2);

      const userTwo = await musicStore.users(user2.address);
      expect(userTwo.isSubscribed).equal(true);

      // Test to confirm the number of playable albums a person gets upon subscribing
      expect(userTwo.playableAlbums).equal(100);
    });
    // Test for Subscribe function for User 3
    it("Test For Subscribe Function for user 3", async () => {
      expect(await musicStore.connect(user3).subscribe(3, toWei(6)))
        .emit("Subscribed")
        .withArgs(user3, toWei(6), 3);

      const userThree = await musicStore.users(user3.address);
      expect(userThree.isSubscribed).equal(true);

      // Test to confirm the number of playable albums a person gets upon subscribing
      expect(userThree.playableAlbums).equal(200);
    });

    //Test to see if Users Can Play an Album
    it("Check if users have the authority to play an album", async () => {
      //Upload album 1
      await musicStore
        .connect(user1)
        .uploadAlbum(
          "First Album",
          "Sungba",
          "Album",
          "Hip-Hop",
          ["Track 1", "Track 2", "Track 3", "Track 4", "Track 5"],
          "Cover_Image.png",
          200000000
        );

      //Upload album 2
      await musicStore
        .connect(user2)
        .uploadAlbum(
          "First Playlist",
          "Sweet Songs",
          "Playlist",
          "Mood",
          ["Song 1", "Song 2", "Song 3", "Song 4", "Song 5"],
          "Cover_Image.png",
          1000000000
        );

      //Upload Album 3
      await musicStore
        .connect(user3)
        .uploadAlbum(
          "My First Album",
          "Idupe",
          "Album",
          "Gospel",
          ["Ebe", "Iri", "Idupe", "Asise", "Mimo"],
          "Cover_Image.png",
          45000000000
        );

      //Upload Album 4
      await musicStore
        .connect(user1)
        .uploadAlbum(
          "Second Album",
          "Nzaza",
          "Album",
          "Jazz",
          ["Nzaza", "Sungba", "Adisa", "Bandana", "PBUY"],
          "Cover_Image.png",
          45000000000
        );

          // Test for array of all published works
        const allAlbums = await musicStore.getAllAlbums();
        // console.log(allAlbums, "All albums published on the blockchain");

        //  Test for array of all published works by a user
        const worksByUserOne = await musicStore.getUserUploads(user1.address);
        // console.log("Works published by User 1", worksByUserOne);

        await musicStore.connect(user1).subscribe(1, toWei(2))
        await musicStore.connect(user2).subscribe(2, toWei(4));
        await musicStore.connect(user3).subscribe(3, toWei(6))

      
      //Test to see if the user can play as much as possible albums as they like
        let playables;
        let earned;
        for (let i = 0; i < 60; i++) {
          await musicStore.connect(user2).play(1);     
        }  
        // Test to confirm the amount earned function
        earned = await musicStore.users(user1.address)
        // console.log("Amount earned by User 1 after his album was streamed 99 times", fromWei( earned.amountEarned));
        
        playables = await musicStore.users(user2.address);
        // console.log(playables.playableAlbums);
        // console.log(playables.isSubscribed);
        
        await musicStore.connect(user2).play(1);     
        playables = await musicStore.users(user2.address);
        // console.log(playables.playableAlbums);
        // console.log(playables.isSubscribed);
        
        // Test to confirm the amount earned function
        earned = await musicStore.users(user1.address)
        // console.log("Amount earned by User 1 after his album was streamed 100 times", fromWei(earned.amountEarned));
        
        // Test for withdraw function
        await musicStore.connect(user1).withdraw(toWei(4));
        
        earned = await musicStore.users(user1.address)
        // console.log("Amount earned by User 1 after he withdrew 4.0 eth", fromWei(earned.amountEarned));
        await expect(musicStore.connect(user1).withdraw(toWei(5))).revertedWith("Insuficient Balance");
        
        // Test for ability to like an album
        await musicStore.connect(user2).likeAlbum(1);
        const userTwoLikes = await musicStore.users(user2.address);
        console.log(userTwoLikes, "User 2 likes");
        // await expect( musicStore.connect(user2).likeAlbum(1)).revertedWith("Album Has been liked already");
      });
    });
  });
  

// Test for array of liked albums
// Test for ratings of a particular album
// Test for songs in album/rating count
// Test for ability to rate an album
