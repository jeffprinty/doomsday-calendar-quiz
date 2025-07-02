import { expect, test } from 'vitest';

import { getDoomsdayForYear } from '../dates';
import { doomsyearTable } from '../year';

for (const [year] of doomsyearTable) {
  test(`tests getDoomsdayForYear ${year}`, () => {
    expect(getDoomsdayForYear(year)).toMatchSnapshot();
  });
}
