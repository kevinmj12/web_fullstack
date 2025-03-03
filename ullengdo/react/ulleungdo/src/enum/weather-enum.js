import cloud from "../libs/images/weather/cloud.png";
import cloudy from "../libs/images/weather/cloudy.png";
import rain from "../libs/images/weather/rain.png";
import snow from "../libs/images/weather/snow.png";
import sunny from "../libs/images/weather/sunny.png";

export const weatherEnum = {
  LGT: "낙뢰",
  PTY: "강수형태", // 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
  RN1: "1시간 강수량",
  SKY: "구름", // 맑음(1) 구름많음(3) 흐림(4)
  T1H: "기온",
  REH: "습도",
  UUU: "동서바람성분",
  VVV: "남북바람성분",
  VEC: "풍향",
  WSD: "풍속",
};

export const pty = {
  // 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
  0: "없음",
  1: "비",
  2: "비/눈",
  3: "눈",
  5: "빗방울",
  6: "빗방울눈날림",
  7: "눈날림",
};

export const ptyImage = {
  // 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
  0: sunny,
  1: rain,
  2: snow,
  3: snow,
  5: rain,
  6: snow,
  7: snow,
};

export const sky = {
  // 맑음(1) 구름많음(3) 흐림(4)
  1: "맑음",
  3: "구름많음",
  4: "흐림",
};

export const skyImage = {
  // 맑음(1) 구름많음(3) 흐림(4)
  1: sunny,
  3: cloud,
  4: cloudy,
};

export const vecDir = {
  0: "북풍",
  1: "북동풍",
  2: "북동풍",
  3: "북동풍",
  4: "동풍",
  5: "남동풍",
  6: "남동풍",
  7: "남동풍",
  8: "남풍",
  9: "남서풍",
  10: "남서풍",
  11: "남서풍",
  12: "서풍",
  13: "북서풍",
  14: "북서풍",
  15: "북서풍",
  16: "북풍",
};
