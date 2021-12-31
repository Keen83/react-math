function ResultNumber(props) {

  const handleChange = (e) => {
    console.log(e.target.value);
    props.inputChanged(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log("Enter pressed");
      props.checkResult();
    }
    
  }

  return (
    <div>
      <input value={props.value} onChange={handleChange} onKeyDown={handleKeyDown} autoFocus ></input>
    </div>
  )
}

export default ResultNumber;