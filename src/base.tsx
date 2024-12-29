import React from 'react';

import { NavLink, Route, Routes } from 'react-router-dom';

import LongCalendar from './components/long-calendar';
import GuessDateDoomsdayWithinYear from './guess-date-doomsday-within-year';
import GuessFullDate from './guess-full-date';
import GuessYearDoomsday from './guess-year-doomsday';

const navLinks = [
  { to: '/doomsday-calendar-quiz/', text: 'home', end: true },
  { to: '/doomsday-calendar-quiz/year', text: 'year' },
  { to: '/doomsday-calendar-quiz/full', text: 'full' },
  { to: '/doomsday-calendar-quiz/long', text: 'long' }
];

// I want to be able to feed it random dates OR feed it a list of previously incorrect guesses
const Base = () => {
  return (
    <>
      <div className='quiz__header-menu absolute right-0 top-0'>
        <nav className='flex flex-col'>
          {navLinks.map(({ end, to, text }) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'text-white' : 'text-blue-700')}
              to={to}
              end={end}
              key={to}
            >
              {text}
            </NavLink>
          ))}
        </nav>
      </div>
      <Routes>
        <Route path='/' index element={<GuessDateDoomsdayWithinYear />} />
        <Route path='/year' element={<GuessYearDoomsday />} />
        <Route path='/full' element={<GuessFullDate />} />
        <Route path='/long' element={<LongCalendar />} />
      </Routes>
    </>
  );
};

export default Base;
