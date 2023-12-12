import { React, useState, useEffect } from 'react'
import './styles.css'

export default function App () {
  const [display, setDisplay] = useState("0")
  const [fullDisplay, setFullDisplay] = useState("")
  const [result, setResult] = useState(false)
  const [sum, setSum] = useState("")
  const regex = new RegExp(/(\+|\-|\/|\*)$/);


  function handleClear () {
      setDisplay("0")
      setFullDisplay("")
  }

  function handleDecimal (event) {
    if(!display.includes(".")){
      setDisplay(prevState => prevState.concat("."))
      setFullDisplay(prevState => prevState.concat("."))
    }else {
      setFullDisplay(prevState => prevState)
    }
  }

  function handleResult (event) {
      setResult(true)
      const finalSum = eval(fullDisplay)
      setSum(finalSum)
      setDisplay(finalSum)
      setFullDisplay(prevState => prevState.concat("=" + finalSum))
  }

  function handleOperator (event) {
    const value = event.target.firstChild.data
    const regexMinus = new RegExp(/(\+|\-|\/|\*)\-$/)

    if(!result){
      if (regexMinus.test(fullDisplay)){
        setDisplay(value)
        setFullDisplay(prevState => prevState.replace(regexMinus, value))
      }else if (regex.test(display)) {
        setDisplay(value)
        if(value == "-") {
          setFullDisplay(prevState => prevState.concat(value))
        }
        else {
          setFullDisplay(prevState => prevState.replace(regex, value))
        }
      }else {
        setDisplay(value)
        setFullDisplay(prevState => prevState.concat(value))
      }
    }else{
      setDisplay(value)
      setFullDisplay(sum + value)
      setResult(false)
      setSum("")
    }
  }

  function handleNumbers (event) {
    const value = event.target.firstChild.data;
    if(!result){
      if(display.length == 1 && display[0] == "0"){
        setDisplay(value)
        setFullDisplay(value)
      }else if (regex.test(display) || display == "."){
          setDisplay(value)
          setFullDisplay(prevState => prevState.concat(value))
        }else {
          setDisplay(prevState => prevState.concat(value))
          setFullDisplay(prevState => prevState.concat(value))
        }
    }else {
      setDisplay(value)
      setFullDisplay(value)
      setSum("")
      setResult(false)
    }
  }

  return (
    <div className="calculator">
      <div className="display">
        <p className="full-display">
          {fullDisplay}
        </p>

        <p className="recent-display" id="display">
          {display}
        </p>
      </div>
      <div className="calculator-buttons">
        <button id="clear" onClick={handleClear}>AC</button>
        <button id="divide" className="operator" onClick={handleOperator}>/</button>
        <button id="multiply" className="operator" onClick={handleOperator}>*</button>
        <button id="seven" className="numbers" onClick={handleNumbers}>7</button>
        <button id="eight" className="numbers" onClick={handleNumbers}>8</button>
        <button id="nine" className="numbers" onClick={handleNumbers}>9</button>
        <button id="subtract" className="operator" onClick={handleOperator}>-</button>
        <button id="four" className="numbers" onClick={handleNumbers}>4</button>
        <button id="five" className="numbers" onClick={handleNumbers}>5</button>
        <button id="six" className="numbers" onClick={handleNumbers}>6</button>
        <button id="add" className="operator" onClick={handleOperator}>+</button>
        <button id="one" className="numbers" onClick={handleNumbers}>1</button>
        <button id="two" className="numbers" onClick={handleNumbers}>2</button>
        <button id="three" className="numbers" onClick={handleNumbers}>3</button>
        <button id="equals" onClick={handleResult}>=</button>
        <button id="zero" className="numbers" onClick={handleNumbers}>0</button>
        <button id="decimal" className="numbers" onClick={handleDecimal}>.</button>
      </div>
    </div>
  )
}