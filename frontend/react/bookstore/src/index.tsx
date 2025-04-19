import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { state, ThemeContext } from "./components/context/ThemeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeContext.Provider value={state}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeContext.Provider>
);
