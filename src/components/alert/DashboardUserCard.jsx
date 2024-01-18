import React from "react";
import { motion } from "framer-motion";
import moment from "moment";

export const DashboardUserCard = ({ data }) => {
  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");

  return (
    <motion.div
      className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-275 min-w-[160px] flex items-center justify-center">
        <img
          src={data?.imageURL}
          referrerpolicy="no-referrer"
          alt=""
          className="w-10 h-10 object-cover rounded-md"
        />
      </div>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.name}
      </p>

      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.email}
      </p>

      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.email_verfied === "false" ? "True" : "False"}
      </p>

      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {createdAt}
      </p>
      <p className="text-base text-textColor w-275 min-w-[160px] text-center">
        {data.role}
      </p>
    </motion.div>
  );
};
export default DashboardUserCard;
