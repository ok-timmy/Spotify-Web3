import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { SpotifyContext } from "../../Context/SpotifyContext";
import SearchInput from "../SearchInput/SearchInput";
// import useSceenSize from "../../hooks/useSceenSize";

const Header = () => {
  const {connectWallet, currentAccount} = useContext(SpotifyContext)
  const location = useLocation();
  // console.log(location.pathname);
  // const {width} = useSceenSize()
  console.log(currentAccount);

  return (
    <div className=" sticky bg-[#101010]  top-0 right-0 left-0 z-[100]">
      <div className="flex justify-between min-w-full pl-12 pr-8 md:py-3 py-4">
      <div className="lg:flex lg:justify-between lg:w-96 grid">
        <div className="flex justify-between w-12 py-3">
          <LeftOutlined
            color="white"
            style={{ fontSize: "1.5em", color: "white", cursor: "pointer" }}
          />
          <RightOutlined
            color="white"
            style={{ fontSize: "1.5em", color: "white" }}
          />
        </div>
        <div
          className={`${location.pathname === "/search" ? "block py-2" : "hidden"}`}
        >
          {<SearchInput />}
        </div>
        </div>
        <div className="flex justify-evenly w-auto">
           <div className="hidden lg:flex justify-between w-auto align-baseline py-3 px-3">
            <a
              href="abcd"
              className="text-gray-400 text-lg font-semibold hover:text-gray-50 hover:scale-110 px-3"
            >
              Premium
            </a>
            <a
              href="abcd"
              className="text-gray-400 text-lg font-semibold hover:text-gray-50 hover:scale-110 px-3"
            >
              Support
            </a>
            <a
              href="abcd"
              className="text-gray-400 text-lg font-semibold hover:text-gray-50 hover:scale-110 px-3"
            >
              Download
            </a>
          </div>
           <div className="hidden lg:flex align-middle py-3">
            <div className="h-8 border-l place-content-center border-gray-50 py-1 px-3"></div>
          </div>
          <div className=" w-auto md:align-middle ">
            <button className="text-black bg-[#F6F6F6] px-8 rounded-3xl py-3 font-semibold md:text-lg w-full" onClick={connectWallet}>
              {currentAccount? `${currentAccount.slice(0,5)}....${currentAccount.slice(36)}` :"Connect Wallet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
