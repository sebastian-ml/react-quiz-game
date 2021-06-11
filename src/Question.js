const Question = ({ question, answers, handleAnswer }) => {
  return (
    <div className="question">
      <h2>{question}</h2>

      <ul className="question__answers">
        {answers.map((answer) => (
          <li key={answer} className="question__answer">
            <button
              onClick={handleAnswer}
              className="question__btn"
              value={answer}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
