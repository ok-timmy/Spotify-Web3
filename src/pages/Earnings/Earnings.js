import { SketchOutlined } from "@ant-design/icons";
import React, { useContext, useEffect } from "react";
import { SpotifyContext } from "../../Context/SpotifyContext";
import { fromWei } from "../../Utils/convert";
import { useNavigate } from "react-router-dom";

const Earnings = () => {
  const { currentAccount,  userDetails, isLoading } = useContext(SpotifyContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!currentAccount){
       return navigate("/");
    }
 },[]);

  if (isLoading) {
    return <div>Loading......</div>;
  }

  return (
    <div className="">
      <div className="flex flex-col px-4 py-4">
        <div className="bg-black rounded-2xl shadow-lg w-auto text-white px-8 py-4">
          {" "}
          <p className="text-3xl">Hello Fren,</p>{" "}
          <p className="text-2xl">{currentAccount}</p>{" "}
        </div>
        <div className="bg-black flex justify-between rounded-2xl shadow-lg w-auto text-white px-8 py-4 my-4">
          {" "}
          <p className="text-3xl">Amount Earned</p>{" "}
          <div className="flex align-baseline">
            <SketchOutlined
              style={{
                fontSize: "1.75rem",
                color: "#4169E1",
                marginRight: "0.4rem",
              }}
            />
            <span className="text-2xl">
              {userDetails.length !== 0 && fromWei(String(userDetails.amountEarned))}
            </span>{" "}
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
              {userDetails.length !== 0 && userDetails.isSubscribed ? "Yes" : "No"}
            </div>
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
