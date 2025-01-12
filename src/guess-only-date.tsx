import React, { useState } from 'react';

import { getRandomDateInYear } from './common';
import Button from './components/button';
import OffsetGuesser from './components/offset-guesser';

const GuessOnlyDate = ({ auto }: { auto?: boolean }) => {
  const initRandomDateWithinYear = getRandomDateInYear(2025);
  // const initRandomDateWithinYear = DateTime.fromObject({
  //   year: 2025,
  //   month: 4,
  //   day: 4
  // });

  const [guessingDate, setGuessingDate] = useState(initRandomDateWithinYear);

  // const [startTime, setStartTime] = useState<DateTime>(DateTime.now());

  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();
  const [selected, setSelected] = useState<boolean>(false);
  console.log('lastAnswerCorrect', lastAnswerCorrect);

  const handleAnswer = (isCorrect: boolean) => {
    setLastAnswerCorrect(isCorrect);
    setSelected(true);
    if (auto) {
      setTimeout(() => {
        getNewGuess();
      }, 1000);
    }
  };

  const getNewGuess = () => {
    setGuessingDate(getRandomDateInYear(2025));
    setLastAnswerCorrect(undefined);
    setSelected(false);
  };

  return (
    <div id='page__guess-only-date' className='w-full'>
      <OffsetGuesser
        indicate={auto && selected}
        onAnswer={handleAnswer}
        guessingDate={guessingDate}
        key={guessingDate.toISO()}
      />
      <Button onClick={getNewGuess} className='my-2 h-16 w-full'>
        Random Date
      </Button>
    </div>
  );
};

export default GuessOnlyDate;
