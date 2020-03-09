import React from "react";
import Game from "./Game";
import { render } from "react-dom";

const App = () => {
  return <Game />;
};

render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
