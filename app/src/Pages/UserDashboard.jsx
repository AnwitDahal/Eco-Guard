import React from "react";
import SideBar from "../Components/SideBar";
import AddressAQIData from "../Components/AddressAQIData";

const UserDashboard = () => {
  return (
    <section className="bg-bluish-radial-gradient from-[#104099] to-[#2E91D5] flex flex-col "> {/* Changed to flex-col */}
      <h1 className="text-[#5A7302] text-[2.625rem] font-bold mt-3 mx-3">
        EcoGuard
      </h1>
      <div className="flex ml-3"> {/* Added flex-grow to take remaining height */}
        <SideBar />
        <div className=""> {/* Use flex-1 to take the remaining space */}
          <AddressAQIData />
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
