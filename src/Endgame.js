import { useContext } from "react";
import Header from "./Header";
import GameStateContext from "./GameStateContext";

const Endgame = ({ score }) => {
  const { nickname, setGameStatus, gameOptions } = useContext(GameStateContext);

  const playAgain = () => {
    setGameStatus("start");
  };

  return (
    <>
      <Header text={"The end!"} />
      <h2>Congratulations {nickname}! You finished the game!</h2>
      <p>
        Your score: {score} / {gameOptions.amount}
      </p>
      <button onClick={playAgain} className="btn">
        Play again!
      </button>
    </>
  );
};

export default Endgame;
