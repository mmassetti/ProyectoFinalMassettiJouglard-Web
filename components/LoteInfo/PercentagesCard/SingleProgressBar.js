import React from "react";
import progressBarStyle from "./progressBarStyle";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

export default function SingleProgressBar(props) {
  const { percentage, color, isAverage } = props;

  return (
    <div
      style={{
        width: 110,
        height: 110,
        marginBottom: 30,
        marginRight: 10,
      }}
    >
      <CircularProgressbarWithChildren
        value={percentage}
        styles={progressBarStyle(color)}
      >
        <div
          style={{
            ...(isAverage ? { fontSize: 18 } : { fontSize: 22 }),
            marginTop: -15,
            color: `#${color}`,
          }}
        >
          <strong>{`${percentage}%`}</strong>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
