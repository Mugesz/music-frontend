import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllSongs } from "../../api";
import SongContainer from "./SongContainer";
import { useStateValue } from "../../Context/StateProvider";
import { actionType } from "../../Context/reducer";

const AlbumDetails = () => {
  const { albumId } = useParams();
  const [{ allSongs }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchSongsByAlbum = async () => {
      try {
        const data = await getAllSongs(albumId);
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      } catch (error) {
        console.error("Error fetching songs by album:", error);
      }
    };

    fetchSongsByAlbum();
  }, [albumId]);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md">
        <SongContainer data={allSongs} />
      </div>
    </div>
  );
};

export default AlbumDetails;
