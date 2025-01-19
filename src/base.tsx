import React from 'react';

import { Route, Routes } from 'react-router-dom';

import LongCalendar from './components/long-calendar';
import NavBar from './components/nav-bar';
import GuessDateDoomsdayWithinYear from './guess-date-doomsday-within-year';
import GuessFullDateV1 from './guess-full-date-v1';
import GuessOnlyDate from './guess-only-date';
import GuessProgressive from './guess-progressive';
import GuessYearDoomsday from './guess-year-doomsday';
import StepOne from './step-1';

const navLinks = [
  { to: '/doomsday-calendar-quiz/', text: 'home', end: true },
  { to: '/doomsday-calendar-quiz/within', text: 'within' },
  { to: '/doomsday-calendar-quiz/year', text: 'year' },
  { to: '/doomsday-calendar-quiz/full', text: 'full' },
  { to: '/doomsday-calendar-quiz/progressive', text: 'progressive' },
  // { to: '/doomsday-calendar-quiz/info/long', text: 'long' },
  { to: '/doomsday-calendar-quiz/date-offset', text: 'offset' },
];

const AllPages = () => {
  return (
    <div className='flex flex-col'>
      <h2>GuessDateDoomsdayWithinYear</h2>
      <GuessDateDoomsdayWithinYear />
      <h2>StepOne</h2>
      <StepOne />
      <h2>GuessYearDoomsday</h2>
      <GuessYearDoomsday />
      <h2>GuessFullDateV1</h2>
      <GuessFullDateV1 />
      <h2>GuessProgressive</h2>
      <GuessProgressive />
      <h2>LongCalendar</h2>
      <LongCalendar />
      <h2>GuessOnlyDate</h2>
      <GuessOnlyDate />
    </div>
  );
};

// I want to be able to feed it random dates OR feed it a list of previously incorrect guesses
const Base = () => {
  return (
    <main className='flex h-screen max-w-full flex-col items-center justify-start bg-primary text-color'>
      <NavBar navItems={navLinks} />
      <div className='flex max-w-full flex-col items-center justify-start sm:w-1/2 md:max-w-[1240px]'>
        <Routes>
          <Route path='/' index element={<AllPages />} />
          <Route path='/within' element={<GuessDateDoomsdayWithinYear />} />
          <Route path='/step1' element={<StepOne />} />
          <Route path='/year' element={<GuessYearDoomsday />} />
          <Route path='/full' element={<GuessFullDateV1 />} />
          <Route path='/progressive' element={<GuessProgressive />} />
          <Route path='/info/long' element={<LongCalendar />} />
          <Route path='/date-offset' element={<GuessOnlyDate />} />
        </Routes>
      </div>
    </main>
  );
};

export default Base;
