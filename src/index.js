import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";

import "./styles.css";

// Keeps track of all created functions during the app's life
const functions = new Set();

const App = () => {
  const [delta, setDelta] = useState(1);
  const [c, setC] = useState(0);

  const incrementDelta = () => setDelta(delta => delta + 1);
  const increment = () => setC(c => c + delta);

  // Register the functions so we can count them
  functions.add(incrementDelta);
  functions.add(increment);

  return (
    <div>
      <div> Delta is {delta} </div>
      <div> Counter is {c} </div>
      <br />
      <div>
        <Button onClick={incrementDelta}>Increment Delta</Button>
        <Button onClick={increment}>Increment Counter</Button>
      </div>
      <br />
      <div> Newly Created Functions: {functions.size - 2} </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
