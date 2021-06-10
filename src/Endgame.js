import { useContext } from "react";
import Header from "./Header";
import GameStatusContext from "./GameStatusContext";

const Endgame = ({ score, totalQuestionsNumber }) => {
  const { nickname, setGameStatus } = useContext(GameStatusContext);

  const playAgain = () => {
    setGameStatus("start");
  };

  return (
    <>
      <Header text={"The end!"} />
      <h2>Congratulations {nickname}! You finished the game!</h2>
      <p>
        Your score: {score} / {totalQuestionsNumber}
      </p>
      <button onClick={playAgain} className="btn">
        Play again!
      </button>
    </>
  );
};

export default Endgame;
