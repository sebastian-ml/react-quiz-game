import Start from "./Start";
import Quiz from "./Quiz";
import Endgame from "./Endgame";
import Loading from "./Loading";
import { useState } from "react";
import GameStatusContext from "./GameStatusContext";

function App() {
  const [gameStatus, setGameStatus] = useState("start");
  const [nickname, setNickname] = useState("Guest");
  const [gameOptions, setGameOptions] = useState({
    difficulty: "medium",
    amount: 10,
  });

  return (
    <div className="App">
      <GameStatusContext.Provider
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
          {gameStatus === "quiz" && <Quiz />}
          {gameStatus === "endgame" && <Endgame />}
          {gameStatus === "loading" && <Loading />}
        </div>
      </GameStatusContext.Provider>
    </div>
  );
}

export default App;
