import axios from "axios";

export async function getWeather(today) {
  try {
    const URL =
      "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst";
    const serviceKey = process.env.REACT_APP_WEATHER_DECODING_KEY;

    const params = {
      serviceKey: serviceKey,
      pageNo: 1,
      numOfRows: 1000,
      dataType: "JSON",
      base_date: today,
      base_time: "0600",
      nx: 127,
      ny: 127,
    };
    const response = await axios.get(URL, { params: params });
    const weatherData = response.data.response.body.items.item;
    var rtn = new Map();

    weatherData.forEach((element) => {
      if (element.fcstTime === "0900") {
        rtn.set(element.category, element.fcstValue);
      }
    });

    return rtn;
  } catch (err) {
    console.error("기상 데이터를 불러오는 중 오류 발생:", err);
  }
}
