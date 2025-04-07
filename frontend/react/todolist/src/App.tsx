import React from "react";
import "./App.css";

// 주석문

function App() {
  const name = "React";
  const style = {
    backgroundColor: "skyblue",
    fontWeight: "bold",
    padding: "20px",
  };
  return (
    <div style={style} className="App-header">
      <p className="header-p">Hello {name === "React" ? <h1>yes</h1> : null}</p>
      {/* 주석문 */}
    </div>
  );
}

export default App;
