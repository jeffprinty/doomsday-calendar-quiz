import { DateTime } from 'luxon';

import { getDoomsdayForYear } from '../common';

export const Home = () => {
  const now = DateTime.now();
  const doomsdayOnYear = getDoomsdayForYear(now.year).toFormat('cccc');
  return (
    <div>
      <h2>Welcome to my Doomsday Calendar Quiz app</h2>
      <p>Learn how to calculate the day of the week for any given date.</p>
      <p>
        We start with some knowledge before we practice the most useful trick: figuring out the day
        of the week for a date in the current year.
        <br />
        The current year is {now.year}, the doomsday for {now.year} is {doomsdayOnYear}. Later
        we&apos;ll learn how to calculate the doomsday for any given year, but for now, if you
        remember one thing, remember that the doomsday is {doomsdayOnYear}.
        <br />
        Then use the offset module to practice calculating the distance between days.
      </p>
    </div>
  );
};
