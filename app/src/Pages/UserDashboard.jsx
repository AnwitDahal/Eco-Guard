import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import { useAuthStore } from '../store/AppStore';
import { logoEco } from '../Images';

const UserDashboard = () => {
  const {checkAuth,user}=useAuthStore();
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  return (
    <section className="bg-bluish-radial-gradient from-[#104099] to-[#2E91D5] min-h-screen pl-12 pb-6">
      <img src={logoEco} alt="" width={240} className='pt-2'/>
      <div className="flex">
        <SideBar />
        <div className="flex-1">
          {/* This Outlet will render the nested components based on the current route */}
          <Outlet  />
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
