import Start from "./Start";
import Quiz from "./Quiz";
import { useState } from "react";
import GameStateContext from "./GameStateContext";

function App() {
  const [gameStatus, setGameStatus] = useState("start");
  const [nickname, setNickname] = useState("Guest");
  const [gameOptions, setGameOptions] = useState({
    difficulty: "medium",
    amount: 10,
  });

  return (
    <div className="App">
      <GameStateContext.Provider
        value={{
          gameStatus,
          setGameStatus,
          nickname,
          setNickname,
          gameOptions,
          setGameOptions,
        }}
      >
        <div className="table">
          {gameStatus === "start" && <Start />}
          {gameStatus === "quiz" && <Quiz gameOptions={gameOptions} />}
        </div>
      </GameStateContext.Provider>
    </div>
  );
}

export default App;
