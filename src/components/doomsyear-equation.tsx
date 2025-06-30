import { commonStyles, step1, step2, step3, step4, step5 } from '../common';
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

  return (
    <div className='text-right'>
      <span className={commonStyles.year}>{yearPadded}</span> {yearIsOdd ? '+ 11 / 2' : '/ 2'} ={' '}
      <span className={step1}>{firstResult}</span>
      <br />
      {extraStep && (
        <>
          <span className={step1}>{firstResult}</span> + 11 ={' '}
          <span className={step2}>{secondResult}</span>
          <br />
        </>
      )}
      <span className={extraStep ? step2 : step1}>{secondResult}</span> % 7 ={' '}
      <span className={step3}>{moduloResult}</span>
      <br />7 - <span className={step3}>{moduloResult}</span> ={' '}
      <span className={step4}>{moduloFromSeven}</span>
      <br />
      <span className={step4}>{moduloFromSeven}</span> +{' '}
      <span className={step5}>{centuryAnchorDay}</span> ={' '}
      <span className=''>{moduloFromSeven + Number(centuryAnchorDay)}</span>
    </div>
  );
};
