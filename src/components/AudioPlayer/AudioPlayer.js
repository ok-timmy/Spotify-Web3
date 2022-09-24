import React from "react";
import "./AudioPlayer.css";
import {
  SoundOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  PlayCircleFilled,
  PauseCircleFilled,
} from "@ant-design/icons";
// import { useIPFS } from "../../hooks/useIPFS";
import useAudio from "../../hooks/useAudio";
import { Slider } from "antd";
import { SafetyCertificateFilled } from "@ant-design/icons";

function AudioPlayer() {
  const
 [
    isPlaying,
    duration,
    toggle,
    // toNextTrack,
    // toPrevTrack,
    trackProgress,
    trackIndex,
    onSearch,
    onSearchEnd,
    onVolume,
  ] = useAudio();
  const minSec = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(secs % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : seconds;

    return `${returnMin}: ${returnSec}`;
  };


  const onChange = (time) => {
    onSearch(time);
  }


  // const { resolveLink } = useIPFS();
  return (
    <>
      <div
        className="buttons"
        style={{ width: "300px", justifyContent: "start" }}
      >
        {/* <img
          src={resolveLink(JSON.parse(nftAlbum[trackIndex].metadata).image)}
          alt="currentCover"
          className="cover"
        /> */}
        <div>
          <div className="songTitle">
            {/* {JSON.parse(nftAlbum[trackIndex].metadata).name} */}
            Ase Ola - Sola Allyson
          </div>
          <div className="songAlbum">
            {/* {nftAlbum[trackIndex].name} */}
            Imisi
            </div>
        </div>
      </div>
      <div>
        <div className="buttons">
          <StepBackwardOutlined className="forback" 
          // onClick={toPrevTrack}
           />
          {
          isPlaying ?
           (
            <PauseCircleFilled className="pausePlay" 
            onClick={toggle} 
            />
          ) 
          : (
            <PlayCircleFilled className="pausePlay" onClick={toggle} />
          )
          }
          <StepForwardOutlined className="forback" 
          // onClick={toNextTrack} 
          />
        </div>
        <div className="buttons">
          {minSec(trackProgress)}
          <Slider
            value={trackProgress}
            step={1}
            min={0}
            max={Math.round(duration)}
            className="progress"
            tooltipVisible={false}
            onChange={onChange}
            onAfterChange={onSearchEnd}
          />
          {duration ? minSec(Math.round(duration)) : "00:00"}
        </div>
      </div>
      <div className="soundDiv">
        <SoundOutlined />
        <Slider
          className="volume"
          defaultValue={100}
          tooltipVisible={false}
          onChange={(value) => onVolume(value/100)}
        />
      </div>
    </>
  );
}

export default AudioPlayer;
