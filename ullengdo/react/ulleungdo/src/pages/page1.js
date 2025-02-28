import { useEffect, useState } from "react";
import "../App.css";
import "./page1.css";
import ulleungImage from "../libs/images/ulleung.jpg";
import { getExchangingRate } from "../api/exchangingRate";
import { getWeather } from "../api/weather";

export default function Page1() {
  const [exchangingRate, setExchangingRate] = useState(null);
  const [today, setToday] = useState(null);

  useEffect(() => {
    const now = new Date();
    const formattedDateList = now.toISOString().split("T"); // "YYYY-MM-DD" 형식으로 변환
    const formattedDate = formattedDateList[0];
    setToday(formattedDate);

    const exchangingRate = getExchangingRate();
    setExchangingRate(exchangingRate);

    const weather = getWeather("11");
    console.log(weather);
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
