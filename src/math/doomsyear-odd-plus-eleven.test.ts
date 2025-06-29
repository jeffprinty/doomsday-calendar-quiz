import { expect, test } from 'vitest';

import { doomsyearTable } from '../common';
import oddPlusEleven, { oddPlusElevenFull } from './doomsyear-odd-plus-eleven';

for (const [year, result] of doomsyearTable) {
  test(`tests oddPlusEleven for ${year}`, () => {
    expect(oddPlusEleven(year - 2000)).toBe(result);
  });
}
for (const [year] of doomsyearTable) {
  test(`tests oddPlusElevenFull for ${year}`, () => {
    expect(oddPlusElevenFull(year - 2000)).toMatchSnapshot();
  });
}
