import useCountdown from "./useCountdown";

const GameStartCountdown = ({ time }) => {
  const animationCounter = time / 1000;
  const animationCssName = "countdown-animation";

  const { timeLeft } = useCountdown(time);

  return (
    <div
      className="countdown"
      style={{ animation: `${animationCssName} 1s ${animationCounter}` }}
    >
      {timeLeft / 1000}
    </div>
  );
};

export default GameStartCountdown;
