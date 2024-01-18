import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { AiOutlineClear } from "react-icons/ai";
import { useStateValue } from "../../Context/StateProvider";
import { getAllSongs } from "../../api";
import { actionType } from "../../Context/reducer";

import SongContainer from "./SongContainer";

const DashboardSong = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [{ allSongs }, dispatch] = useStateValue();

  const fetchSong = async () => {
    try {
      if (!allSongs) {
        const data = await getAllSongs();
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  useEffect(() => {
    fetchSong();
  }, []);

  const handleClick = ()=>{
    alert("this page is only for ADMIN")
  }

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-24">
        <NavLink
          className="flex items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer"
          onClick={handleClick}
        >
          <IoAdd />
        </NavLink>
        <input
          className={` w-52 px-4 py-2 border ${
            isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
          }rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
          type="text"
          placeholder="Search here"
          value={songFilter}
          onChange={(e) => setSongFilter(e.target.value)}
          onBlur={() => {
            setIsFocus(false);
          }}
          onFocus={() => {
            setIsFocus(true);
          }}
        />
        <AiOutlineClear className="text-3xl text-textColor cursor-pointer" />
      </div>

      <div className="relative w-full  my-4 p-4 py-12 border border-gray-300 rounded-md">
        <div className="absolute top-4 left-4">
          <p className="text-xl font-bold">
            <span className="text-sm font-semibold text-textColor">
              Count :{" "}
            </span>
            {allSongs?.length}
          </p>
        </div>
        <SongContainer data={allSongs} />
      </div>
    </div>
  );
};

export default DashboardSong;
