import { formatYearlessDate, getDateFromMonthMnemonic } from '../math/dates';
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
          {mnemonics.map((mnemonic) => {
            const { leap, memeticHandle, monthName } = mnemonic;
            return (
              <tr key={monthName}>
                <td className=''>{monthName}</td>
                <td className=''>
                  {formatYearlessDate(getDateFromMonthMnemonic(mnemonic, 2025))}
                  {!!leap && (
                    <span className='px-4 text-violet-500'>
                      {formatYearlessDate(getDateFromMonthMnemonic(mnemonic, 2024))}
                    </span>
                  )}
                </td>
                <td>{memeticHandle}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MnemonicsTable;
