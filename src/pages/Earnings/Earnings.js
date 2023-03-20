import { SketchOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import { SpotifyContext } from "../../Context/SpotifyContext";
import { fromWei } from "../../Utils/convert";
import { useNavigate } from "react-router-dom";
import Subscribe from "../../components/Subscribe/Subscribe";

const Earnings = () => {
  const [amountToWithdraw, setAmountToWithdraw] = useState(0);

  const {
    currentAccount,
    userDetails,
    isLoading,
    openSubscribeDialog,
    setOpenSubscribeDialog,
    withdraw,
  } = useContext(SpotifyContext);
  let navigate = useNavigate();

  console.log(openSubscribeDialog);
  console.log(amountToWithdraw);

  useEffect(() => {
    if (!currentAccount) {
      return navigate("/");
    }
  }, []);

  if (isLoading) {
    return <div>Loading......</div>;
  }

  return (
    <div className="relative">
      {openSubscribeDialog && (
        <div className="fixed">
          <Subscribe />
        </div>
      )}
      <div className="flex flex-col px-4 py-4">
        <div className="bg-black rounded-2xl shadow-lg w-auto text-white px-8 py-4">
          {" "}
          <p className="text-3xl">Hello Fren,</p>{" "}
          <p className="text-2xl">{currentAccount}</p>{" "}
        </div>
        <div className="bg-black flex justify-between rounded-2xl shadow-lg w-auto text-white px-8 py-4 my-4">
          {" "}
          <div className="flex flex-col justify-between">
            <p className="text-3xl">Amount Earned</p>{" "}
           {(userDetails.length !== 0 && userDetails.amountEarned=== 0) && <div className="flex flex-col">
              <input
                type="text"
                onChange={(e) => setAmountToWithdraw(Number(e.target.value))}
                className="bg-transparent border-b-2 px-1 outline-none rounded-sm py-1 focus:border-b-1 focus:outline-1 focus:outline-gray-200"
              />
              <button
                onClick={() => withdraw(amountToWithdraw)}
                className="inline-flex items-center justify-center w-full px-5 py-2 mt-2 text-white bg-green-600 rounded-lg sm:w-auto hover:bg-green-800 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              >
                Withdraw
              </button>
            </div> }
          </div>
          <div className="flex flex-col justify-center">
            <div className=" flex align-baseline">
              <SketchOutlined
                style={{
                  fontSize: "2.25rem",
                  color: "#4169E1",
                  marginRight: "0.625rem",
                }}
              />
              <span className="text-4xl">
                {userDetails.length !== 0 &&
                  fromWei(String(userDetails.amountEarned))}
              </span>{" "}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 space-x-8 my-2">
          <div className="bg-black rounded-lg shadow-xl w-auto text-white text-center py-4 px-4">
            <div className="text-2xl mb-6">Subscription Active</div>
            <div
              className={`${
                userDetails.isSubscribed ? "text-green-600" : "text-red-500"
              } text-2xl`}
            >
              {userDetails.length !== 0 && userDetails.isSubscribed
                ? "Yes"
                : "No"}
            </div>
            {userDetails.length !== 0 && !userDetails.isSubscribed && (
              <button
                className="bg-green-600 mt-4 px-4 py-1 rounded-md text-lg hover:bg-green-900"
                onClick={() => setOpenSubscribeDialog(true)}
              >
                Subscribe
              </button>
            )}
          </div>
          <div className="bg-black rounded-lg shadow-xl w-auto text-white text-center py-4 px-4">
            <div className="text-2xl mb-6">No Of Playable Albums Left</div>
            <div className="text-white text-2xl">
              {userDetails.length !== 0 && userDetails.playablePlaylists}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 space-x-8 my-2">
          <div className="bg-black rounded-lg shadow-xl w-auto text-white text-center py-4 px-4">
            <div className="text-2xl mb-6">Total Streams</div>
            <div className="text-green-600 text-2xl">0</div>
          </div>
          <div className="bg-black rounded-lg shadow-xl w-auto text-white text-center py-4 px-4">
            <div className="text-2xl mb-6">No Of Uploaded Works</div>
            <div className="text-2xl">
              {userDetails.length !== 0 && userDetails.uploadedPlaylists.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
