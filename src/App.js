import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/alert/Login";
import Home from "./components/alert/Home";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase.config";
import { useStateValue } from "./Context/StateProvider";
import { AnimatePresence } from "framer-motion";
import { getAllAlbums, getAllArtist, getAllSongs, getAllUsers, validateUser } from "./api";
import { actionType } from "./Context/reducer";
import Dashboard from "./components/alert/Dashboard";
import { motion } from "framer-motion";
import Musicplayer from "./components/alert/Musicplayer";
import AllSongs from "./components/alert/AllSongs";
import AlbumDetails from "./components/alert/AlbumDetails";
import PaymentUI from "./components/alert/PaymentUI";
import Premium from "./components/alert/Premium";
import Contact from "./components/alert/Contact";

function App() {
  const firebaseAuth = getAuth(app);

  const navigate = useNavigate();
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [{ allUsers,allSongs,allArtist, isSongPlaying,allAlbums }, dispatch] = useStateValue();

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

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          window.localStorage.setItem("auth", "true");
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        navigate("/login");
      }
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="h-auto min-w-[680px] bg-primary justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/musics" element={<AllSongs />} />
          <Route path="/dashboard/album/:albumId" element={<AlbumDetails />} />
          <Route path="/premium" element={<Premium />} />
        <Route path="/payment" element={<PaymentUI />} />
        <Route path="/contact" element={<Contact />} />

        </Routes>
        {auth && isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
            <Musicplayer />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default App;
