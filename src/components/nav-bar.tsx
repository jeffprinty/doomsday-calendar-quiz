import React, { useState } from 'react';

import clsx from 'clsx';
import { AiFillCalendar, AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

interface NavItem {
  to: string;
  text: string;
  end?: boolean;
}

const menuTitle = 'Doomsday Calendar Quiz';

const NavBar = ({ navItems }: { navItems: Array<NavItem> }) => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  const renderNavLink = ({ text, ...navLinkProperties }: NavItem, className: string) => (
    <NavLink
      key={text}
      className={({ isActive }) => clsx(className, isActive ? 'text-white' : 'text-blue-400')}
      {...navLinkProperties}
    >
      {text}
    </NavLink>
  );

  return (
    <div className='mx-auto flex h-20 w-full items-center justify-between bg-black px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>{menuTitle}</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map((item) => (
          <li key={item.text}>
            {renderNavLink(
              item,
              'mx-2 cursor-pointer rounded-xl px-4 py-2 duration-300 hover:bg-[#00df9a] hover:text-white'
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <button onClick={handleNav} className='z-20 block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </button>

      {/* Mobile Navigation Menu */}
      <ul
        className={clsx(
          'z-10',
          nav
            ? 'fixed right-0 top-0 h-full w-[40%] border-r border-r-gray-900 bg-[#000300] duration-500 ease-in-out md:hidden'
            : 'fixed bottom-0 right-[-100%] top-0 w-[40%] duration-500 ease-in-out'
        )}
      >
        {/* Mobile Logo */}
        <h1 className='m-4 w-full text-3xl font-bold text-[#00df9a]'>
          <AiFillCalendar />
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li key={item.text}>
            {renderNavLink(
              item,
              'cursor-pointer rounded-xl border-b border-gray-600 p-4 duration-300 hover:bg-[#00df9a] hover:text-black'
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
