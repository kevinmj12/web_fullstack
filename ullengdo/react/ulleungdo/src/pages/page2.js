import "../App.css";
import "./page2.css";
import scubaDiving from "../libs/images/scuba_diving.jpeg";
import cruise from "../libs/images/cruise.png";

export default function Page2() {
  return (
    <div className="scroll-area">
      <div className="page2-container">
        <p className="page2-title">아름다운 바다</p>
        <div className="card-container">
          {/*  스쿠버다이빙 */}
          <div className="card">
            <a
              href="https://www.ulleung.go.kr/tour/page.do?mnu_uid=1656&"
              target="blank"
            >
              <img alt="" className="card-img" src={scubaDiving} />
              <div className="card-txt">
                <p className="card-name">스쿠버다이빙</p>
                <p className="card-description">스쿠버다이빙</p>
              </div>
            </a>
          </div>
          {/* 해상관광 */}
          <div className="card">
            <a
              href="https://www.ulleung.go.kr/tour/page.do?mnu_uid=1650&"
              target="blank"
            >
              <img alt="" className="card-img" src={cruise} />
              <div className="card-txt">
                <p className="card-name">해상관광</p>
                <p className="card-description">해상관광</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
