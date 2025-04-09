import { useState } from "react";

{
  /* <h2>타이머: {time}초</h2>
<button
  onClick={() => {
    setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  }}
>
  시작
</button> */
}

const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  setInterval(() => {
    setTime(new Date());
  }, 1000);

  return <div>현재 시간: {time.toLocaleTimeString()}</div>;
};

export default Clock;
