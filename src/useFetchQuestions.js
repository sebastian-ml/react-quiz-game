import { useState, useEffect } from "react";

const useFetchQuestions = (gameOptions) => {
  const [questions, setQuestions] = useState([]);
  const [fetchCompleted, setFetchCompleted] = useState(false);

  const baseUrl = "https://opentdb.com/api.php?";
  const apiParameters = Object.keys(gameOptions)
    .map((option) => `${option}=${gameOptions[option]}`)
    .join("&");
  const urlWithParameters = baseUrl + apiParameters;

  useEffect(() => {
    fetch(urlWithParameters)
      .then((response) => {
        if (!response.ok) throw Error("Error");

        return response.json();
      })
      .then((data) => {
        setQuestions(data.results);
        setFetchCompleted(true);
      })
      .catch((e) => console.log("Ops something went wrong", e.message));
  }, [urlWithParameters]);

  return { questions, fetchCompleted, setQuestions };
};

export default useFetchQuestions;
