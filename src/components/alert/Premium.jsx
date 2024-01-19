// PriceCard.js
import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Premium = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center height">
        <div className="flex gap-8">
          {/* Free with Ads Card */}
          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Free with Ads</h2>
            <p>Enjoy our content with ads for free!</p>
            <Link
              to="/payment"
              className="block mt-4 p-2 bg-blue-500 text-white rounded-md"
            >
              Upgrade to Premium
            </Link>
          </div>

          {/* Premium Card */}
          <div className="bg-purple-500 p-6 rounded-md shadow-md text-white">
            <h2 className="text-lg font-semibold mb-4">Premium</h2>
            <p>
              Ad-free experience. Unlock premium features!
            </p>
            <Link
              to="/payment"
              className="block mt-4 p-2 bg-white text-purple-500 rounded-md"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Premium;
