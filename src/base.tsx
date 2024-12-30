import React from 'react';

import { Route, Routes } from 'react-router-dom';

import LongCalendar from './components/long-calendar';
import NavBar from './components/nav-bar';
import GuessDateDoomsdayWithinYear from './guess-date-doomsday-within-year';
import GuessFullDate from './guess-full-date';
import GuessOnlyDate from './guess-only-date';
import GuessYearDoomsday from './guess-year-doomsday';

const navLinks = [
  { to: '/doomsday-calendar-quiz/', text: 'home', end: true },
  { to: '/doomsday-calendar-quiz/year', text: 'year' },
  { to: '/doomsday-calendar-quiz/full', text: 'full' },
  { to: '/doomsday-calendar-quiz/long', text: 'long' },
  { to: '/doomsday-calendar-quiz/only-date', text: 'date' },
];

// I want to be able to feed it random dates OR feed it a list of previously incorrect guesses
const Base = () => {
  return (
    <main className='flex h-screen max-w-full flex-col items-center justify-start bg-primary text-color md:max-w-[1240px]'>
      <NavBar navItems={navLinks} />
      <Routes>
        <Route path='/' index element={<GuessDateDoomsdayWithinYear />} />
        <Route path='/year' element={<GuessYearDoomsday />} />
        <Route path='/full' element={<GuessFullDate />} />
        <Route path='/long' element={<LongCalendar />} />
        <Route path='/only-date' element={<GuessOnlyDate />} />
      </Routes>
    </main>
  );
};

export default Base;
