import React from 'react';

import { NavLink, Route, Routes } from 'react-router-dom';

import GuessDateDoomsdayWithinYear from './guess-date-doomsday-within-year';
import GuessFullDate from './guess-full-date';
import GuessYearDoomsday from './guess-year-doomsday';

const activeLink = 'text-white';
const inactiveLink = 'text-blue-700';

// I want to be able to feed it random dates OR feed it a list of previously incorrect guesses
const Base = () => {
  return (
    <>
      <div className='quiz__header-menu absolute right-0 top-0'>
        <nav className='flex flex-col'>
          <NavLink
            className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
            to='/doomsday-calendar-quiz/'
            end
          >
            home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
            to='/doomsday-calendar-quiz/year'
          >
            year
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
            to='/doomsday-calendar-quiz/full'
          >
            full
          </NavLink>
        </nav>
      </div>
      <Routes>
        <Route path='/' index element={<GuessDateDoomsdayWithinYear />} />
        <Route path='/year' element={<GuessYearDoomsday />} />
        <Route path='/full' element={<GuessFullDate />} />
      </Routes>
    </>
  );
};

export default Base;
