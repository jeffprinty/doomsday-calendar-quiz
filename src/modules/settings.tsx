import { useState } from 'react';

import dayjs from 'dayjs';

import RadioGroup, { RadioGroupItem } from '../components/radio-group';
import ToggleSwitch from '../components/toggle-switch';
import useLocale, { AvailableLocales } from '../hooks/use-locale';
import { formatFullDateWithWeekday } from '../math/dates';

const localeOptions: Array<RadioGroupItem<AvailableLocales>> = [
  { label: 'US: Month Day, Year', value: 'en', id: 'en' },
  { label: 'Intl: Day Month, Year', value: 'en-gb', id: 'en-gb' },
];

const Settings = () => {
  const now = dayjs();
  const [locale, setLocale] = useLocale();
  const [toggled, setToggled] = useState(false);

  return (
    <div className='date-stuff flex flex-col'>
      <RadioGroup<AvailableLocales>
        items={localeOptions}
        onChange={(value) => setLocale(value)}
        value={locale}
        name='choose-locale'
      />
      <div className=''>
        Date Format Example:
        <br />
        {formatFullDateWithWeekday(now)}
        {dayjs(now).format('l')}
      </div>
      <div>
        <ToggleSwitch
          checked={toggled}
          label='Toggle Switch'
          onClick={() => setToggled(!toggled)}
        />
      </div>
    </div>
  );
};

export default Settings;
