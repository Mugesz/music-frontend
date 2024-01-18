import React, { useEffect } from "react";
import { useStateValue } from "../../Context/StateProvider";

import { actionType } from "../../Context/reducer";
import { getAllAlbums } from "../../api";
import AlbumContainer from "./AlbumContainer";

const DashBoardAlbums = () => {
  const [{ allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
    const fetchAlbumns = async () => {
      try {
        if (!allAlbums) {
          const data = await getAllAlbums();
          dispatch({
            type: actionType.SET_ALL_ALBUMNS,
            allAlbums: data.data,
          });
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
console.log(allAlbums)
    fetchAlbumns();
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
        <AlbumContainer data={allAlbums} type="album" />
      </div>
    </div>
  );
};

export default DashBoardAlbums;
