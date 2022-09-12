import React from "react";

const GenreCard = ({ category, color }) => {

  return (
    <div className={`w-56 h-56 flex flex-col justify-between rounded-lg cursor-pointer`} style={{background: `${color}`}}>
      <div className="flex justify-start px-4 py-4 text-white text-xl font-bold">{category}</div>
    </div>
  );
};

export default GenreCard;


// 1. Still Needs to fix the color issue
// 2. Still need to work on images to for the searchCard Component