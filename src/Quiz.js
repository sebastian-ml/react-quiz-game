import { useEffect, useState } from "react";
import Countdown from "./Countdown";

const Quiz = ({ gameOptions }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [quizReady, setQuizReady] = useState(false);

  const timeToStartGame = 3000;
  const baseUrl = "https://opentdb.com/api.php?";
  const apiParameters = Object.keys(gameOptions)
    .map((option) => `${option}=${gameOptions[option]}`)
    .join("&");

  const urlWithParameters = baseUrl + apiParameters;

  useEffect(() => {
    setTimeout(() => setQuizReady(true), timeToStartGame);

    fetch(urlWithParameters)
      .then((response) => {
        if (!response.ok) throw Error("Error");

        return response.json();
      })
      .then((data) => {
        setQuestions(data.results);
      })
      .catch((e) => console.log("Ops something went wrong", e.message));
  }, []);

  useEffect(() => {
    questions.length > 0
      ? setCurrentQuestion(questions[0])
      : setCurrentQuestion(null);
  }, [questions]);

  return (
    <>
      {!quizReady && <Countdown time={timeToStartGame} />}
      {quizReady && currentQuestion !== null && (
        <div className="question">
          <h2>{currentQuestion.question}</h2>
        </div>
      )}
    </>
  );
};

export default Quiz;
