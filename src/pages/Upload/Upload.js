import React, { useContext, useState } from "react";
import Track from "../../components/FormComponent/Track";
import { Buffer } from "buffer";
import { SpotifyContext } from "../../Context/SpotifyContext";
import { create } from "ipfs-http-client";
import useIPFS from "../../hooks/useIPFS";
//  require("dotenv-webpack");

const projectId = "2EpAoml3QIi4f5tLxjsHGcHZwXr";
// process.env.PROJECT_ID;   // <---------- your Infura Project ID

const projectSecret = "c6965a474213af54da900e07fa8172f7";
// process.env.PROJECT_KEY;  // <---------- your Infura Secret

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const Upload = () => {
  const { playlistDetails, setPlaylistDetails, handleChange, trackDetails, setTrackDetails } =
    useContext(SpotifyContext);
  const [tracks, setTracks] = useState([{ id: 0, track: <Track num={0} /> }]);
  const [imageFile, setimageFile] = useState();
  const { resolveLink } = useIPFS();

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

  const captureFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const res = Buffer(reader.result);
      setimageFile(res);
      console.log(res);
    };
  };

  const submitPlaylist = async (e) => {
    e.preventDefault();
    console.log(playlistDetails);

    try {
      client.add({ content: imageFile }).then((res) => {
        const imageurl = `https://infura-ipfs.io/ipfs/${res.path}`;
        console.log(imageurl)
        const imgIPFSLink = resolveLink(imageurl);
        console.log(imgIPFSLink);
        setPlaylistDetails((prev) => ({
          ...prev,
          cover: imgIPFSLink,
        }));
      });

      console.log(playlistDetails);
    } catch (error) {
      console.log(error);
    }

    //   console.log(file)
    //   try {

    //  client.add({content: file}).then((res)=> {
    //     const url = `https://infura-ipfs.io/ipfs/${res.path}`;
    //   console.log(url);
    //  })

    //   } catch (error) {
    //     console.log(error)
    //   }
  };

  return (
    <div className="py-8 px-16 text-white">
      <div className="text-4xl font-semibold mb-8 text-center">
        Create Playlist{" "}
      </div>

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
                name="author"
                required={true}
                value={playlistDetails.author}
                onChange={(e) => {
                  handleChange(e);
                }}
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
                name="title"
                required={true}
                value={playlistDetails.title}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>

          {/* Genre */}

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                htmlFor="underline_select"
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              >
                Genre
              </label>
            </div>
            <div className="md:w-2/3">
              <select
                id="underline_select"
                name="genre"
                value={playlistDetails.genre}
                onChange={(e) => {
                  handleChange(e);
                }}
                className="block py-2.5 px-2 w-full text-sm text-gray-400 bg-gray-600 border-0 border-b-2 border-gray-900 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                <option value="general">General</option>
                <option value="hip-hop">Hip-Hop</option>
                <option value="gospel">Gospel</option>
                <option value="R&B">R&B</option>
                <option value="jazz">Jazz</option>
                <option value="rap">Rap</option>
                <option value="country-music">Country Music</option>
                <option value="electronic">Electronic</option>
                <option value="blues">Blues</option>
                <option value="afro">Afro</option>
                <option value="afro">Mixed</option>
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
                required={true}
                onChange={(e) => captureFile(e)}
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
                type="submit"
                onClick={(e) => submitPlaylist(e)}
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
