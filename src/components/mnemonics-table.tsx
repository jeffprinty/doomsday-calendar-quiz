import { mnemonics } from '../math/month-doomsdays';

const MnemonicsTable = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Doomsday</th>
            <th>Memetic Handle</th>
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
