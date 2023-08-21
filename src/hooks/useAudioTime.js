const useAudioTime = (fullAlbum) => {
  const fullAlbumArray = JSON.parse(fullAlbum);

  const handleArray = (list) => {
    const listArray = list.map((audio, index) => {
      const audiodata = new Audio(fullAlbumArray[index].fileLink);
      return audiodata;
    });
    console.log(listArray);
    return listArray;
  };
  const timesArray = handleArray(fullAlbumArray);

  return { timesArray };
};

export default useAudioTime;
