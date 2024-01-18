import React, { useEffect, useState } from "react";
import FilterButtons from "./FilterButton";
import { useStateValue } from "../../Context/StateProvider";
import { filterByLanguage, filters } from "../../utils/supportfunctions";
import {
  getAllAlbums,
  getAllArtist,
  getAllSongs,
  saveNewAlbum,
  saveNewArtist,
  saveNewSong,
} from "../../api";
import { actionType } from "../../Context/reducer";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../config/firebase.config";
import DisabledButton from "./DisabledButton";
import { motion } from "framer-motion";
import ImageUpload from "./ImageUpload";
import AudioUpload from "./AudioUpload";
import ArtistUpload from "./ArtistUpload";
import AlbumUpload from "./AlbumUpload";

const DashboardNewsong = () => {
  const [songName, setSongName] = useState("");

  const [isImageLoading, setIsImageLoading] = useState(false);
  const [songImageCover, setSongImageCover] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const [audioImageCover, setAudioImageCover] = useState(null);
  const [audioUploadProgress, setAudioUploadProgress] = useState(0);
  const [isAudioLoading, setIsAudioLoadng] = useState(false);

  const [artistImageCover, setArtistImageCover] = useState(null);
  const [artistUploadingProgress, setArtistUploadingProgress] = useState(0);
  const [isArtistUploading, setIsArtistUploading] = useState(false);

  const [albumImageCover, setAlbumImageCover] = useState(null);
  const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0);
  const [isAlbumUploading, setIsAlbumUploading] = useState(false);

  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumName, setAlbumName] = useState("");

  const [
    {
      allArtist,
      allAlbums,
      languageFilter,
      artistFilter,
      albumFilter,
      filterTerm,
      alertType,
    },
    dispatch,
  ] = useStateValue();

  // artist

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistData = await getAllArtist();
        dispatch({
          type: actionType.SET_ALL_ARTIST,
          allArtist: artistData.data,
        });

        const albumData = await getAllAlbums();
        dispatch({
          type: actionType.SET_ALL_ALBUMNS,
          allAlbums: albumData.data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // for deletion

  const deleteImageObject = async (Url, isImage) => {
    if (isImage) {
      setIsImageLoading(true);
      setIsAudioLoadng(true);
      setIsAlbumUploading(true);
      setIsArtistUploading(true);
    }

    const deleteRef = ref(storage, Url);
    deleteObject(deleteRef).then(() => {
      setSongImageCover(null);
      setAudioImageCover(null);
      setAlbumImageCover(null);
      setArtistImageCover(null);

      setIsImageLoading(false);
      setIsAudioLoadng(false);
      setIsAlbumUploading(false);
      setIsArtistUploading(false);
    });
  };

  dispatch({
    type: actionType.SET_ALERT_TYPE,
    alertType: "success",
  });
  setTimeout(() => {
    dispatch({
      type: actionType.SET_ALERT_TYPE,
      alertType: null,
    });
  }, 4000);

  // save song
  const saveSong = async () => {
    try {
      if (!songImageCover || !audioImageCover) {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "danger",
        });
        setTimeout(() => {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          });
        }, 4000);
      }

      setIsImageLoading(true);
      setIsAudioLoadng(true);

      const data = {
        name: songName,
        imageURL: songImageCover,
        songUrl: audioImageCover,
        album: albumFilter,
        artist: artistFilter,
        language: languageFilter,
        category: filterTerm,
      };

      await saveNewSong(data);

      const songs = await getAllSongs();
      dispatch({
        type:actionType.SET_ALERT_TYPE,
        alertType:"success"
      })
      setTimeout(()=>{
        dispatch({
          type:actionType.SET_ALERT_TYPE,
          alertType:null
        })
      },4000)

      setIsImageLoading(false);
      setIsAudioLoadng(false);
      setSongName("");
      setSongImageCover(null);
      setAudioImageCover(null);
      dispatch({ type: actionType.SET_ALL_SONGS, allSongs: songs.songs });
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
    } catch (error) {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "danger",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);
    } finally {
      setIsImageLoading(false);
      setIsAudioLoadng(false);
    }
  };

  // save artist
  const saveArtist = () => {
    try {
      if (!artistImageCover || !artistName || !twitter || !instagram) {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "danger",
        });
        setTimeout(() => {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          });
        }, 4000);
      }

      setIsArtistUploading(true);

      const data = {
        name: artistName,
        imageURL: artistImageCover,
        twitter: twitter,
        instagram: instagram,
      };

      saveNewArtist(data).then((res) => {
        getAllArtist().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMNS,
            allArtist: data.artist,
          });
        });
      });

      setIsArtistUploading(false);
      setArtistImageCover(null);
      setTwitter("");
      setInstagram("");
      setArtistName("");
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);
    } catch (error) {
      
      console.error("Error saving artist:", error.message);
      alert("Error saving artist. Please check the provided information.");
    }
  };

  // save album

  const saveAlbum = () => {
    try {
      if (!albumImageCover || !albumName) {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: "danger",
        });
        setTimeout(() => {
          dispatch({
            type: actionType.SET_ALERT_TYPE,
            alertType: null,
          });
        }, 4000);
      }

      setIsAlbumUploading(true);

      const data = {
        name: albumName,
        imageURL: albumImageCover,
      };

      saveNewAlbum(data).then(() => {
        getAllAlbums().then((data) => {
          dispatch({
            type: actionType.SET_ALL_ALBUMNS,
            allAlbums: data.allAlbums,
          });
        });
      });
      setIsAlbumUploading(false);
      setAlbumImageCover(null);
      setAlbumName("");
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: "success",
      });
      setTimeout(() => {
        dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: null,
        });
      }, 4000);
    } catch (error) {
      console.error("Error saving artist:", error.message);
      alert("Error saving artist. Please check the provided information.");
    }
  };

  // return statement

  return (
    <div className="flex items-center justify-center p-4 border border-gray-300 rounded-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Type your song name"
            className="w-full p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />
          <div className="flex w-full justify-between flex-wrap items-center gap-4">
            <FilterButtons filterData={allArtist} flag={"Artist"} />
            <FilterButtons filterData={allAlbums} flag={"Albums"} />
            <FilterButtons filterData={filterByLanguage} flag={"Language"} />
            <FilterButtons filterData={filters} flag={"Category"} />
          </div>

          <ImageUpload
            isImageLoading={isImageLoading}
            setIsImageLoading={setIsImageLoading}
            songImageCover={songImageCover}
            setSongImageCover={setSongImageCover}
            imageUploadProgress={imageUploadProgress}
            setImageUploadProgress={setImageUploadProgress}
            deleteImageObject={deleteImageObject}
          />

          <AudioUpload
            audioImageCover={audioImageCover}
            setAudioImageCover={setAudioImageCover}
            audioUploadProgress={audioUploadProgress}
            setAudioUploadProgress={setAudioUploadProgress}
            isAudioLoading={isAudioLoading}
            setIsAudioLoadng={setIsAudioLoadng}
            deleteImageObject={deleteImageObject}
          />
          <div className="flex items-center justify-end w-full p-4">
            {isImageLoading || isAudioLoading ? (
              <DisabledButton />
            ) : (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
                onClick={saveSong}
              >
                Send
              </motion.button>
            )}
          </div>
          {/* image uploaded for artist */}
          <p className=" text-xl font-semibold text-headingColor">
            Artist details
          </p>
          <ArtistUpload
            artistImageCover={artistImageCover}
            setArtistImageCover={setArtistImageCover}
            artistUploadingProgress={artistUploadingProgress}
            setArtistUploadingProgress={setArtistUploadingProgress}
            isArtistUploading={isArtistUploading}
            setIsArtistUploading={setIsArtistUploading}
            deleteImageObject={deleteImageObject}
          />

          {/* artist name */}

          <div className="flex flex-col items-center justify-center gap-4 ">
            <input
              type="text"
              placeholder="Artist Name"
              className="w-full lg:w-300 p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />

            <div className="w-full lg:w-300 p-3 flex items-center rounded-md shadow-sm border border-gray-300">
              <p className="text-base font-semibold text-gray-400">
                www.twitter.com/
              </p>
              <input
                type="text"
                placeholder="your id"
                className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-300 p-3 flex items-center rounded-md shadow-sm border border-gray-300">
              <p className="text-base font-semibold text-gray-400">
                www.instagram.com/
              </p>
              <input
                type="text"
                placeholder="your id"
                className="w-full text-base font-semibold text-textColor outline-none bg-transparent"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-300 flex items-center justify-center lg:justify-end">
              {isArtistUploading ? (
                <DisabledButton />
              ) : (
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
                  onClick={saveArtist}
                >
                  Save Artist
                </motion.button>
              )}
            </div>

            <p className=" text-xl font-semibold text-headingColor">
              Album details
            </p>
            <AlbumUpload
              albumImageCover={albumImageCover}
              setAlbumImageCover={setAlbumImageCover}
              albumUploadingProgress={albumUploadingProgress}
              setAlbumUploadingProgress={setAlbumUploadingProgress}
              isAlbumUploading={isAlbumUploading}
              setIsAlbumUploading={setIsAlbumUploading}
              deleteImageObject={deleteImageObject}
            />
            <input
              type="text"
              placeholder="album Name"
              className="w-full lg:w-300 p-3 rounded-md text-base font-semibold text-textColor outline-none shadow-sm border border-gray-300 bg-transparent"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
            />

            <div className="w-full lg:w-300 flex items-center justify-center lg:justify-end">
              {isArtistUploading ? (
                <DisabledButton />
              ) : (
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  className="px-8 py-2 rounded-md text-white bg-red-600 hover:shadow-lg"
                  onClick={saveAlbum}
                >
                  Save Album
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNewsong;
