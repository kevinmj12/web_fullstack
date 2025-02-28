import "../App.css";
import "./page3.css";
import squid from "../libs/images/squid.png";
import shrimp from "../libs/images/shrimp.jpg";
import beef from "../libs/images/beef.png";
import sanchae from "../libs/images/sanchae.jpg";
import pumpkin from "../libs/images/pumpkin.jpg";

export default function Page2() {
  return (
    <div className="scroll-area">
      <div className="page3-container">
        <p className="page3-title">다양한 먹거리</p>
        <div className="card-container">
          {/*  오징어  */}
          <div class="card">
            <img alt="" class="card-img" src={squid} />
            <div className="card-txt">
              <p className="card-name">오징어</p>
              <p className="card-description">오징어</p>
            </div>
          </div>
          {/* 독도새우 */}
          <div className="card">
            <img alt="" class="card-img" src={shrimp} />
            <div className="card-txt">
              <p className="card-name">독도새우</p>
              <p className="card-description">독도새우</p>
            </div>
          </div>

          {/* 약소 */}
          <div className="card">
            <img alt="" class="card-img" src={beef} />
            <div className="card-txt">
              <p className="card-name">약소</p>
              <p className="card-description">약소</p>
            </div>
          </div>
          {/* 산채 정식 */}
          <div className="card">
            <img alt="" class="card-img" src={sanchae} />
            <div className="card-txt">
              <p className="card-name">산채 정식</p>
              <p className="card-description">산채 정식</p>
            </div>
          </div>
          {/* 호박엿 */}
          <div className="card">
            <img alt="" class="card-img" src={pumpkin} />
            <div className="card-txt">
              <p className="card-name">호박엿</p>
              <p className="card-description">호박엿</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
