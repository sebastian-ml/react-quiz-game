import { useState } from "react";
import Header from "./Header";

const Start = () => {
  const [nickname, setNickname] = useState("Guest");
  const [gameOptions, setGameOptions] = useState({
    difficulty: "medium",
    amount: 10,
  });

  const handleSelect = (e) => {
    setGameOptions({ ...gameOptions, difficulty: e.target.value });
  };

  const handleInput = (e) => {
    setNickname(e.target.value);
  };

  const welcomeText =
    "Welcome! Enter your nickname and choose difficulty level";

  return (
    <>
      <Header text={welcomeText} />
      <div className="player-info">
        <div className="player-info__row">
          <label for="difficulty-level">Choose difficulty level: </label>
          <select
            value={gameOptions.difficulty}
            onChange={handleSelect}
            name="difficulty-level"
            id="difficulty-level"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="player-info__row">
          <label for="nick">Enter your nickname: </label>
          <input
            onChange={handleInput}
            type="text"
            id="nick"
            name="nick"
          ></input>
        </div>
        <div className="player-info__row">
          <button className="btn player-info__btn">Play!</button>
        </div>
      </div>
    </>
  );
};

export default Start;
