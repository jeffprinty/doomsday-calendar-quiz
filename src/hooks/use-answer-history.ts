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
    const answerTime = dayjs();
    const interval = dayjs.duration(answerTime.diff(startTime));
    const intervalInSeconds = interval.asSeconds();
    if (intervalInSeconds) {
      setPastAnswers((previous) => [
        ...previous,
        [+answerTime, intervalInSeconds, isCorrect, answer],
      ]);
    }
  };
  return { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers, startTime };
};

export default useAnswerHistory;
