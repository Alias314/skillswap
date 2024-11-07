import React from 'react';
import { NavLink } from 'react-router-dom';
import { MagnifyingGlassIcon, PlusIcon, UserIcon, BellIcon, CogIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline'; // Import necessary icons

function Sidebar() {
  return (
    <div className='h-screen flex flex-col'>
        <div className='bg-blue-700 p-5 h-[10%] rounded-br-3xl mb-3'>
            <div className='flex items-center h-[100%] text-white'>
                <img src="/skillshare-logo.png" alt="Skillswap Logo" className="w-12 h-12" />
                <p className='text-2xl font-medium'>Skillswap</p>
            </div>
        </div>

        <div className="w-52 bg-blue-700 p-5 h-[89%] rounded-tr-3xl">
            <ul className="list-none p-0">
                <li className="mb-4">
                <NavLink to="/explore" className="flex items-center text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out px-1 p-1 rounded-md">
                    <MagnifyingGlassIcon className="w-7 h-7 mr-2" />
                    Explore Notes
                </NavLink>
                </li>
                <li className="mb-4">
                <NavLink to="/create-note" className="flex items-center text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out px-1 p-1 rounded-md">
                    <PlusIcon className="w-7 h-7 mr-2" />
                    Create Notes
                </NavLink>
                </li>
                <li className="mb-4">
                <NavLink to="/my-notes" className="flex items-center text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out px-1 p-1 rounded-md">
                    <BuildingLibraryIcon className="w-7 h-7 mr-2" />
                    My Library
                </NavLink>
                </li>
                <li className="mb-4">
                <NavLink to="/profile" className="flex items-center text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out px-1 p-1 rounded-md">
                    <UserIcon className="w-7 h-7 mr-2" />
                    My Profile
                </NavLink>
                </li>
                <li className="mb-4">
                <NavLink to="/notifications" className="flex items-center text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out px-1 p-1 rounded-md">
                    <BellIcon className="w-7 h-7 mr-2" />
                    Notifications
                </NavLink>
                </li>
                <li className="mb-4">
                <NavLink to="/settings" className="flex items-center text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out px-1 p-1 rounded-md">
                    <CogIcon className="w-7 h-7 mr-2" />
                    Settings
                </NavLink>
                </li>
            </ul>
        </div>
    </div>
  );
}

export default Sidebar;