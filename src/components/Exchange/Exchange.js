import { useRef, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Exchange.module.css";

// Component takes string of given format for currencies pair, fetches to api
// and returns result of conversion
const ExchangeComponent = () => {
  const errorText = "Enter valid Pair of Currencies (example: 1.3 USD to RUB)";
  const input = useRef();
  const [result, setResult] = useState();
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // focus and blur handlers are for input error-state styling
  const inputFocusHandler = (event) => {
    setIsFocused(true);
  };

  const inputBlurHandler = (event) => {
    setIsFocused(false);
  };

  // entered value validation based on RegEx pattern
  const inputChangeHandler = (event) => {
    const value = event.target.value;
    const isMatch = value.match(/(\d*\.?,?\d*\s[A-Z]{3}\sto\s[A-Z]{3}(?!.))/gi);
    if (isMatch) {
      setIsValid(true);
      setError(null);
    } else {
      setIsValid(false);
      setResult(null);
    }
  };

  // fetching to api and getting the conversion result as response
  const submitHandler = (e) => {
    e.preventDefault();
    setError(null);
    if (isValid) {
      let text = input.current.value.toString();
      const resultAmount = text.match(/(\d*\.?,?\d*)/);
      const amount = resultAmount[0].replace(/,/g, ".");
      amount <= 0 && setError(errorText);
      const resultCur = text.match(/([A-Z]{3})/gi);
      const fromCur = resultCur[0];
      const toCur = resultCur[1];

      const url = `https://api.exchangerate.host/convert?from=${fromCur}&to=${toCur}&amount=${amount}`;

      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Response error");
          }
          return res.json();
        })
        .then((data) => {
          data.result ? setResult(data.result) : setError(errorText);
          return;
        })
        .catch((err) => setError(err.message));
    } else {
      setError(errorText);
    }
  };

  return (
    <section
      className={`${classes.exchange} ${
        (error || !isValid) && isFocused && classes.invalid
      }`}
    >
      <Card>
        <form onSubmit={submitHandler}>
          <label htmlFor="curr">Enter currencies pair</label>
          <input
            type="text"
            id="curr"
            placeholder="example: 1.2 USD to EUR"
            ref={input}
            onChange={inputChangeHandler}
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
          />
          <button type="submit">Get Result</button>
        </form>
        <div className={classes.result}>
          Result:
          {error && <p className={classes.error}>{error}</p>}
          {result && !error && <p>{result}</p>}
        </div>
      </Card>
    </section>
  );
};

export default ExchangeComponent;
