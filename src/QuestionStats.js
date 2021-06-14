import Timer from "./Timer";
import GameStateContext from "./GameStateContext";
import { useContext } from "react";

const QuestionStats = ({ timeLeft, points, questionNumber }) => {
  const { gameOptions } = useContext(GameStateContext);

  return (
    <div>
      <p>
        Question {questionNumber} / {gameOptions.amount}
      </p>
      <p>Points: {points}</p>
      <Timer timeLeft={timeLeft} />
    </div>
  );
};

export default QuestionStats;
