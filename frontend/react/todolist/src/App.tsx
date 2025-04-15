import "./App.css";
import Todolist from "./Todolist";
import Clock from "./Clock";
import MyWeather from "./MyWeather";
import "bootstrap/dist/css/bootstrap.min.css";

// 주석문

function App() {
  return (
    <div className="container">
      <Todolist />
      {/* <Clock /> */}
      <MyWeather weather="흐림" children="일기예보" />
    </div>
  );
}

export default App;
