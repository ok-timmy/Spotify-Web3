import React from 'react'
import { Layout } from "antd";
import Spotify from "../../images/Spotify.png";
import { SearchOutlined, HomeFilled, SketchOutlined, FolderOpenOutlined, FolderAddOutlined, HeartOutlined, FolderViewOutlined } from "@ant-design/icons";
import "./SideNav.css"
import {  Link, } from "react-router-dom";

const { Sider } = Layout;

const SideNav = () => {
  return (
    <Sider width={240} className="sideBar" style={{ height: "100vh" }}>
    <div className="logo__div">
      <img src={Spotify} alt="logo" className="logo" />{" "}
      <span className="logoName">Spotify</span>
    </div>

    <div className="h-96 flex flex-col justify-between">
      <div className="h-full flex flex-col justify-start">
        <div className="h-36 flex flex-col justify-evenly">
          <Link to="/">
            {" "}
            <div className="text-[0.9rem] text-white flex text-center font-thin">
              <HomeFilled style={{ fontSize: "1.1rem", color:"#B3B3B3" }} />{" "}
              <span className="ml-4 "> Home</span>
            </div>
          </Link>
          <Link to="/search">
            <div className="text-[0.9rem] text-white  flex text-center font-thin">
              <SearchOutlined style={{ fontSize: "1.1rem", color:"#B3B3B3"  }} />{" "}
              <span className="ml-4 "> Search</span>
            </div>
          </Link>

          <Link to={'/library'}>
          <div className="text-[0.9rem] text-white  flex text-center font-thin">
            <FolderOpenOutlined style={{ fontSize: "1.1rem", color:"#B3B3B3"  }} />{" "}
            <span className="ml-4 ">Your Library</span>
          </div>
          </Link>
          <Link to={'/earnings'}>
          <div className="text-[0.9rem] text-white  flex text-center font-thin">
            <SketchOutlined style={{ fontSize: "1.1rem", color:"#4169E1"  }} />{" "}
            <span className="ml-4 ">Earnings</span>
          </div>
          </Link>
        </div>

        <div className="mt-8 h-32 flex flex-col justify-evenly">
          <Link to={"/upload"}>
            {" "}
            <div className="text-[0.9rem] text-white  flex text-center font-thin">
              <FolderAddOutlined style={{ fontSize: "1.1rem", color:"#B3B3B3"  }} />{" "}
              <span className="ml-4 "> Publish Playlist</span>
            </div>
          </Link>
          <Link to={"/favourites"}>
            <div className="text-[0.9rem] text-white  flex text-center font-thin">
              <HeartOutlined style={{ fontSize: "1.1rem", color:"#B3B3B3"  }} />{" "}
              <span className="ml-4 "> Liked Album</span>
            </div>
          </Link>
          <Link to={"/published"}>
            <div className="text-[0.9rem] text-white  flex text-center font-thin">
              <FolderViewOutlined style={{ fontSize: "1.1rem", color:"#B3B3B3"  }} />{" "}
              <span className="ml-4 "> My Works</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex flex-col mt-24">
        <a className="text-xs text-gray-400">Cookies</a>
        <a className="text-xs text-gray-400">Privacy</a>
      </div>
    </div>
  </Sider>
  )
}

export default SideNav