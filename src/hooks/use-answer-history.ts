import { useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import { PastAnswer } from '../common';

const useAnswerHistory = () => {
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();
  const [pastAnswers, setPastAnswers] = useState<Array<PastAnswer<Dayjs>>>([]);
  const [startTime, setStartTime] = useState<Dayjs>(dayjs());
  const onNewQuestion = () => {
    setStartTime(dayjs());
    setLastAnswerCorrect(undefined);
  };
  // TODO: Handle other kinds of answers
  const onAnswer = ({ answer, isCorrect }: { answer: Dayjs; isCorrect: boolean }) => {
    setLastAnswerCorrect(isCorrect);

    const interval = dayjs.duration(startTime.diff(dayjs()));
    const intervalInSeconds = interval.asSeconds();
    if (intervalInSeconds) {
      setPastAnswers((previous) => [...previous, [intervalInSeconds, isCorrect, answer]]);
    }
  };
  return { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers, startTime };
};

export default useAnswerHistory;
