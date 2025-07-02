import { useState } from 'react';

import clsx from 'clsx';
import { BiCalendarStar, BiMenu, BiX } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

type NavItemCategories = 'practice' | 'ungrouped' | 'deprecated' | 'top';

export interface NavItem {
  to: string;
  text: string;
  end?: boolean;
  extra?: boolean;
  category?: NavItemCategories;
}

type NavItemGroupsHash = {
  [key in NavItemCategories]: Array<NavItem>;
};

const menuTitle = 'Doomsday Calendar Quiz';

const navLinkActive = 'text-white';
const navLinkInactive = 'text-blue-400';

const liClass = 'text-xl px-2 py-1 text-right md:px-4';

const NavMenuItem = ({ onClick, navItem }: { onClick: () => void; navItem: NavItem }) => {
  const { category, extra, text, ...navLinkProperties } = navItem;
  return (
    <li key={text} data-extra={extra} className={liClass}>
      <NavLink
        data-category={category}
        key={text}
        className={({ isActive }) =>
          clsx(
            'cursor-pointer duration-300 hover:bg-[#00df9a] hover:text-black',
            isActive ? navLinkActive : navLinkInactive
          )
        }
        onClick={onClick}
        {...navLinkProperties}
      >
        {text}
      </NavLink>
    </li>
  );
};

const NavBar = ({ navItems }: { navItems: Array<NavItem> }) => {
  const [navOpen, setNavOpen] = useState(false);

  const groupedNavItemsHash = navItems.reduce(
    (acc: NavItemGroupsHash, navItem) => {
      const { category } = navItem;
      if (category) {
        acc[category].push(navItem);
      } else {
        acc.ungrouped.push(navItem);
      }
      return acc;
    },
    { practice: [], ungrouped: [], deprecated: [], top: [] }
  );
  console.log('groupedNavItemsHash', groupedNavItemsHash);

  const renderNavLink = ({ category, text, ...navLinkProperties }: NavItem, className: string) => {
    return (
      <NavLink
        data-category={category}
        key={text}
        className={({ isActive }) => clsx(className, isActive ? navLinkActive : navLinkInactive)}
        onClick={() => setNavOpen(false)}
        {...navLinkProperties}
      >
        {text}
      </NavLink>
    );
  };

  return (
    <div className='mx-auto flex h-20 w-full max-w-full items-center justify-between bg-black px-4 text-white'>
      <h1 className='w-full py-3 text-2xl font-bold text-[#00df9a] md:w-1/4'>{menuTitle}</h1>

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
      <button onClick={() => setNavOpen(!navOpen)} className='z-20'>
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

        {/* TOP */}
        {groupedNavItemsHash.top.map((navItem) => (
          <NavMenuItem key={navItem.text} navItem={navItem} onClick={() => setNavOpen(false)} />
        ))}

        {/* PRACTICE */}
        <li className={liClass}>Practice</li>
        {groupedNavItemsHash.practice.map((navItem) => (
          <NavMenuItem key={navItem.text} navItem={navItem} onClick={() => setNavOpen(false)} />
        ))}

        {/* UNGROUPED */}
        {groupedNavItemsHash.ungrouped.map((navItem) => (
          <NavMenuItem key={navItem.text} navItem={navItem} onClick={() => setNavOpen(false)} />
        ))}

        <hr />
        {/* DEPRECATED */}
        {groupedNavItemsHash.deprecated.map((navItem) => (
          <NavMenuItem key={navItem.text} navItem={navItem} onClick={() => setNavOpen(false)} />
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
