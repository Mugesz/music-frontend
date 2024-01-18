import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoArrowRedo, IoMusicalNote } from "react-icons/io5";
import { motion } from "framer-motion";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { RiPlayListFill } from "react-icons/ri";
import { useStateValue } from "../../Context/StateProvider";
import { actionType } from "../../Context/reducer";
import { getAllSongs } from "../../api";

const MusicPlayer = () => {
  const [isPlayList, setIsPlayList] = useState(false);
  const [{ allSongs, songIndex, isSongPlaying, miniPlayer }, dispatch] =
    useStateValue();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!allSongs) {
          const songsData = await getAllSongs();
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: songsData,
          });
          console.log("Songs:", songsData?.data);
        }

        if (!isSongPlaying && songIndex !== null) {
          dispatch({
            type: actionType.SET_SONG_PLAYING,
            isSongPlaying: true,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [allSongs, songIndex, isSongPlaying, dispatch]);

  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: false,
      });
    }
  };

  const togglePlayer = () => {
    dispatch({
      type: actionType.SET_MINI_PLAYER,
      miniPlayer: !miniPlayer,
    });
  };

  const nextTrack = () => {
    dispatch({
      type: actionType.SET_SONG_INDEX,
      songIndex: (songIndex + 1) % allSongs.length,
    });
  };

  const previousTrack = () => {
    dispatch({
      type: actionType.SET_SONG_INDEX,
      songIndex: (songIndex - 1 + allSongs.length) % allSongs.length,
    });
  };

  if (!allSongs || allSongs.length === 0) {
    return (
      <div>
        <p>No songs available</p>
      </div>
    );
  }

  return (
    <div className="w-full full flex items-center gap-3 overflow-hidden">
      <div
        className={`w-full full items-center gap-3 p-4 ${
          miniPlayer ? "absolute top-40" : "flex relative"
        }`}
      >
        <img
          src={allSongs[songIndex]?.imageURL}
          className="w-40 h-20 object-cover rounded-md"
          alt=""
        />
        <div className="flex items-start flex-col">
          <p className="text-xl text-headingColor font-semibold">
            {`${
              allSongs[songIndex]?.name.length > 20
                ? allSongs[songIndex]?.name.slice(0, 20)
                : allSongs[songIndex]?.name
            }`}{" "}
            <span className="text-base">({allSongs[songIndex]?.album})</span>
          </p>
          <p className="text-textColor">
            {allSongs[songIndex]?.artist}{" "}
            <span className="text-sm text-textColor font-semibold">
              ({allSongs[songIndex]?.category})
            </span>
          </p>
          <motion.i
            whileTap={{ scale: 0.8 }}
            onClick={() => setIsPlayList(!isPlayList)}
          >
            <RiPlayListFill className="text-textColor hover:text-headingColor text-3xl cursor-pointer" />
          </motion.i>
        </div>
        <div className="flex-1">
          <AudioPlayer
            src={allSongs[songIndex]?.songUrl}
            onPlay={() => console.log("is playing")}
            autoPlay={isSongPlaying}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
        <div className="h-full flex items-center justify-center flex-col gap-3">
          <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
            <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
          </motion.i>
          <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
            <IoArrowRedo className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
          </motion.i>
        </div>
      </div>

      {isPlayList && (
        <>
          <PlayListCard />
        </>
      )}

      {miniPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed right-2 bottom-2 "
        >
          {/* ... (rest of the code remains unchanged) */}
        </motion.div>
      )}
    </div>
  );
};

export const PlayListCard = () => {
  const [{ allSongs, songIndex, isSongPlaying }, dispatch] = useStateValue();

  const setCurrentPlaySong = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }

    if (songIndex !== index) {
      dispatch({
        type: actionType.SET_SONG_INDEX,
        songIndex: index,
      });
    }
  };

  return (
    <div className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary">
      {allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer ${
              music?._id === songIndex._id ? "bg-card" : "bg-transparent"
            }`}
            onClick={() => setCurrentPlaySong(index)}
          >
            <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />

            <div className="flex items-start flex-col">
              <p className="text-lg text-headingColor font-semibold">
                {`${
                  music?.name.length > 20
                    ? music?.name.slice(0, 20)
                    : music?.name
                }`}{" "}
                <span className="text-base">({music?.album})</span>
              </p>
              <p className="text-textColor">
                {music?.artist}{" "}
                <span className="text-sm text-textColor font-semibold">
                  ({music?.category})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default MusicPlayer;
