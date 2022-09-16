// SPDX-License-Identifier: MIT

pragma solidity >0.7.0 <=0.9.0;

import "./IERC20.sol";

contract MusicStore {
    address owner;
    uint albumCount;
    uint playCost = 0;
    uint uploadCost = 0;
    IERC20 token;

    // constructor(address _owner) {
    //     // owner = 0xcF9Ab7DBED8d5D104167012C91a4Fb0b7504cd2B;
    //     owner = _owner;
    // }

    mapping(address => User) public users;
    mapping(uint => Collection) public albums;
    mapping (uint=> uint[]) public ratings;
    Collection [] public albumsList;

    struct Collection {
        address author;
        uint id;
        string title;
        string name;
        string category;
        string genre;
        string[] tracks;
        string coverImage;
        uint releaseDate;
        uint ratings;
        uint noOfStreams;
    }

    struct User {
        bool isSubscribed;
        uint playableAlbums;
        // string[] playedAlbums;
        Collection [] uploadedAlbums;
        uint[] likedAlbums;
        uint[] ratedAlbums;
        uint amountEarned;
    }

    event Subscribed(address subscriber, uint price, uint plan);
    event Uploaded(
        address author,
        string title,
        string name,
        string category,
        string genre,
        string[] tracks,
        string coverImage,
        uint releaseDate
    );
    event Played(
        uint id,
        address Author,
        string albumTitle,
        string category,
        uint releaseDate,
        uint noOfStreams
    );

    event Withdrawn(uint amount, address user, uint balance);

    function subscribe(
        uint plan,
        address _user,
        // IERC20 _token,
        uint price
    ) public returns(bool success) {
        User storage user = users[_user];
        // _token.transferFrom(msg.sender, address(this), price);
        if (plan == 1) {
            user.playableAlbums += 50;
            // _token.transferFrom(address(this), owner, price / 11);
        user.isSubscribed = true;

        emit Subscribed(_user, price, plan);
        return true;
        }
        if (plan == 2) {
            user.playableAlbums += 100;
            // _token.transferFrom(address(this), owner, price / 11);
            user.isSubscribed = true;
    
            emit Subscribed(_user, price, plan);
            return true;
        }
        if (plan == 3) {
            user.playableAlbums += 200;
            // _token.transferFrom(address(this), owner, price / 11);
            user.isSubscribed = true;
    
            emit Subscribed(_user, price, plan);
            return true;
        }
        
    }

    function play(uint _id) public returns (bool success) {
        require(
            users[msg.sender].playableAlbums > 0,
            "You Do Not have an active subscription to play album, Please Subscribe"
        );
        albums[_id].noOfStreams += 1;
        users[albums[_id].author].amountEarned += 100000000000000000;
        emit Played(
            _id,
            albums[_id].author,
            albums[_id].title,
            albums[_id].category,
            albums[_id].releaseDate,
            albums[_id].noOfStreams
        );
        users[msg.sender].playableAlbums -= 1;
        if (users[msg.sender].playableAlbums == 0) {
            users[msg.sender].isSubscribed = false;
        }
        return true;
    }

    function uploadAlbum(
        // address _author,
        string memory _title,
        string memory _name,
        string memory _category,
        string memory _genre,
        string[] memory _tracks,
        string memory _coverImage,
        uint _releaseDate
    ) public payable {
        albumCount++;
        Collection memory newCollection = Collection(
            msg.sender,
            albumCount,
            _title,
            _name,
            _category,
            _genre,
            _tracks,
            _coverImage,
            _releaseDate,
            0,
            0
        );
        albums[albumCount] = newCollection;
        albumsList.push(newCollection);
        users[msg.sender].uploadedAlbums.push(newCollection);

        emit Uploaded(
            msg.sender,
            _title,
            _name,
            _category,
            _genre,
            _tracks,
            _coverImage,
            _releaseDate
        );
    }

    function withdraw(
        // IERC20 _token,
        uint _amount
    ) public payable {
        require(
            users[msg.sender].amountEarned > 0,
            "You Do not have enough balance to withdraw from"
        );
        require(users[msg.sender].amountEarned> _amount, "Insuficient Balance");
        // _token.transferFrom(address(this), _user, _amount);
        users[msg.sender].amountEarned -= _amount;
        emit Withdrawn(_amount, msg.sender, users[msg.sender].amountEarned);
    }

    function getAllAlbums() public view returns ( Collection[] memory) {
        return albumsList;
    }

    function getUserUploads(address _user)public view returns (Collection []memory) {
        return users[_user].uploadedAlbums;
    }

    function getUserDetails(address _user) public view returns (User memory) {
        return users[_user];
    }

    function rateAlbum(uint _albumId, address _user, uint _rating) public {
        User storage user = users[_user];
        Collection storage collection = albums[_albumId];

        for (uint i = 0; i < user.ratedAlbums.length; i++) {
            if (user.ratedAlbums[i] == albums[_albumId].id) {
                revert("Album Has been Rated already");
            }
            else {
                user.ratedAlbums.push(_albumId);
                ratings[_albumId].push(_rating);
                uint sum = 0;
                for (uint j = 0; j < ratings[_albumId].length; j++) {
                    sum += ratings[_albumId][j];
                }
                collection.ratings  = sum / ratings[_albumId].length;    
            }
        }
    }


    function likeAlbum(uint _albumId) public {
        User storage user = users[msg.sender];

        for (uint i = 0; i < user.likedAlbums.length; i++) {
            if (user.likedAlbums[i] == albums[_albumId].id) {
                revert("Album Has been liked already");
            }
            user.likedAlbums.push(_albumId);
        }
    }

    function isLiked(address _user, uint _albumId)
        public
        view
        returns (bool liked) {
        // Collection storage collection = albums[_albumId];
        User storage user = users[_user];

        for (uint i = 0; i < user.likedAlbums.length; i++) {
            if (user.likedAlbums[i] == albums[_albumId].id) {
                return true;
            }
        }

        return false;
    }

    //1. Create mapping that connects a user to a struct (which contains a bool for subscribed, a uint for the number of album streams they get, an array of the albums they have played)
    //2. Subscribe function: Users can subscribe to a particular plan,
    // then get a particular number of album stream limits,
    // the function then sends a particular amount, depending on their subscription to the contract

    // 3. A play Album function which plays a particular album,
    // but first checks if the person playing the song has a number of album stream list left,
    // if the person has a stream list left, the function transfers, 10% of the subscriber's subscription amount to the creator of the playlist

    // 4. Create an upload playlist function that uploads an array of songs Max of 50 to IPFS and
    // then links the IPFS link to the contract which can be called on the frontend. The uplaod function should deduct a certain fee which will be sent
    //   to my wallet
    //5. - Uploading playlist should be in this format
    // - {
    //     title, name, Category(Album/Playlist), genre(hip-hop, gospel, R&B, Jazz, Rap, Soul, Country Music, Electronic, Blues, Afro, Mixed ), Songs(- Should be an array
    //     - Should only accept .mp3, .aac), Album/Playlist cover image, Author of playlist/ Album, Release date, Rating, number of Plays,
    // - }

    //6. Create 2 functions that adds/remove an album to an account's favorite
}
