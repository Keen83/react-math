function Score(props) {

  const {correctAnswers, incorrectAnswers} = props;

  return (
    <div>Правильних відповідей: {correctAnswers}. Неправильних відповідей: {incorrectAnswers}</div>
  )
}

export default Score;