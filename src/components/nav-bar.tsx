import React, { useState } from 'react';

import clsx from 'clsx';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

interface NavItem {
  to: string;
  text: string;
  end?: boolean;
}

const NavBar = ({ navItems }: { navItems: Array<NavItem> }) => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  const renderNavLink = ({ text, ...navLinkProperties }: NavItem, isMobile = false) => (
    <NavLink
      key={text}
      className={({ isActive }) =>
        clsx(
          isActive ? 'text-white' : 'text-blue-400',
          isMobile
            ? 'cursor-pointer rounded-xl border-b border-gray-600 p-4 duration-300 hover:bg-[#00df9a] hover:text-black'
            : 'm-2 cursor-pointer rounded-xl p-4 duration-300 hover:bg-[#00df9a] hover:text-black'
        )
      }
      {...navLinkProperties}
    >
      {text}
    </NavLink>
  );

  return (
    <div className='mx-auto flex h-20 max-w-[1240px] items-center justify-between bg-black px-4 text-white'>
      {/* Logo */}
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Doomsday Calendar Quiz</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>{navItems.map((navItem) => renderNavLink(navItem))}</ul>

      {/* Mobile Navigation Icon */}
      <button onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </button>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed left-0 top-0 h-full w-[60%] border-r border-r-gray-900 bg-[#000300] duration-500 ease-in-out md:hidden'
            : 'fixed bottom-0 left-[-100%] top-0 w-[60%] duration-500 ease-in-out'
        }
      >
        {/* Mobile Logo */}
        <h1 className='m-4 w-full text-3xl font-bold text-[#00df9a]'>REACT.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className='cursor-pointer rounded-xl border-b border-gray-600 p-4 duration-300 hover:bg-[#00df9a] hover:text-black'
          >
            {renderNavLink(item, true)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
