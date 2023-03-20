import { CloseOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { SpotifyContext } from "../../Context/SpotifyContext";

const Subscribe = () => {
  const { setOpenSubscribeDialog, userSubscribe } = useContext(SpotifyContext);

  return (
    <section className="absolute bg-gray-900 z-[10000] h-[70vh] w-[75vw] flex justify-center align-middle top-8 bottom-8 right-0 left-8 rounded-lg">
      <div className="container grid grid-cols-1 gap-8 px-12 pt-12 pb-16 mx-auto lg:grid-cols-3 relative">
        <button
          className="absolute right-6 top-2 text-white text-lg"
          onClick={() => setOpenSubscribeDialog(false)}
        >
          <CloseOutlined />
        </button>
        <div className="flex flex-col items-center justify-between max-w-lg mx-auto text-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#CD7F32] dark:text-white">
              Bronze Package
            </h2>
            <p className="text-2xl text-center text-white">Features</p>

            <ul className="text-gray-500 text-xl text-left list-disc">
              <li> 100 Playlist Streams</li>
              <li> 1 Matic</li>
            </ul>
          </div>

          <button onClick={()=>userSubscribe(1)} className="inline-flex items-center justify-center w-full px-5 py-2 mt-6 text-white bg-green-600 rounded-lg sm:w-auto hover:bg-green-800 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            Pay now
          </button>
        </div>

        <div className="flex flex-col items-center justify-between max-w-lg mx-auto text-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#C0C0C0] dark:text-white">
              Silver Package
            </h2>
            <p className="text-2xl text-center text-white">Features</p>

            <ul className="text-gray-500 text-xl text-left list-disc">
              <li> 100 Playlist Streams</li>
              <li> 1 Matic</li>
              <li> No ads</li>
            </ul>
          </div>

          <button onClick={()=>userSubscribe(2)} className="inline-flex items-center justify-center w-full px-5 py-2 mt-6 text-white bg-green-600 rounded-lg sm:w-auto hover:bg-green-800 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            Pay now
          </button>
        </div>

        <div className="flex flex-col justify-between items-center max-w-lg mx-auto text-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#FFD700] dark:text-white">
              Gold Package
            </h2>
            <p className="text-2xl text-center text-white">Features</p>

            <ul className="text-gray-500 text-xl text-left list-disc">
              <li> 100 Playlist Streams</li>
              <li> 1 Matic</li>
              <li> No ads</li>
              <li> No Multiple replays</li>
            </ul>
          </div>

          <button onClick={()=>userSubscribe(3)} className="inline-flex items-center justify-center w-full px-5 py-2 mt-6 text-white bg-green-600 rounded-lg sm:w-auto hover:bg-green-800 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            Pay now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
