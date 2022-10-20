import { DeleteOutlined } from "@ant-design/icons";
import React from "react";

const Track = ({ tArray, id, setTArray, removeTrack }) => {
  // console.log(tArray);

  const num = tArray.findIndex((object) => {
    return object.id === id;
  });

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const res = Buffer(reader.result);

      setTArray((prev) =>
        prev.map((obj) => {
          if (obj.id === id) {
            if (e.target.name === "trackFile") {
              return { ...obj, trackFile: res };
            } else {
              return { ...obj, trackCover: res };
            }
          }
          return obj;
        })
      );
    };
  };

  // console.log(num);

  return (
    <div className="flex flex-col border-b border-white relative pt-6">
      <div className="absolute left-0 top-24">
        <DeleteOutlined
          className="hover:scale-110 text-3xl"
          style={{color: "rgb(220 38 38)"}}
          onClick={() => {
            removeTrack(id);
          }}
        />
      </div>
      <div className="text-xl">{num + 1}.</div>

      {/* Track Name */}

      <div className="md:flex md:items-center md:max-w-full mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-400 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            Track Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white "
            type="text"
            autoComplete="off"
            name="author"
            required={true}
            value={tArray.name}
            onChange={(e) => {
              setTArray((prev) =>  prev.map((obj) => {
                if (obj.id === id) {
                  return { ...obj, name: e.target.value }
                }
                return obj;
              }));
            }}
          />
        </div>
      </div>
      <div className="flex justify-start md:items-center md:max-w-full mb-3">
        <div className="md:w-1/3">
          <label
            className="block mb-2 pb-6 text-sm text-gray-400 font-bold md:text-right md:mb-0 pr-4"
            htmlFor="file_input"
          >
            Track {num + 1}
          </label>
        </div>

        <div className="md:w-2/3 flex flex-col">
          <input
            className="block w-full appearance-none file:px-2 file:py-2 file:mr-2 file:cursor-pointer text-sm rounded-lg border cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            name="trackFile"
            accept=".mp3, .ogg"
            required={true}
            onChange={(e) => handleChange(e)}
          />
          <div
            className="mt-1 text-sm text-gray-400 dark:text-gray-300"
            id="file_input_help"
          >
            MP3 and OGG .
          </div>
        </div>
      </div>

      <div className="flex justify-start md:items-center md:max-w-full mb-6">
        <div className="md:w-1/3">
          <label
            className="block mb-2 pb-6 text-sm text-gray-400 font-bold md:text-right md:mb-0 pr-4"
            htmlFor="file_input"
          >
            Track {num + 1} Image
          </label>
        </div>

        <div className="md:w-2/3 flex flex-col">
          <input
            className="block w-full appearance-none file:px-2 file:py-2 file:mr-2 file:cursor-pointer text-sm rounded-lg border cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            name=" trackCover"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => handleChange(e)}
          />
          <div
            className="mt-1 text-sm text-gray-400 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
