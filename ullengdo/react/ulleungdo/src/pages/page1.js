import { useEffect, useState } from "react";
import "../App.css";
import "./page1.css";
import ulleungImage from "../libs/images/ulleung.jpg";
import { getExchangingRate } from "../api/exchangingRate";
import { getWeather } from "../api/weather";
import {
  pty,
  ptyImage,
  sky,
  skyImage,
  weatherEnum,
  vecDir,
} from "../enum/weather-enum";

export default function Page1() {
  const [today, setToday] = useState(null);
  const [exchangingRate, setExchangingRate] = useState(null);
  const [weather, setWeather] = useState(new Map());

  useEffect(() => {
    const fetchData = async () => {
      // 날짜
      const now = new Date();
      const year = now.toISOString().substring(0, 4);
      const month = now.toISOString().substring(5, 7);
      const day = now.toISOString().substring(8, 10);

      const formattedDate = year + "-" + month + "-" + day;
      setToday(formattedDate);

      // 환율
      const exchangingRate = await getExchangingRate();
      setExchangingRate(exchangingRate);

      // 날씨
      const weatherData = await getWeather(year + month + day);
      const mainW = weatherData.get("PTY");
      const subW = weatherData.get("SKY");
      var weatherDetail = pty[mainW];
      var weatherImgSrc = ptyImage[mainW];
      if (weatherDetail === 0) {
        weatherDetail = sky[subW];
        weatherImgSrc = skyImage[subW];
      }
      const windDir = Math.floor(
        (parseInt(weatherData.get("VEC")) + 11.25) / 22.5
      );

      weatherData.set("weatherDetail", weatherDetail);
      weatherData.set("weatherImgSrc", weatherImgSrc);
      weatherData.set("windDir", vecDir[windDir]);

      setWeather(weatherData);
    };

    fetchData();
  }, []);

  return (
    <div className="scroll-area">
      <div className="page1-image-container">
        <img alt="" className="page1-image" src={ulleungImage} />
        <p className="page1-image-title">신비의 섬 울릉도</p>
      </div>
      <div className="page1-container">
        <div className="exchanging-rate">
          <p style={{ fontSize: "25px", marginBottom: "30px" }}>환율</p>
          <p style={{ fontSize: "18px", marginBottom: "10px" }}>
            환율: {exchangingRate}원 (1USD)
          </p>
          <p>기준: {today}</p>
        </div>
        <div className="weather">
          <p style={{ fontSize: "25px", marginBottom: "10px" }}>날씨</p>
          <div className="weather-inside">
            <img
              alt=""
              class="weather-img"
              src={weather.get("weatherImgSrc")}
            />
            <p
              style={{
                fontSize: "25px",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              {weather.get("weatherDetail")}
            </p>
            <p>
              {weatherEnum.T1H}: {weather.get("T1H")}도 &nbsp;&nbsp;{" "}
              {weatherEnum.REH}: {weather.get("REH")}% &nbsp;&nbsp;{" "}
              {weather.get("windDir")}: {weather.get("WSD")}m/s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
