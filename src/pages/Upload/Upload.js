import React, { useContext, useState } from "react";
import Track from "../../components/FormComponent/Track";
import { Buffer } from 'buffer';
import { SpotifyContext } from "../../Context/SpotifyContext";
import { create} from "ipfs-http-client";
 require("dotenv").config();

const projectId = process.env.PROJECT_ID;   // <---------- your Infura Project ID

const projectSecret = process.env.PROJECT_KEY;  // <---------- your Infura Secret

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

const Upload = () => {
  const {file, ipfsHash, setIpfsHash} = useContext(SpotifyContext)
  const [tracks, setTracks] = useState([{ id: 0, track: <Track num={0} /> }]);

  const handleAddMore = () => {
    if (tracks.length < 20) {
      setTracks((prev) => [
        ...tracks,
        { id: prev.length, track: <Track num={prev.length} /> },
      ]);
    } else {
      alert("You Can't have more than 20 tracks on an album/Playlist");
      console.log(tracks);
    }
  };

  const submitPlaylist = async() => {
    console.log(file)
    try {
  
   client.add({content: file}).then((res)=> {
      const url = `https://infura-ipfs.io/ipfs/${res.path}`;
    console.log(url);
   })

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="py-8 px-16 text-white">
      <div className="text-4xl font-semibold mb-8 text-center">Create Playlist </div>

<form>
      <div className="w-full max-w-2xl">

        {/* Album Author */}

        <div className="md:flex md:items-center md:max-w-full mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Author's Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white "
              type="text"
              value="Jane Doe"
            />
          </div>
        </div>

        {/* Album Title */}

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="Album-Title"
            >
              Playlist Title
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
              type="text"
            />
          </div>
        </div>


        {/* Genre */}
        
        <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
        <label htmlFor="underline_select" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          Genre
        </label>
        </div>
        <div className="md:w-2/3">
        <select
          id="underline_select"
          defaultValue={"Select a Genre"}
          onChange={console.log("Changed")}
          className="block py-2.5 px-2 w-full text-sm text-gray-400 bg-gray-600 border-0 border-b-2 border-gray-900 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option>Select a Genre</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
        </div>
        </div>

        {/* Album Cover Image */}

    <div className="flex justify-start md:items-center md:max-w-full mb-3">
      <div className="md:w-1/3">
        <label
          className="block mb-2 pb-6 text-sm text-gray-500 font-bold md:text-right md:mb-0 pr-4"
          htmlFor="file_input"
        >
          Album Cover 
        </label>
      </div>

      <div className="md:w-2/3 flex flex-col">
        <input
          className="block w-full appearance-none file:px-2 file:py-2 file:mr-2 file:cursor-pointer text-sm rounded-lg border cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
        />
        <div
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </div>
      </div>
    </div>



        {/* Release Date of Album or Playlist */}

        <div className="text-center">Upload Tracks</div>
        {tracks.map(({ id, track }) => {
          return <div key={id}>{track}</div>;
        })}

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3 flex justify-end mt-3">
            <button
              className="shadow bg-gray-700 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleAddMore}
            >
              Add More Tracks
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3 flex justify-end mt-3">
            <button
              className="shadow bg-gray-700 hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={submitPlaylist}
            >
              Upload Playlist
            </button>
          </div>
        </div>
        </div>
      </form>
    </div>
  );
};

export default Upload;
