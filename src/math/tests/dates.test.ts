import { expect, test } from 'vitest';

import { getDayjsDoomsdayForYear } from '../dates';
import { doomsyearTable } from '../year';

for (const [year] of doomsyearTable) {
  test(`tests getDayjsDoomsdayForYear ${year}`, () => {
    expect(getDayjsDoomsdayForYear(year)).toMatchSnapshot();
    // expect(getDayjsDoomsdayForYear(year)).toEqual(getDoomsdayForYear(year))
  });
}
