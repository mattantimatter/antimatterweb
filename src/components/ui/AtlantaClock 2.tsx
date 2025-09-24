"use client";
import React from "react";

const ATL_TZ = "America/New_York";

function getAtlantaTimeParts(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: ATL_TZ,
  })
    .formatToParts(d)
    .reduce(
      (acc, part) => {
        if (part.type === "dayPeriod") acc.period = part.value; // AM/PM
        else if (part.type !== "literal") acc.time += part.value; // 04 23 15
        else acc.time += part.value; // include ":" separators
        return acc;
      },
      { time: "", period: "" }
    );

  return parts;
}

const AtlantaClock = () => {
  const [time, setTime] = React.useState<{
    time: string;
    period: string;
  } | null>(null);

  React.useEffect(() => {
    const tick = () => setTime(getAtlantaTimeParts());
    tick();

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <span>--:--:--</span>;

  return (
    <span>
      {time.time}
      <span className="text-xl align-bottom">{time.period}</span>
    </span>
  );
};

export default React.memo(AtlantaClock);
