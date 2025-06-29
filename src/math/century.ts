import { Weekday } from './weekdays';

export type AnchorDayCentury = '18' | '19' | '20' | '21';

export interface CenturyAnchor {
  century: number;
  centuryFull: number;
  anchorDay: number;
  anchorWeekday: Weekday;
}

export const centuryAnchors: Array<CenturyAnchor> = [
  {
    century: 16,
    centuryFull: 1600,
    anchorDay: 2,
    anchorWeekday: 'Tue',
  },
  {
    century: 17,
    centuryFull: 1700,
    anchorDay: 0,
    anchorWeekday: 'Sun',
  },
  {
    century: 18,
    centuryFull: 1800,
    anchorDay: 5,
    anchorWeekday: 'Fri',
  },
  {
    century: 19,
    centuryFull: 1900,
    anchorDay: 3,
    anchorWeekday: 'Wed',
  },
  {
    century: 20,
    centuryFull: 2000,
    anchorDay: 2,
    anchorWeekday: 'Tue',
  },
  {
    century: 21,
    centuryFull: 2100,
    anchorDay: 0,
    anchorWeekday: 'Sun',
  },
];

export const anchorDays = {
  '18': 5,
  '19': 3,
  '20': 2,
  '21': 0,
};

export const getAnchorDayForCentury = (century: AnchorDayCentury) => {
  return anchorDays[century];
};

export const getAnchorDay = (century?: number) => {
  if (century === 19) {
    return 3;
  }
  if (century === 20) {
    return 2;
  }
};
