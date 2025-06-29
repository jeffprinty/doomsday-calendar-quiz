import { mnemonics } from '../mnemonics';

const MnemonicsTable = () => {
  return (
    <div>
      <div>
        <a href='https://en.wikipedia.org/wiki/Doomsday_rule#Memorable_dates_that_always_land_on_Doomsday'>
          wikipedia: Memorable Dates table
        </a>
      </div>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Doomsday</th>
            <th>Handle</th>
          </tr>
        </thead>
        <tbody>
          {mnemonics.map(({ common, leap, memeticHandle, monthName, monthNumber }) => (
            <tr key={monthName}>
              <td className=''>{monthName}</td>
              <td className=''>
                {monthNumber}/{common}
                {!!leap && (
                  <span className='px-4 text-violet-500'>
                    {monthNumber}/{leap}
                  </span>
                )}
              </td>
              <td>{memeticHandle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MnemonicsTable;
