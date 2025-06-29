const oddPlusEleven = (twoDigitYear: number) => {
  let result: number = twoDigitYear;
  // 1.
  const yearIsOdd = twoDigitYear % 2 !== 0;
  if (yearIsOdd) {
    result = twoDigitYear + 11;
  }
  // 2.
  result = result / 2;

  // 3.
  if (result % 2 !== 0) {
    result = result + 11;
  }

  // 4.
  result = result % 7;

  if (result === 0) {
    return 0;
  }

  // 5.
  result = 7 - result;

  /*
  const firstResult = yearIsOdd ? (twoDigitYear + 11) / 2 : twoDigitYear / 2;
  const firstResultIsOdd = firstResult % 2 !== 0;

  const secondResult = firstResultIsOdd ? firstResult / 2 : firstResult + 11;
  const secondResultIsOdd = secondResult % 2 !== 0;
  const thirdResult = secondResult + 11;

  const beforeModulo = secondResultIsOdd ? thirdResult : secondResult;

  const afterModulo = beforeModulo % 7;
  const moduloFromSeven = afterModulo === 0 ? 0 : 7 - afterModulo;
  console.log(`${twoDigitYear} ${yearIsOdd ? '/ 2' : '+ 11'} = ${firstResult}`);
  console.log(`${firstResult} ${firstResultIsOdd ? '/ 2' : '+ 11'} = ${secondResult}`);
  if (secondResultIsOdd) {
    console.log(`${secondResult} + 11 = ${thirdResult}`);
  }
  console.log(`${beforeModulo} % 7 = ${afterModulo}`);
  console.log(`7 - ${afterModulo} = ${moduloFromSeven}`)
  */
  return result;
};

export const oddPlusElevenFull = (twoDigitYear: number) => {
  const yearIsEven = twoDigitYear % 2 === 0;
  const firstResult = yearIsEven ? twoDigitYear / 2 : (twoDigitYear + 11) / 2;
  const firstResultIsEven = firstResult % 2 === 0;
  const secondResult = firstResultIsEven ? firstResult : firstResult + 11;
  const moduloResult = secondResult % 7;
  const moduloFromSeven = moduloResult === 0 ? 0 : 7 - moduloResult;
  return {
    firstResult,
    secondResult,
    moduloResult,
    moduloFromSeven,
  };
};

export default oddPlusEleven;
