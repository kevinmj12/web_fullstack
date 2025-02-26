import { FullPage, Slide } from "react-full-page";
import React from "react";
import "./App.css";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";

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
        <div className="scroll-area">
          <div className="page3-container">
            <p className="page3-title">다양한 먹거리</p>
            <div className="card-container">
              {/*  오징어  */}
              <div class="card">
                {/* <img class="card-img" src="./libs/images/squid.png" /> */}
                <div className="card-txt">
                  <p className="card-name">오징어</p>
                  <p className="card-description">오징어</p>
                </div>
              </div>
              {/* 독도새우 */}
              <div className="card">
                {/* <img class="card-img" src="./libs/images/shrimp.jpg" /> */}
                <div className="card-txt">
                  <p className="card-name">독도새우</p>
                  <p className="card-description">독도새우</p>
                </div>
              </div>

              {/* 약소소 */}
              <div className="card">
                {/* <img class="card-img" src="./libs/images/beef.png" /> */}
                <div className="card-txt">
                  <p className="card-name">약소</p>
                  <p className="card-description">약소</p>
                </div>
              </div>
              {/* 산채 정식식 */}
              <div className="card">
                {/* <img class="card-img" src="./libs/images/sanchae.jpg" /> */}
                <div className="card-txt">
                  <p className="card-name">산채 정식</p>
                  <p className="card-description">산채 정식</p>
                </div>
              </div>
              {/* 호박엿 */}
              <div className="card">
                {/* <img class="card-img" src="./libs/images/pumpkin.jpg" /> */}
                <div className="card-txt">
                  <p className="card-name">호박엿</p>
                  <p className="card-description">호박엿</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </FullPage>
  );
}

export default App;
