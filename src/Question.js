const Question = ({ question, handleAnswer }) => {
  const answers = [question.correct_answer, ...question.incorrect_answers];
  const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

  return (
    <div className="question">
      <h2>{question.question}</h2>

      <ul className="question__answers">
        {shuffledAnswers.map((answer) => (
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
