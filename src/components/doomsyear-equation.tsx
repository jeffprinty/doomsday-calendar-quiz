import { commonStyles } from '../common';
import { isOdd } from '../math/basic';
import { getAnchorDay } from '../math/century';
import { oddPlusElevenFull } from '../math/doomsyear-odd-plus-eleven';
import { splitYearIntoComponents } from '../math/year';

export const DoomsyearEquation = ({ fullYear }: { fullYear: number }) => {
  const [century, year] = splitYearIntoComponents(fullYear);
  const { firstResult, secondResult, moduloResult, moduloFromSeven } = oddPlusElevenFull(year);
  const yearPadded = year.toString().padStart(2, '0');
  const yearIsOdd = isOdd(year);
  const extraStep = firstResult !== secondResult;
  const centuryAnchorDay = getAnchorDay(century);
  const addedUp = moduloFromSeven + Number(centuryAnchorDay);
  return (
    <div className='text-right'>
      <span className={commonStyles.year}>{yearPadded}</span> {yearIsOdd ? '+ 11 / 2' : '/ 2'} ={' '}
      <span className={commonStyles.step1}>{firstResult}</span>
      <br />
      {extraStep && (
        <>
          <span className={commonStyles.step1}>{firstResult}</span> + 11 ={' '}
          <span className={commonStyles.step2}>{secondResult}</span>
          <br />
        </>
      )}
      <span className={extraStep ? commonStyles.step2 : commonStyles.step1}>{secondResult}</span> %
      7 = <span className={commonStyles.step3}>{moduloResult}</span>
      <br />7 - <span className={commonStyles.step3}>{moduloResult}</span> ={' '}
      <span className={commonStyles.step4}>{moduloFromSeven}</span>
      <br />
      <span className={commonStyles.step4}>{moduloFromSeven}</span> +{' '}
      <span className={commonStyles.step5}>{centuryAnchorDay}</span> ={' '}
      <span className=''>{addedUp}</span>
      {addedUp > 6 && (
        <>
          <br />
          <span className=''>
            {addedUp} % 7 = {addedUp % 7}
          </span>
        </>
      )}
    </div>
  );
};
