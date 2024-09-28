import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../Components/SideBar';

const UserDashboard = () => {
  return (
    <section className="bg-bluish-radial-gradient from-[#104099] to-[#2E91D5] min-h-screen pl-12 pb-6">
      <h1 className="text-[#5A7302] text-[2.625rem] font-bold">EcoGuard</h1>
      <div className="flex">
        <SideBar />
        <div className="flex-1">
          {/* This Outlet will render the nested components based on the current route */}
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
