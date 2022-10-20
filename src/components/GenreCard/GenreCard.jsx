import React from "react";
import { useNavigate } from "react-router-dom";

const GenreCard = ({ category, color, searchImage }) => {
  let navigate = useNavigate();

  return (
    <div className={`w-56 h-56 flex flex-col justify-between rounded-lg cursor-pointer relative`} style={{background: `${color}`}} onClick={() => navigate(`/library?category=${category}`)}>
      <div className="flex justify-start px-4 py-4 text-white text-xl font-bold">{category}</div>
      <div className="absolute bottom-3 right-3 w-[6rem] h-[6rem] rotate-[12deg]"> <img src={searchImage} alt={category} className="w-[6rem] h-[6rem]"/></div>
    </div>
  );
};

export default GenreCard;


// 1. Still Needs to fix the color issue
// 2. Still need to work on images to for the searchCard Component