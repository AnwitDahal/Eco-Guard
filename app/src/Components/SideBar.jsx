import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { iconsMap, userOptionsList } from '../Data';
import { LogOut } from 'lucide-react';

const   SideBar = () => {
  const location = useLocation(); // Get the current location

  return (
    <section className='bg-[hsl(198,55%,60%)] bg-opacity-20 shadow-2xl mt-10 min-w-72 py-9 px-8 rounded-[1.875rem]'>
      <ul className='flex flex-col gap-5'>
        {userOptionsList.map((option, index) => {
          const IconComponent = iconsMap[option.Icon]; // Get the actual component
          const isActive = location.pathname === option.path; // Check if the option is active

          return (
            <li key={index} className={`flex items-center gap-2 ${isActive ? 'bg-sky-700 rounded-lg py-2 px-2' : ''}`}>
              <Link to={option.path} className="flex items-center gap-2 w-full">
                {/* Render the icon */}
                <IconComponent size={24} color='white' />
                <span className={`${isActive ? 'text-white font-bold' : 'text-gray-200'}`}>{option.title}</span>
              </Link>
            </li>
          );
        })}
        <li className="flex items-center gap-2 mt-72">
          <LogOut size={24} color='white' />
          <span>Log Out</span>
        </li>
      </ul>
    </section>
  );
}

export default SideBar;
