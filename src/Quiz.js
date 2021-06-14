import { useEffect, useState } from "react";
import GameStartCountdown from "./GameStartCountdown";
import useFetchQuestions from "./useFetchQuestions";
import Question from "./Question";
import Endgame from "./Endgame";
import useCountdown from "./useCountdown";
import QuestionStats from "./QuestionStats";

const Quiz = ({ gameOptions }) => {
  const timeBeforeGameStart = 3000;
  const timeForAnswer = 5000;

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionAnswers, setQuestionAnswers] = useState(null);
  const [quizReady, setQuizReady] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [points, setPoints] = useState(0);

  const { questions, setQuestions, fetchCompleted } =
    useFetchQuestions(gameOptions);
  const { timeLeft, setTimeLeft } = useCountdown(timeForAnswer);

  useEffect(() => {
    setTimeout(() => {
      setQuizReady(true);
      setTimeLeft(timeForAnswer);
    }, timeBeforeGameStart);
  }, []);

  useEffect(() => {
    if (!fetchCompleted) return;

    if (questions.length > 0) {
      const shuffledAnswers = shuffleAnswers(questions[0]);

      setCurrentQuestion(questions[0]);
      setQuestionAnswers(shuffledAnswers);
    } else {
      setCurrentQuestion(null);
      setQuestionAnswers(null);
      setGameEnd(true);
    }
  }, [fetchCompleted, questions]);

  useEffect(() => {
    if (timeLeft === 0 && currentQuestion != null) updateQuestions();
  }, [timeLeft]);

  const shuffleAnswers = (question) => {
    const answers = [question.correct_answer, ...question.incorrect_answers];

    return answers.sort(() => Math.random() - 0.5);
  };

  const updateQuestions = () => {
    const questionsCopy = [...questions];
    questionsCopy.shift();

    setTimeLeft(timeForAnswer);
    setQuestions(questionsCopy);
  };

  const handleAnswer = (e) => {
    const isAnswerCorrect = e.target.value === currentQuestion.correct_answer;
    if (isAnswerCorrect) setPoints(points + 1);

    updateQuestions();
  };

  return (
    <>
      {!quizReady && <GameStartCountdown time={timeBeforeGameStart} />}
      {quizReady && currentQuestion !== null && (
        <>
          <QuestionStats
            timeLeft={timeLeft}
            points={points}
            questionNumber={gameOptions.amount - questions.length + 1}
          />
          <Question
            question={currentQuestion.question}
            answers={questionAnswers}
            handleAnswer={handleAnswer}
          />
        </>
      )}
      {gameEnd && <Endgame score={points} />}
    </>
  );
};

export default Quiz;
