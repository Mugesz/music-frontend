import React from "react";
import { useStateValue } from "../../Context/StateProvider";
import DashboardUserCard from "./DashboardUserCard";


const DashboardUser = () => {
  const [{ allUsers }] = useStateValue();


  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-24"></div>
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll scrollbar-thin scrollbar-track-slate-300 scrollbar-thumb-slate-400 my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-sm font-bold">
            Count :{" "}
            <span className="text-sm font-semibold text-textColor">
              {allUsers?.length}
            </span>
          </p>
        </div>
        <div className="w-full min-w-[750px] flex items-center justify-between">
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Image
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Name
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Email
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Verified
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Created
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Role
          </p>{" "}
        </div>

        {allUsers &&
          allUsers?.map((data, index) => (
            <DashboardUserCard key={index} data={data} />
          ))}
      </div>
    </div>
  );
};

export default DashboardUser;
