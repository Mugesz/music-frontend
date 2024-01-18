import React, { useState, useEffect } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import { getAllAlbums } from "../../api";
import AlbumContainer from "./AlbumContainer";
import { useStateValue } from "../../Context/StateProvider";
import { actionType } from "../../Context/reducer";
import Header from "./Header";

const AllAlbum = () => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const navigate = useNavigate();
  const [{ allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        if (!allAlbums) {
          const data = await getAllAlbums();
          dispatch({
            type: actionType.SET_ALL_ALBUMNS,
            allAlbums: data.data,
          });
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  const handleClickAlbum = (album) => {
    setSelectedAlbum(album);
    navigate(`/dashboard/album/${album._id}`);
  };

  return (
    <>
      <Header />
      <div className="w-full p-4 flex items-center justify-center flex-col">
        <div className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
          <AlbumContainer
            data={allAlbums}
            type="album"
            onClickAlbum={handleClickAlbum}
          />
        </div>
      </div>
    </>
  );
};

export default AllAlbum;
