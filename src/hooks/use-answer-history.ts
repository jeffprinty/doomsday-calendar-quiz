import { useState } from 'react';

import { DateTime, Interval } from 'luxon';

import { PastAnswer } from '../common';

const useAnswerHistory = () => {
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();
  const [pastAnswers, setPastAnswers] = useState<Array<PastAnswer<DateTime>>>([]);
  const [startTime, setStartTime] = useState<DateTime>(DateTime.now());
  const onNewQuestion = () => {
    setStartTime(DateTime.now());
    setLastAnswerCorrect(undefined);
  };
  // TODO: Handle other kinds of answers
  const onAnswer = (answerValue: DateTime, answerCorrect: boolean) => {
    setLastAnswerCorrect(answerCorrect);

    const interval = Interval.fromDateTimes(startTime, DateTime.now());
    const intervalInSeconds = interval.length('seconds');
    if (intervalInSeconds) {
      setPastAnswers((previous) => [...previous, [intervalInSeconds, answerCorrect, answerValue]]);
    }
  };
  return { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers, startTime };
};

export default useAnswerHistory;
