import React from "react";

const Earnings = () => {
  return (
    <div className="">
      <div className="flex flex-col px-4 py-4">
        <div className="bg-black rounded-2xl shadow-lg w-auto text-white px-8 py-4">
          {" "}
          <p className="text-3xl">Hello Fren,</p>{" "}
          <p className="text-2xl">0xcF9Ab7DBED8d5D104167012C91a4Fb0b7504cd2B</p>{" "}
        </div>
        <div className="bg-black flex justify-between rounded-2xl shadow-lg w-auto text-white px-8 py-4 my-4">
          {" "}
          <p className="text-3xl">Amount Earned</p>{" "}
          <p className="text-2xl">$45.0</p>{" "}
        </div>
        <div className="grid grid-cols-2 space-x-8 my-2">
          <div className="bg-black rounded-lg shadow-xl w-auto text-white text-center py-4 px-4">
            <div className="text-2xl mb-6">Subscription Active</div>
            <div className="text-green-600 text-2xl">True</div>
          </div>
          <div className="bg-black rounded-lg shadow-xl w-auto text-white text-center py-4 px-4">
            <div className="text-2xl mb-6">No Of Playable Albums Left</div>
            <div className="text-green-600 text-2xl">300</div>
          </div>
        </div>
        <div className="grid grid-cols-2 space-x-8 my-2">
        <div className="bg-black rounded-lg shadow-xl w-auto text-white text-center py-4 px-4">
            <div className="text-2xl mb-6">Total Streams</div>
            <div className="text-green-600 text-2xl">10.0k</div>
          </div>
          <div className="bg-black rounded-lg shadow-xl w-auto text-white text-center py-4 px-4">
            <div className="text-2xl mb-6">No Of Uploaded Works</div>
            <div className="text-2xl">2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
