import React, { useEffect } from "react";
import { getAllSongs } from "../../api";
import SongContainer from "./SongContainer";
import { useStateValue } from "../../Context/StateProvider";
import { actionType } from "../../Context/reducer";
import Header from "./Header";

const AllSongs = () => {
  const [{ allSongs }, dispatch] = useStateValue();
  const fetchData = async () => {
    if (!allSongs) {
      const songsData = await getAllSongs();
      dispatch({
        type: actionType.SET_ALL_SONGS,
        allSongs: songsData,
      });

    }
  };
  

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const playSong = (index) => {
    dispatch({
      type: actionType.SET_SONG_PLAYING,
      isSongPlaying: true,
    });

    dispatch({
      type: actionType.SET_SONG_INDEX,
      songIndex: index,
    });
  };

  return (
    <>
      <Header />
      <div className="w-full p-4 flex items-center justify-center high flex-col">
        <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md">
          <SongContainer data={allSongs} onClickSong={playSong} />
        </div>
      </div>
    </>
  );
};

export default AllSongs;
