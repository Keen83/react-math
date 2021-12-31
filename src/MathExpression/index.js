import Number from "./Number";
import MathSign from "./MathSign";
import EqualSign from "./EqualSign";
import ResultNumber from "./ResultNumber";
import TimeCounter from "./TimeCounter";
import Score from "./Score";
import { useCallback, useEffect, useState } from "react";
import React from 'react'
import useInterval from "../helpers/useInterval";
import useTimeout from "../helpers/useTimer";

function MathExpression() {
  // const signs = [ '+', '-' ];
  const countdownSecs = 10;
  const [ currentValue, setCurrentValue ] = useState({firstNumber: 0, secondNumber: 0, result: 0, sign: "+"});
  const [ answeredQuestionsCount, setAnsweredQuestionsCount ] = useState(-1);
  const [ resultValue, setResultValue ] = useState("");
  const [ correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [ incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
  const [ countdown, setCountdown ] = useState(10);
  const [interval, setIntervalState] = useState(1000); //this is what made possible to cancel
  const [timeout, setTimeoutState] = useState(10000); //this is what made possible to cancel

  const generateDataCallback = useCallback(generateData, []);
  const startNewRoundCallback = useCallback(startNewRound, [generateDataCallback]);
  
  useInterval(() => {
    setCountdown(countdown - 1);
  }, interval);

  useTimeout(() => {
    checkResult();
  }, timeout)

  useEffect(() => {
    startNewRoundCallback();
  }, [answeredQuestionsCount, startNewRoundCallback])

  function startNewRound() {
    setResultValue("");
    setCountdown(countdownSecs);
    generateDataCallback();
    
    setIntervalState(1000);
    setTimeoutState(countdownSecs * 1000);
  }

  const getRandomNumber =  (from, to) => {
    return Math.floor(Math.random() * 1000) % (to-from+1) + from;
  }

  const getSubtractionData = () => {
    const firstNumber = getRandomNumber(2, 10);
    const secondNumber = getRandomNumber(1, firstNumber - 1);
    const result = firstNumber - secondNumber;

    return {
      firstNumber: firstNumber,
      secondNumber: secondNumber,
      result: result,
      sign: "-"
    };
  }

  const getAdditionData = () => {
    const result = getRandomNumber(2, 10);// Math.floor(Math.random() * 1000 % 9 + 2);
    var firstNumber = getRandomNumber(1, result-1); // Math.floor(Math.random() * 1000 % result + 1);
    var secondNumber = result - firstNumber;
    
    return {
      firstNumber: firstNumber,
      secondNumber: secondNumber,
      result: result,
      sign: "+"
    };
  }

  function generateData() {
    // const res = getAdditionData();
    const res = getSubtractionData();
    setCurrentValue(res);
  }
  
  function checkResult() {
    setIntervalState(null);
    setTimeoutState(null);
    
    var res = parseInt(resultValue);
    if (res === currentValue.result)
      setCorrectAnswersCount(correctAnswersCount + 1);
    else 
      setIncorrectAnswersCount(incorrectAnswersCount + 1);

    setAnsweredQuestionsCount(answeredQuestionsCount + 1);
  }

  const handleCheckResult = () => {
    checkResult();
  };

  const handleInputChanged = (value) => {
    setResultValue(value);
  }
  
  return (
    <div>
      <Number value={currentValue.firstNumber} />
      <MathSign value={currentValue.sign}/>
      <Number value={currentValue.secondNumber}/>
      <EqualSign />
      <ResultNumber value={resultValue} checkResult={handleCheckResult} inputChanged={handleInputChanged} />
      <TimeCounter value={countdown} />
      <Score correctAnswers={correctAnswersCount} incorrectAnswers={incorrectAnswersCount}/>
    </div>
  )
}

export default MathExpression;