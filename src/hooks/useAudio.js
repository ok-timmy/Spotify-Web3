import useIPFS from "./useIPFS";
import { useState, useEffect, useRef } from "react";

const useAudio = (fullAlbum) => {
  const { resolveLink } = useIPFS();
  // const [audio, setAudio] = useState(nftAlbum);
  const [trackIndex, setTrackIndex] = useState(0);
  const [newSong, setNewSong] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const fullAlbumArray = JSON.parse(fullAlbum);

  // console.log(fullAlbumArray[trackIndex])

  const AudioRef = useRef(
    // new Audio(resolveLink(JSON.parse(audio[trackIndex].metadata).animation_url))
    new Audio(fullAlbumArray[trackIndex].fileLink)
  );

  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = AudioRef.current;

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(fullAlbumArray.length - 1);
      AudioRef.current.load();
      AudioRef.current = new Audio(
        fullAlbumArray[fullAlbumArray.length - 1].fileLink
      );
    } else {
      setTrackIndex(trackIndex - 1);
      AudioRef.current.load();
      AudioRef.current = new Audio(
        fullAlbumArray[trackIndex - 1].fileLink
      );
    }
  };
  const toNextTrack = () => {
    if (trackIndex < fullAlbumArray.length - 1) {
      setTrackIndex(trackIndex + 1);
      AudioRef.current.load();
      AudioRef.current = new Audio(
        fullAlbumArray[trackIndex + 1].fileLink
      );
    } else {
      AudioRef.current.load();
      AudioRef.current = new Audio(fullAlbumArray[0].fileLink);
      setTrackIndex(0);
    }
  };

  const toggle = () => setIsPlaying(!isPlaying);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (AudioRef.current.ended) {
        // toNextTrack();
      } else {
        setTrackProgress(Math.round(AudioRef.current.currentTime));
      }
    }, 1000);
  };

  useEffect(() => {
    if (isPlaying) {
      AudioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      AudioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      AudioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    // AudioRef.current.pause();
    // AudioRef.current = new Audio(
    //   resolveLink(JSON.parse(audio[trackIndex].metadata).animation_url)
    // );
    AudioRef.current.volume = volume;
    setTrackProgress(Math.round(AudioRef.current.currentTime));
    if (isReady.current) {
      AudioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [trackIndex]);

  const onSearch = (value) => {
    // console.log(intervalRef.current);
    clearInterval(intervalRef.current);
    // console.log(value);
    intervalRef.current = value;
    AudioRef.current.currentTime = value;
    setTrackProgress(AudioRef.current.currentTime);
    // console.log(intervalRef.current)
  };

  const onSearchEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const onVolume = (vol) => {
    setVolume(vol);
    AudioRef.current.volume = vol;
  };

  return [
    isPlaying,
    duration,
    toggle,
    trackProgress,
    trackIndex,
    onSearch,
    onSearchEnd,
    onVolume,
    toNextTrack,
    toPrevTrack,
  ];
};

export default useAudio;
