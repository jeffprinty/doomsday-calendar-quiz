import { expect, test } from 'vitest';

import { getDoomsdayForYearNew } from '../dates';
import { doomsyearTable } from '../year';

for (const [year] of doomsyearTable) {
  test(`tests getDoomsdayForYearNew ${year}`, () => {
    expect(getDoomsdayForYearNew(year)).toMatchSnapshot();
    // expect(getDoomsdayForYearNew(year)).toEqual(getDoomsdayForYear(year))
  });
}
