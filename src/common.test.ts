import { expect, test } from 'vitest';

import { betterDaysTable } from './common';

test('tests betterDaysTable', () => {
  expect(betterDaysTable()).toMatchSnapshot();
});
