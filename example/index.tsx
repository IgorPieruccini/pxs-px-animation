import { Stage } from "@inlet/react-pixi";
import React from "react";
import ReactDOM from "react-dom";
import { Example } from "./src/Example";

const App = () => {
  return (
    <Stage>
      <Example />
    </Stage>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
