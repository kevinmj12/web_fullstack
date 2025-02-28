import axios from "axios";

export async function getWeather(today) {
  try {
    const URL =
      "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
    const serviceKey = process.env.REACT_APP_WEATHER_DECODING_KEY;
    const date = "20250228";
    const params = {
      serviceKey: serviceKey,
      pageNo: 1,
      numOfRows: 1000,
      dataType: "JSON",
      base_date: date,
      base_time: "0600",
      nx: 127,
      ny: 127,
    };
    await axios.get(URL, { params: params }).then((res) => {
      console.log(res.data);
      return res.data;
    });
  } catch (err) {
    console.error("기상 데이터를 불러오는 중 오류 발생:", err);
  }
}
