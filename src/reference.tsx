import { doomsyearTable } from './common';
import LongCalendar from './components/long-calendar';

const doomsyearColorCode = [
  'text-red-400',
  'text-yellow-400',
  'text-green-400',
  'text-blue-400',
  'text-indigo-400',
  'text-purple-400',
  'text-pink-400',
];

const Reference = () => {
  return (
    <div id='page__reference' className='flex w-full flex-col'>
      <div className=''>Other reference</div>
      <div className='long stuff flex w-full grid-cols-2 flex-row justify-around'>
        <div className=''>
          {doomsyearTable.map(([year, doomsyear]) => (
            <div className='' key={year}>
              {year}: <span className={doomsyearColorCode[doomsyear]}>{doomsyear}</span>
            </div>
          ))}
        </div>
        <div className='max-w-1/3'>
          <LongCalendar />
        </div>
      </div>
    </div>
  );
};

export default Reference;
