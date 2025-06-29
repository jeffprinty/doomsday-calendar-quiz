import { Route, Routes } from 'react-router-dom';

import AllSteps from './all-steps';
import { Home } from './components/home';
import LongCalendar from './components/long-calendar';
import MonthDoomsdayCalendar from './components/month-doomsday-calendar';
import NavBar from './components/nav-bar';
import GuessDateDoomsdayWithinYear from './guess-date-doomsday-within-year';
import GuessFullDateV1 from './guess-full-date-v1';
import GuessOffsetForDate from './guess-offset-for-date';
import GuessProgressive from './guess-progressive';
import GuessYearDoomsday from './guess-year-doomsday';
import OddPlusEleven from './modules/odd-plus-eleven';
import Reference from './reference';
import StepOne from './step-1';

const baseUrl = import.meta.env.BASE_URL;

const navLinks = [
  { to: `${baseUrl}/`, text: 'home', end: true },
  { to: `${baseUrl}/odd`, text: 'odd' },
  { to: `${baseUrl}/date-offset`, text: 'offset' },
  { to: `${baseUrl}/learn/doomsday`, text: 'doomsday' },
  { to: `${baseUrl}/learn/reference`, text: 'ref' },
  { to: `${baseUrl}/within`, text: 'within' },
  // { to: `${baseUrl}/year`, text: 'year' }, // superseded by full
  { to: `${baseUrl}/full`, text: 'full' },
  { to: `${baseUrl}/steps`, text: 'steps' },
  // { to: '/doomsday-calendar-quiz/info/long', text: 'long' },
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
      <h2>GuessOffsetForDate</h2>
      <GuessOffsetForDate />
    </div>
  );
};

// I want to be able to feed it random dates OR feed it a list of previously incorrect guesses
const Base = () => {
  return (
    <main className='flex h-screen max-w-full flex-col items-center justify-start bg-primary text-color'>
      <NavBar navItems={navLinks} />
      <div className='flex h-screen max-w-full flex-col items-center justify-start sm:w-1/2 md:max-w-[1240px]'>
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/all' element={<AllPages />} />
          <Route path='/steps' element={<AllSteps />} />
          <Route path='/learn/doomsday' element={<MonthDoomsdayCalendar />} />
          <Route path='/learn/reference' element={<Reference />} />
          <Route path='/odd' element={<OddPlusEleven />} />
          <Route path='/within' element={<GuessDateDoomsdayWithinYear />} />
          <Route path='/step1' element={<StepOne />} />
          <Route path='/year' element={<GuessYearDoomsday />} />
          <Route path='/full' element={<GuessFullDateV1 />} />
          <Route path='/progressive' element={<GuessProgressive />} />
          <Route path='/info/long' element={<LongCalendar />} />
          <Route path='/date-offset' element={<GuessOffsetForDate />} />
        </Routes>
      </div>
    </main>
  );
};

export default Base;
