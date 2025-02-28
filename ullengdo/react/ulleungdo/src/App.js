import { FullPage, Slide } from "react-full-page";
import React from "react";
import "./App.css";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";
import Page3 from "./pages/page3";

function App() {
  return (
    <FullPage>
      <Slide>
        <Page1 />
      </Slide>
      <Slide>
        <Page2 />
      </Slide>
      <Slide>
        <Page3 />
      </Slide>
    </FullPage>
  );
}

export default App;
