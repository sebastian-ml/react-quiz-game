import { useEffect, useState, useContext } from "react";
import Countdown from "./Countdown";
import useFetchQuestions from "./useFetchQuestions";
import Question from "./Question";
import Endgame from "./Endgame";

const Quiz = ({ gameOptions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [quizReady, setQuizReady] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [points, setPoints] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);

  const { questions, setQuestions, fetchComplete } =
    useFetchQuestions(gameOptions);

  const timeToStartGame = 3000;

  useEffect(() => {
    setTimeout(() => setQuizReady(true), timeToStartGame);
  }, []);

  useEffect(() => {
    console.log(gameOptions.amount);
    if (!fetchComplete) return;

    if (questions.length > 0) {
      setCurrentQuestion(questions[0]);
    } else {
      setCurrentQuestion(null);
      setGameEnd(true);
    }
  }, [fetchComplete, questions]);

  const updateQuestions = () => {
    const questionsCopy = [...questions];
    questionsCopy.shift();

    setQuestions(questionsCopy);
  };

  const handleAnswer = (e) => {
    const isAnswerCorrect = e.target.value === currentQuestion.correct_answer;

    if (isAnswerCorrect) setPoints(points + 1);
    updateQuestions();
    setQuestionNumber(questionNumber + 1);
  };

  return (
    <>
      {!quizReady && <Countdown time={timeToStartGame} />}
      {quizReady && currentQuestion !== null && (
        <>
          <div>
            Question {questionNumber} / {gameOptions.amount}
          </div>
          <div>Points: {points}</div>
          <Question question={currentQuestion} handleAnswer={handleAnswer} />
        </>
      )}
      {gameEnd && (
        <Endgame score={points} totalQuestionsNumber={gameOptions.amount} />
      )}
    </>
  );
};

export default Quiz;
