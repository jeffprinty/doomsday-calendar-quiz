import { useState } from 'react';

import clsx from 'clsx';
import { BiCalendarStar, BiMenu, BiX } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

export interface NavItem {
  to: string;
  text: string;
  end?: boolean;
  extra?: boolean;
}

const menuTitle = 'Doomsday Calendar Quiz';

const navLinkActive = 'text-white';
const navLinkInactive = 'text-blue-400';

const NavBar = ({ navItems }: { navItems: Array<NavItem> }) => {
  // State to manage the navbar's visibility
  const [navOpen, setNavOpen] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => setNavOpen(!navOpen);

  const renderNavLink = ({ text, ...navLinkProperties }: NavItem, className: string) => (
    <NavLink
      key={text}
      className={({ isActive }) => clsx(className, isActive ? navLinkActive : navLinkInactive)}
      onClick={() => setNavOpen(false)}
      {...navLinkProperties}
    >
      {text}
    </NavLink>
  );

  return (
    <div className='mx-auto flex h-20 w-full max-w-full items-center justify-between bg-black px-4 text-white'>
      <h1 className='w-full py-3 text-2xl font-bold text-[#00df9a]'>{menuTitle}</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems
          .filter(({ extra }) => !extra)
          .map((item) => (
            <li key={item.text}>
              {renderNavLink(
                item,
                'mx-2 cursor-pointer rounded-xl px-4 py-2 duration-300 hover:bg-[#00df9a] hover:text-white'
              )}
            </li>
          ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <button onClick={handleNav} className='z-20'>
        {navOpen ? (
          <BiX size={24} className='fill-white' />
        ) : (
          <BiMenu size={24} className='fill-blue-400' />
        )}
      </button>

      {/* Mobile Navigation Menu */}
      <ul
        className={clsx(
          'z-10',
          navOpen
            ? 'fixed right-0 top-0 h-full w-[40%] border-r border-r-gray-900 bg-[#000300] duration-500 ease-in-out sm:w-1/5'
            : 'fixed bottom-0 right-[-100%] top-0 w-[40%] duration-500 ease-in-out'
        )}
      >
        {/* Mobile Logo */}
        <h1 className='z-30 m-4 w-full text-3xl font-bold text-[#00df9a]'>
          <BiCalendarStar />
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li key={item.text} className='px-2 py-1 text-right md:px-4'>
            {renderNavLink(
              item,
              'cursor-pointer duration-300 hover:bg-[#00df9a] hover:text-black text-xl'
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
