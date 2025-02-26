import { useEffect, useState } from "react";
import "../App.css";
import "./page1.css";
import ulleungImage from "../libs/images/ulleung.jpg";

export default function Page1() {
  const [exchangingRate, setExchangingRate] = useState(null);
  const [today, setToday] = useState(null);

  useEffect(() => {
    async function getExchangingRate() {
      try {
        const response = await fetch(
          "https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=USD&u4=KRW&u8=down&u2=1"
        );
        const jsonData = await response.json();
        setExchangingRate(jsonData.country[1].value);
      } catch (error) {
        console.error("환율 데이터를 불러오는 중 오류 발생:", error);
      }
    }
    getExchangingRate();

    const now = new Date();
    const formattedDateList = now.toISOString().split("T"); // "YYYY-MM-DD" 형식으로 변환
    const formattedDate = formattedDateList[0];
    setToday(formattedDate);
  }, []);

  return (
    <div className="scroll-area">
      <div className="page1-image-container">
        <img alt="" className="page1-image" src={ulleungImage} />
        <p className="page1-image-title">신비의 섬 울릉도</p>
      </div>
      <div id="page1-container">
        <p style={{ fontSize: "25px", marginBottom: "30px" }}>환율</p>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          환율: {exchangingRate}원 (1USD)
        </p>
        <p>기준: {today}</p>
      </div>
    </div>
  );
}
