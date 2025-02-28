export async function getExchangingRate() {
  try {
    const URL =
      "https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=USD&u4=KRW&u8=down&u2=1";
    const response = await fetch(URL);
    const jsonData = await response.json();
    return jsonData.country[1].value;
  } catch (error) {
    console.error("환율 데이터를 불러오는 중 오류 발생:", error);
  }
}
