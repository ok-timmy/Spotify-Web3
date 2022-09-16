import { PlayCircleFilled } from "@ant-design/icons";
import React, { useState } from "react";

const AlbumCard = () => {
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(!hover);
    // console.log(hover)
  }

  return (
    <div
      className=" py-4 px-4 flex flex-col h-72 w-56 rounded-md border border-white cursor-pointer bg-[] hover:bg-[#282828] hover:shadow-2xl"
      onMouseEnter={ handleHover}
      onMouseLeave={handleHover}
    >
      <div className="relative w-48 h-52">
        <img
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBjb3ZlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
          alt="Sample"
          style={{ height: "100%", width: "100%" }}
          className="rounded-lg shadow-lg"
        />
      {hover === true && (
        <div className="absolute bottom-2 right-2 text-white text-5xl z-50 hover:scale-110 hover:cursor-default"><PlayCircleFilled style={{color:"#1FDF64"}}/></div>
      )}
      </div>
      <div className="text-white text-lg font-bold pt-2">Today's Top Hit</div>
      <div className="text-gray-200 pt-1 mb-3">
        Harry Styles is on top of the top 50
      </div>
    </div>
  );
};

export default AlbumCard;
