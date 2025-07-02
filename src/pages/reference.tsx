import { allSevens } from '../common';
import LongCalendar from '../components/long-calendar';
import MnemonicsTable from '../components/mnemonics-table';
import { doomsyearTable } from '../math/year';
import EquationsModule from '../modules/equations';

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
      <div className='flex w-full flex-col items-center py-4'>
        <h3>All Sevens</h3>
        <div className='flex w-full flex-row items-center justify-around'>
          {allSevens.map((seven) => (
            <span key={seven}>{seven}</span>
          ))}
        </div>
      </div>
      <div className='flex w-full flex-col items-center px-2 py-2'>
        <div className='text-center'>Month Mnemonics</div>
        <MnemonicsTable />
      </div>
      <div className='flex max-h-full w-full flex-col items-center overflow-y-auto py-4'>
        <EquationsModule />
      </div>
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
