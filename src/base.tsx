import { Route, Routes } from 'react-router-dom';

import AllSteps from './all-steps';
import { Home } from './components/home';
import LongCalendar from './components/long-calendar';
import MonthDoomsdayCalendar from './components/month-doomsday-calendar';
import NavBar, { NavItem } from './components/nav-bar';
import GuessDateDoomsdayInModernity from './guess-date-doomsday';
import GuessDateDoomsday from './guess-date-doomsday-within-year.old';
import GuessFullDateV1 from './guess-full-date-v1';
import GuessOffsetForDate from './guess-offset-for-date';
import GuessProgressive from './guess-progressive';
import GuessYearDoomsday from './guess-year-doomsday';
import OddPlusEleven from './modules/odd-plus-eleven';
import Reference from './reference';
import StepOne from './step-1';

const baseUrl = import.meta.env.BASE_URL;
const currentYear = new Date().getFullYear().toString();

const routeArray = [
  {
    path: '/',
    index: true,
    element: <Home />,
    text: 'home',
    end: true,
  },
  {
    path: '/steps',
    element: <AllSteps />,
    text: 'steps',
    extra: true,
  },
  {
    path: '/learn/doomsday',
    element: <MonthDoomsdayCalendar />,
    text: 'doomsday',
  },
  {
    path: '/learn/reference',
    element: <Reference />,
    text: 'reference',
  },
  {
    path: '/odd',
    element: <OddPlusEleven />,
    text: 'odd+11',
  },
  {
    path: '/within',
    element: <GuessDateDoomsday />,
    text: currentYear,
  },
  {
    path: '/within-modernity',
    element: <GuessDateDoomsdayInModernity />,
    text: 'modernity',
  },
  {
    path: '/step1',
    element: <StepOne />,
    text: 'step1',
    extra: true,
  },
  {
    path: '/year',
    element: <GuessYearDoomsday />,
    text: 'year',
    extra: true,
  },
  {
    path: '/full',
    element: <GuessFullDateV1 />,
    text: 'full',
    extra: true,
  },
  {
    path: '/progressive',
    element: <GuessProgressive />,
    text: 'progressive',
    extra: true,
  },
  {
    path: '/date-offset',
    element: <GuessOffsetForDate />,
    text: 'offset',
  },
];

const navLinks: Array<NavItem> = routeArray.map(({ end, extra, path, text }) => ({
  to: `${baseUrl}${path}`,
  end,
  extra,
  text,
}));

const AllPages = () => {
  return (
    <div className='flex flex-col'>
      <h2>GuessDateDoomsday</h2>
      <GuessDateDoomsday />
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
    <main className='flex max-w-full flex-col items-center justify-start bg-primary text-color'>
      <NavBar navItems={navLinks} />
      <div className='flex w-full max-w-full flex-col items-center justify-start sm:w-1/2 md:max-w-[1240px]'>
        <Routes>
          {routeArray.map((routeProps) => (
            <Route {...routeProps} key={routeProps.path} />
          ))}
          <Route path='/all' element={<AllPages />} />
        </Routes>
      </div>
    </main>
  );
};

export default Base;
