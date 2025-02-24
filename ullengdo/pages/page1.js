async function getExchangingRate() {
  const response = await fetch(
    "https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=%ED%99%98%EC%9C%A8&where=m&u1=keb&u6=standardUnit&u7=0&u3=USD&u4=KRW&u8=down&u2=1"
  );
  const jsonData = await response.json();

  return jsonData.country[1].value;
}
