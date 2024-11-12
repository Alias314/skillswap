import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Bars3Icon, MagnifyingGlassIcon, PlusIcon, BuildingLibraryIcon, UserIcon, BellIcon, CogIcon, XMarkIcon, HomeIcon } from '@heroicons/react/24/outline'; // Import Heroicons MenuIcon

function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar visibility

    // Function to toggle the sidebar
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <header className="h-14 w-full bg-white text-black flex items-center justify-between px-8 border-b-2 border-gray-300">
            <div className="flex items-center">
                {/* <NavLink to="/homepage"> */}
                    <img src="/skillswap-logo-3-blue.png" alt="Skillswap Logo" className="w-12 h-12 mr-1 p-1" />
                    <h1 className="text-3xl text-blue-500 font-semibold">Skillswap</h1>
                {/* </NavLink> */}
            </div>

            <div className="relative w-[50%]"> {/* Set the container width to 50% */}
                {/* Input field with padding for the search icon */}
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray rounded-lg w-full p-2 pl-10 pr-4" // Set input width to full
                />

                {/* Search icon positioned inside the input */}
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <div>
                <nav className="flex space-x-4">
                    <NavLink to="/login" className="px-5 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 hover:text-white">Log in</NavLink>
                    <NavLink to="/signup" className="px-5 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 hover:text-white">Sign up</NavLink>
                    <button onClick={toggleSidebar} className="p-1">
                        <Bars3Icon className="w-6 h-6 text-black hover:text-blue-500" />
                    </button>
                </nav>
            </div>

            {sidebarOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
                    {/* Sidebar */}
                    <div className="bg-white w-[250px] h-full p-4 shadow-lg fixed right-0 top-0">
                        <button onClick={toggleSidebar} className="p-2 text-blue-500 absolute top-4 right-4">
                            {/* XMarkIcon should be visible */}
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                        <ul className='mt-12'>
                            <li className="mb-4">
                                <NavLink to="/homepage" className="flex items-center text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out px-1 py-2 rounded-md">
                                    <HomeIcon className="w-7 h-7 mr-2" />
                                    Home
                                </NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to="/create-note" className="flex items-center text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out px-1 p-1 rounded-md">
                                    <PlusIcon className="w-7 h-7 mr-2" />
                                    Create Notes
                                </NavLink>
                            </li>
                            <li className="mb-4">
                                <NavLink to="/my-library" className="flex items-center text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out px-1 p-1 rounded-md">
                                    <BuildingLibraryIcon className="w-7 h-7 mr-2" />
                                    My Library
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
