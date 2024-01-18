import React from "react";
import Header from "./Header";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="container">
        <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>

        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-blue-500 text-white p-2 rounded-full">
            <i className="fab fa-facebook-f"></i>
          </div>
          <p className="text-lg">Facebook</p>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-pink-500 text-white p-2 rounded-full">
            <i className="fab fa-instagram"></i>
          </div>
          <p className="text-lg">Instagram</p>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-red-500 text-white p-2 rounded-full">
            <i className="far fa-envelope"></i>
          </div>
          <p className="text-lg">Email</p>
        </div>
      </div>
    </>
  );
};

export default Contact;
