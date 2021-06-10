import { useEffect, useState } from "react";

const Countdown = ({ time }) => {
  const [milliseconds, setMilliseconds] = useState(time);

  useEffect(() => {
    if (milliseconds > 0) {
      setTimeout(() => setMilliseconds(milliseconds - 1000), 1000);
    }
  });

  return <div className="countdown">{milliseconds / 1000}</div>;
};

export default Countdown;
