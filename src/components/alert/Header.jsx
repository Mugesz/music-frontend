import React, { useState } from "react";
import logo from "../../assets/img/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../../utils/styles";
import { FaCrown } from "react-icons/fa";
import { useStateValue } from "../../Context/StateProvider";
import { getAuth } from "firebase/auth";
import { app } from "../../config/firebase.config";
import { motion } from "framer-motion";

const Header = () => {
  const [{ user }] = useStateValue();
  const [menu, setMenu] = useState();
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
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to={"/musics"}>
        <img src={logo} className="w-16" alt="" />
      </NavLink>
      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-lg">
          <NavLink
            to={"/musics"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Musics
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
        <NavLink to={"/dashboard/home"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Dashboard
              </p>
            </NavLink>
        </li>

        <li className="mx-5 text-lg">
          <NavLink
            to={"/premium"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Premium
          </NavLink>
        </li>

        <li className="mx-5 text-lg">
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

      <div
        onMouseEnter={() => setMenu(true)}
        onMouseLeave={() => setMenu(false)}
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
      >
        <img
          src={user?.user?.imageURL}
          className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg"
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">
            {user?.user?.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Preminum Member.
            <FaCrown className="text-sm -ml-1 text-yellow-500" />
          </p>
        </div>
        {menu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 p-4 top-12 right-0 w-275 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col "
          >
            <NavLink>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Profile
              </p>
            </NavLink>
            
            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
              onClick={logout}
            >
              Sign out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;