import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import StudentsProvider from "./context/StudentsProvider";

ReactDOM.render(
  <StudentsProvider>
    <App />
  </StudentsProvider>,
  document.getElementById("root")
);
