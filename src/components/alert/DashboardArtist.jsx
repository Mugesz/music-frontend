import React, { useEffect } from "react";
import { useStateValue } from "../../Context/StateProvider";
import { getAllArtist } from "../../api";
import { actionType } from "../../Context/reducer";
import Artistcontainer from "./Artistcontainer";

const DashboardArtist = () => {
  const [{ allArtist }, dispatch] = useStateValue();
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        if (!allArtist) {
          const data = await getAllArtist();
          dispatch({
            type: actionType.SET_ALL_ARTIST,
            allArtist: data.data,
          });
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    console.log(allArtist);

    fetchArtist();
  }, []);
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
        <Artistcontainer data={allArtist} type="artist" />
      </div>
    </div>
  );
};

export default DashboardArtist;
