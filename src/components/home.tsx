import { ReactNode } from 'react';

import { DateTime } from 'luxon';

import { getDoomsdayForYear } from '../math/year';
import ExternalLink from './external-link';
import MnemonicsTable from './mnemonics-table';

const BlockQuote = ({ children }: { children: ReactNode }) => (
  <blockquote className='my-4 border-s-4 border-gray-500 bg-gray-800 p-4'>
    <p className='text-md font-medium leading-relaxed text-white'>{children}</p>
  </blockquote>
);

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
export const Home = () => {
  const now = DateTime.now();
  const doomsdayOnYear = getDoomsdayForYear(now.year).toFormat('cccc');
  return (
    <div>
      <h2>Welcome to my Doomsday Calendar Quiz app</h2>
      <p>Learn how to calculate the day of the week for any given date.</p>
      <BlockQuote>
        The Doomsday rule is an algorithm of determination of the day of the week for a given date.
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
        The current year is {now.year}, the doomsday for {now.year} is{' '}
        <span className='text-green-400'>{doomsdayOnYear}</span>. Later we&apos;ll learn how to
        calculate the doomsday for any given year, but for now, if you remember one thing, remember
        that the doomsday for the current year is{' '}
        <span className='text-green-400'>{doomsdayOnYear}</span>.
        <br />
        Then use the offset module to practice calculating the distance between days.
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
