
import React, { useState, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";

import "./styles.css";

// Keeps track of all created functions during the app's life
const functions = new Set();

const App = () => {
  const [delta, setDelta] = useState(1);
  const [c, setC] = useState(0);
  const [sinC, setSinC] = useState(0);

  const incrementDelta = useCallback(() => setDelta(delta => delta + 1), []);
  const increment = useCallback(() => setC(c => c + delta), [delta]);

  // Can depend on other useCallback-wrapped functions
  const incrementBoth = useCallback(() => {
    incrementDelta();
    increment();
  }, [increment, incrementDelta]);

  // This value will not be recomputed between re-renders
  // unless the value of c changes
  // Notice that it operates though it is never called
  const sinOfC = useMemo(() => setSinC(Math.sin(c)), [c]);
  

  // Register the functions so we can count them
  functions.add(incrementDelta);
  functions.add(increment);

  return (
    <div>
      <div> Delta is {delta} </div>
      <div> Counter is {c} </div>
      <div> Sin of Counter is {sinC} </div>
      <br />
      <div>
        <Button onClick={incrementDelta}>Increment Delta</Button>
        <Button onClick={increment}>Increment Counter</Button>
        <Button onClick={incrementBoth}>Increment Both</Button>
      </div>
      <br />
      <div> Newly Created Functions: {functions.size - 2} </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
