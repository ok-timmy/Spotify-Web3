// SPDX-License-Identifier: MIT

pragma solidity >0.7.0 <=0.9.0;

import "./IERC20.sol";

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MusicStore {
    address owner;
    uint playlistCount;
    uint playCost = 0;
    uint uploadCost = 0;
    IERC20 token;

    constructor() {
        owner = 0xcF9Ab7DBED8d5D104167012C91a4Fb0b7504cd2B;
        // token = IERC20(_token);
        // token = IERC20(0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e);
        // owner = _owner;
    }

    mapping(address => User) public users;
    mapping(uint => Collection) public playlists;
    mapping(uint => uint[]) public ratings;
    Collection[] public playlistsArray;

    struct Collection {
        address author;
        uint id;
        bytes32 title;
        string description;
        bytes32 genre;
        string[] tracks;
        string coverImage;
        uint releaseDate;
        uint ratings;
        uint noOfStreams;
    }

    struct User {
        bool isSubscribed;
        uint playablePlaylists;
        string[] playedPlaylists;
        Collection[] uploadedPlaylists;
        uint[] likedPlaylists;
        uint[] ratedPlaylists;
        uint amountEarned;
    }

    event Subscribed(address subscriber, uint price, uint plan);
    event Uploaded(
        address author,
        bytes32 title,
        string description,
        bytes32 genre,
        string[] tracks,
        string coverImage,
        uint releaseDate
    );
    event Played(
        uint id,
        address Author,
        bytes32 playlistTitle,
        uint releaseDate,
        uint noOfStreams
    );

    event Withdrawn(uint amount, address user, uint balance);

    function subscribe(
        uint plan,
        address payable _user,
        // IERC20 _token,
        uint price
    ) public payable returns (bool success) {
        require(_user == msg.sender);
        User storage user = users[_user];
        if (plan == 1) {
            // require(token.allowance(msg.sender, address(this)) > 0);
            // price = token.allowance(msg.sender, address(this));
            // require(token.transferFrom(msg.sender, address(this), price));
            // _user.transfer(price);

            payable(address(this)).transfer((price / 11));
            user.playablePlaylists += 100;
            user.isSubscribed = true;

            emit Subscribed(_user, price, plan);
            return true;
        }
        if (plan == 2) {
            // require(token.allowance(msg.sender, address(this)) > 0);
            // price = token.allowance(msg.sender, address(this));
            // require(token.transferFrom(msg.sender, address(this), price));
            // _user.transfer(price);

            payable(address(this)).transfer((price / 11));
            user.playablePlaylists += 200;
            user.isSubscribed = true;

            emit Subscribed(_user, price, plan);
            return true;
        }
        if (plan == 3) {
            // require(token.allowance(msg.sender, address(this)) > 0);
            // price = token.allowance(msg.sender, address(this));
            // require(token.transferFrom(msg.sender, address(this), price));
            // _user.transfer(price);
            payable(address(this)).transfer((price / 11));
            // token.transferFrom( _user, address(this), (price / 11));
            user.playablePlaylists += 300;
            user.isSubscribed = true;

            emit Subscribed(_user, price, plan);
            return true;
        }
    }

    function play(uint _id) public returns (bool success) {
        require(
            users[msg.sender].playablePlaylists > 0,
            "You Do Not have an active subscription to play album, Please Subscribe"
        );
        playlists[_id].noOfStreams += 1;
        users[playlists[_id].author].amountEarned += 1000000000000000; //15 zeros
        emit Played(
            _id,
            playlists[_id].author,
            playlists[_id].title,
            playlists[_id].releaseDate,
            playlists[_id].noOfStreams
        );
        users[msg.sender].playablePlaylists -= 1;
        if (users[msg.sender].playablePlaylists == 0) {
            users[msg.sender].isSubscribed = false;
        }
        return true;
    }

    function uploadPlaylist(
        bytes32 _title,
        string memory _description,
        bytes32 _genre,
        string[] memory _tracks,
        string memory _coverImage,
        uint _releaseDate
    ) public payable returns(bool success) {
        playlistCount++;
        Collection memory newCollection = Collection(
            msg.sender,
            playlistCount,
            _title,
            _description,
            _genre,
            _tracks,
            _coverImage,
            _releaseDate,
            0,
            0
        );
        playlists[playlistCount] = newCollection;
        playlistsArray.push(newCollection);
        users[msg.sender].uploadedPlaylists.push(newCollection);

        emit Uploaded(
            msg.sender,
            _title,
            _description,
            _genre,
            _tracks,
            _coverImage,
            _releaseDate
        );
        return true;
    }

    function withdraw(uint _amount) public payable {
        require(
            users[msg.sender].amountEarned > 0,
            "You Do not have enough balance to withdraw from"
        );
        require(
            users[msg.sender].amountEarned > _amount,
            "Insuficient Balance"
        );
        token.transferFrom(address(this), msg.sender, _amount);
        users[msg.sender].amountEarned -= _amount;
        emit Withdrawn(_amount, msg.sender, users[msg.sender].amountEarned);
    }

    function getAllPlaylists() public view returns (Collection[] memory) {
        return playlistsArray;
    }

    function getUserUploads(address _user)
        public
        view
        returns (Collection[] memory)
    {
        return users[_user].uploadedPlaylists;
    }

    function getUserDetails(address _user) public view returns (User memory) {
        return users[_user];
    }

    function rateAlbum(
        uint _playlistId,
        address _user,
        uint _rating
    ) public {
        User storage user = users[_user];
        Collection storage collection = playlists[_playlistId];

        for (uint i = 0; i < user.ratedPlaylists.length; ) {
            if (user.ratedPlaylists[i] == playlists[_playlistId].id) {
                revert("Album Has been Rated already");
            } else {
                user.ratedPlaylists.push(_playlistId);
                ratings[_playlistId].push(_rating);
                uint sum = 0;
                for (uint j = 0; j < ratings[_playlistId].length; j++) {
                    sum += ratings[_playlistId][j];
                }
                collection.ratings = sum / ratings[_playlistId].length;
            }
            unchecked {
                ++i;
            }
        }
    }

    function likePlaylist(uint _playlistId) public {
        User storage user = users[msg.sender];

        for (uint i = 0; i < user.likedPlaylists.length; ) {
            if (user.likedPlaylists[i] == playlists[_playlistId].id) {
                revert("Album Has been liked already");
            }
            unchecked {
                ++i;
            }
            user.likedPlaylists.push(_playlistId);
        }
    }

    function isLiked(address _user, uint _playlistId)
        public
        view
        returns (bool liked)
    {
        // Collection storage collection = playlists[_playlistId];
        User storage user = users[_user];

        for (uint i = 0; i < user.likedPlaylists.length; ) {
            if (user.likedPlaylists[i] == playlists[_playlistId].id) {
                return true;
            }
            unchecked {
                ++i;
            }
        }

        return false;
    }


       // Function to receive Ether. msg.data must be empty
       receive() external payable {}

       // Fallback function is called when msg.data is not empty
       fallback() external payable {}



    // URGENT TODOS
    /*
1. No of streams is not updating when play button is clicked.
2. Optimize your code to use less gas
3. Find a way to do the tokens that will be used to make payment to the dapp

*/

    //1. Create mapping that connects a user to a struct (which contains a bool for subscribed, a uint for the number of album streams they get, an array of the playlists they have played)
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
    //     title, description, Category(Album/Playlist), genre(hip-hop, gospel, R&B, Jazz, Rap, Soul, Country Music, Electronic, Blues, Afro, Mixed ), Songs(- Should be an array
    //     - Should only accept .mp3, .aac), Album/Playlist cover image, Author of playlist/ Album, Release date, Rating, number of Plays,
    // - }

    //6. Create 2 functions that adds/remove an album to an account's favorite
}
