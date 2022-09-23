import React from "react";
import { Routes, Route,} from "react-router-dom";
import Home from "./pages/Home/Home";
import "./App.css";
import { Layout } from "antd";
import Header from "./components/Header/Header";
import Favourites from "./pages/Favourites/Favorites";
import Upload from "./pages/Upload/Upload";
import Published from "./pages/Published/Published";
import Search from "./pages/Search/Search"
import SideNav from "./components/SideNav/SideNav";
import Earnings from "./pages/Earnings/Earnings";
import Library from "./pages/Library/Library"
import Album from "./pages/Album/Album"
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";

const { Footer, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Layout style={{ display: "flex" }}>
        {/* <Router></Router> */}
        <SideNav/>
        <Content className="contentWindow">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="upload" element={<Upload />} />
            <Route path="published" element={<Published />} />
            <Route path="search" element={<Search/>}/>
            <Route path="earnings" element={<Earnings/>}/>
            <Route path="library" element={<Library/>}/>
            <Route path={`albums/:id`} element={<Album/>}/>
          </Routes>
        </Content>
      </Layout>
      <Footer className="footer">
        {<AudioPlayer  />}
      </Footer>
    </Layout>
  );
};

export default App;
