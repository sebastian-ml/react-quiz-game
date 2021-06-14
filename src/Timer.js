const Timer = ({ timeLeft }) => {
  return (
    <div className="timer">
      <svg className="timer__svg" width="200" height="200">
        <circle className="timer__circle" cx="100" cy="100" r="80" />
        <circle
          style={{ strokeDashoffset: 500 + timeLeft / 10 }}
          className="timer__line"
          cx="100"
          cy="100"
          r="80"
        />
      </svg>
      <span className="timer__time">{timeLeft / 1000}</span>
    </div>
  );
};

export default Timer;
