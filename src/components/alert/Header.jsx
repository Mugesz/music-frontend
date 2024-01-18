import React, { useState } from "react";
import logo from "../../assets/img/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { useStateValue } from "../../Context/StateProvider";
import { getAuth } from "firebase/auth";
import { app } from "../../config/firebase.config";
import { motion } from "framer-motion";
import { isActiveStyles, isNotActiveStyles } from "../../utils/styles";

const Header = () => {
  const [{ user }] = useStateValue();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(false);

  const logout = () => {
    const isConfirmed = window.confirm("Are you sure you want to log out?");

    if (isConfirmed) {
      const firebaseAuth = getAuth(app);
      firebaseAuth
        .signOut()
        .then(() => {
          window.localStorage.setItem("auth", "false");
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <header className="flex flex-col md:flex-row items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to={"/musics"}>
        <img src={logo} className="w-16" alt="" />
      </NavLink>

      <ul className="flex items-center justify-center md:ml-7">
        <li className="mx-3 md:mx-5 text-lg">
          <NavLink
            to={"/musics"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Musics
          </NavLink>
        </li>
        <li className="mx-3 md:mx-5 text-lg">
          <NavLink
            to={"/dashboard/home"}
            className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
          >
            Dashboard
          </NavLink>
        </li>
        <li className="mx-3 md:mx-5 text-lg">
          <NavLink
            to={"/premium"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Premium
          </NavLink>
        </li>
        <li className="mx-3 md:mx-5 text-lg">
          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
     

      <div className="flex items-center ml-auto cursor-pointer relative">
        <img
          src={user?.user?.imageURL}
          className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg"
          alt=""
          referrerPolicy="no-referrer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-md overflow-hidden shadow-md"
          >
            <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profile
            </NavLink>
            <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              Sign out
            </button>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;