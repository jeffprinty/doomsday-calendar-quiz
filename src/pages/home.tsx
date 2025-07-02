import { ReactNode } from 'react';

import ExternalLink from '../components/external-link';
import MnemonicsTable from '../components/mnemonics-table';
import { getDoomsdayFullWeekdayForYear } from '../math/dates';

const BlockQuote = ({
  attribution,
  children,
}: {
  attribution?: ReactNode;
  children: ReactNode;
}) => (
  <blockquote className='my-4 border-s-4 border-gray-500 bg-gray-800 p-4'>
    <p className='text-md font-medium leading-relaxed text-white'>{children}</p>
    {attribution && <p className='text-md pt-4 font-medium text-white'>- {attribution}</p>}
  </blockquote>
);

const pageContainer = 'p-4 md-p-0';

const links = [
  {
    href: 'https://en.wikipedia.org/wiki/Doomsday_rule',
    title: 'Doomsday rule (wikipedia)',
  },
  {
    href: 'https://en.wikipedia.org/wiki/Doomsday_rule#Memorable_dates_that_always_land_on_Doomsday',
    title: 'Doomsday rule - Memorable Dates Table (wikipedia)',
  },
  {
    href: 'https://mattbaker.blog/2020/04/26/mental-math-and-calendar-calculations/',
    title: 'Mental Math and Calendar Calculations - Matt Bakers Math Blog',
  },
  {
    href: 'https://ww2.amstat.org/mam/2014/calendar/doomsday.html',
    title: 'What Day is Doomsday? John H Conway describes the method',
  },
  {
    href: 'https://www.youtube.com/watch?v=z2x3SSBVGJU',
    title: 'The Doomsday Algorithm - Numberphile',
  },
  {
    href: 'https://arxiv.org/abs/1010.0765',
    title: "Methods for Accelerating Conway's Doomsday Algorithm",
  },
];
const Home = () => {
  const currentYear = new Date().getFullYear();
  const doomsdayOnYear = getDoomsdayFullWeekdayForYear(currentYear);
  return (
    <div className={pageContainer}>
      <h2>Welcome to my Doomsday Calendar Quiz app</h2>
      <p>Learn how to calculate the day of the week for any given date.</p>
      <BlockQuote attribution='Wikipedia'>
        The Doomsday rule is an algorithm for determining of the day of the week for a given date.
        It provides a perpetual calendar because the Gregorian calendar moves in cycles of 400
        years. The algorithm for mental calculation was devised by John Conway in 1973, drawing
        inspiration from Lewis Carroll&apos;s perpetual calendar algorithm. It takes advantage of
        each year having a certain day of the week upon which certain easy-to-remember dates, called
        the doomsdays, fall.
      </BlockQuote>
      <p>
        We start with some knowledge before we practice the most useful trick: figuring out the day
        of the week for a date in the current year.
        <br />
        The current year is {currentYear}, the doomsday for {currentYear} is{' '}
        <span className='text-green-400'>{doomsdayOnYear}</span>. Later we&apos;ll learn how to
        calculate the doomsday for any given year, but for now, if you remember one thing, remember
        that the doomsday for the current year is{' '}
        <span className='text-green-400'>{doomsdayOnYear}</span>.
        <br />
      </p>
      <p>
        The next thing to commit to memory is the doomsdays throughout the year. The doomsdays in a
        year all fall on the same weekday. Below you&apos;ll find a table of the doomsdays for each
        month as well as memetic handles you can use to help you associate each month with its
        doomsday
      </p>
      <div className='explainer py-4'>
        <MnemonicsTable />
      </div>
      <div className='links'>
        Useful links for learning about the algorithm
        <ul>
          {links.map(({ href, title }) => (
            <li key={href}>
              <ExternalLink href={href}>{title}</ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
