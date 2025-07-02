import { expect, test } from 'vitest';

import { getDateFromMonthMnemonic, getDoomsdayForYear } from '../dates';
import { mnemonics } from '../month-doomsdays';
import { doomsyearTable } from '../year';

for (const [year] of doomsyearTable) {
  test(`tests getDoomsdayForYear ${year}`, () => {
    expect(getDoomsdayForYear(year)).toMatchSnapshot();
  });
  for (const mnemonic of mnemonics) {
    test(`tests getDateFromMonthMnemonic ${year} ${mnemonic.monthName}`, () => {
      expect(getDateFromMonthMnemonic(mnemonic, year)).toMatchSnapshot();
    });
  }
}
