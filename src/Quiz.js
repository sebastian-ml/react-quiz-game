import { useEffect, useState } from "react";
import Timer from "./Timer";
import Countdown from "./Countdown";
import useFetchQuestions from "./useFetchQuestions";
import Question from "./Question";
import Endgame from "./Endgame";
import useCountdown from "./useCountdown";

const Quiz = ({ gameOptions }) => {
  const timeToStartGame = 3000;
  const timeForAnswer = 5000;

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionAnswers, setQuestionAnswers] = useState(null);
  const [quizReady, setQuizReady] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [points, setPoints] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);

  const { questions, setQuestions, fetchComplete } =
    useFetchQuestions(gameOptions);
  const { timeLeft, setTimeLeft } = useCountdown(timeForAnswer);

  useEffect(() => {
    setTimeout(() => {
      setQuizReady(true);
      setTimeLeft(timeForAnswer);
    }, timeToStartGame);
  }, []);

  useEffect(() => {
    if (!fetchComplete) return;

    if (questions.length > 0) {
      const shuffledAnswers = shuffleAnswers(questions[0]);

      setCurrentQuestion(questions[0]);
      setQuestionAnswers(shuffledAnswers);
    } else {
      setCurrentQuestion(null);
      setQuestionAnswers(null);
      setGameEnd(true);
    }
  }, [fetchComplete, questions]);

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
    setQuestionNumber(questionNumber + 1);
  };

  const handleAnswer = (e) => {
    const isAnswerCorrect = e.target.value === currentQuestion.correct_answer;
    if (isAnswerCorrect) setPoints(points + 1);

    updateQuestions();
  };

  return (
    <>
      {!quizReady && <Countdown time={timeToStartGame} />}
      {quizReady && currentQuestion !== null && (
        <>
          <div>
            <p>
              Question {questionNumber} / {gameOptions.amount}
            </p>
            <p>Points: {points}</p>
            <p>Time left: {timeLeft / 1000}</p>
          </div>
          <Question
            question={currentQuestion.question}
            answers={questionAnswers}
            handleAnswer={handleAnswer}
          />
        </>
      )}
      {gameEnd && (
        <Endgame score={points} totalQuestionsNumber={gameOptions.amount} />
      )}
    </>
  );
};

export default Quiz;
