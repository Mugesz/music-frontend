import React from "react";
import Header from "./Header";
import { Navigate } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <Navigate to="/musics" />;
    </div>
  );
};

export default Home;
