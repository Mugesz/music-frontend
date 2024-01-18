// Update DashboardHome component
import React, { useEffect } from "react";
import { useStateValue } from "../../Context/StateProvider";

import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { actionType } from "../../Context/reducer";
import { bgColors } from "../../utils/styles";
import { getAllAlbums, getAllArtist, getAllSongs, getAllUsers } from "../../api";

export const DashboardCard = ({ icon, name, count }) => {
  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];

  return (
    <div
      style={{ background: `${bg_color}` }}
      className={`p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col items-center justify-center`}
    >
      {" "}
      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-sm text-textColor">{count}</p>
    </div>
  );
};

const DashboardHome = () => {
  const [{ allUsers, allSongs, allArtist, allAlbums }, dispatch] =
    useStateValue();
    console.log(allSongs)

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (!allUsers) {
            const userData = await getAllUsers();
            dispatch({
              type: actionType.SET_ALL_USERS,
              allUsers: userData?.data,
            });
            console.log("Users:", userData?.data);
          }
    
          if (!allSongs) {
            const songsData = await getAllSongs();
            dispatch({
              type:actionType.SET_ALL_SONGS,
              allSongs: songsData,
            });
            console.log("Songs:", songsData?.data);
          }
    
          if (!allArtist) {
            const artistData = await getAllArtist();
            dispatch({
              type: actionType.SET_ALL_ARTIST,
              allArtist: artistData?.data,
            });
            console.log("Artists:", artistData?.data);
          }
    
          if (!allAlbums) {
            const albumsData = await getAllAlbums();
            dispatch({
              type: actionType.SET_ALL_ALBUMNS,
              allAlbums: albumsData?.data,
            });
           
          }
        } catch (error) {
          console.error("Error fetching data:", error);
  
        }
      };
    
      fetchData();
    }, []);
    

  return (
    <div className="w-full p-6 flex items-center  justify-evenly flex-wrap">
      <DashboardCard
        icon={<FaUsers className="text-3xl text-textColor" />}
        name={"Users"}
        count={allUsers?.length > 0 ? allUsers?.length : 0}
      />
      <DashboardCard
        icon={<GiLoveSong className="text-3xl text-textColor" />}
        name={"Songs"}
        count={allSongs?.length > 0 ? allSongs?.length : 0}
      />
      <DashboardCard
        icon={<RiUserStarFill className="text-3xl text-textColor" />}
        name={"Artist"}
        count={allArtist?.length > 0 ? allArtist?.length : 0}
      />
      <DashboardCard
        icon={<GiMusicalNotes className="text-3xl text-textColor" />}
        name={"Album"}
        count={allAlbums?.length > 0 ? allAlbums?.length : 0}
      />
    </div>
  );
};

export default DashboardHome;