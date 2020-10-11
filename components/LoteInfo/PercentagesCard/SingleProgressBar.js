import React from "react";
import progressBarStyle from "./progressBarStyle";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

export default function SingleProgressBar(props) {
  const { percentage, color } = props;

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
        // value={66}
        value={percentage}
        // text={`${percentage}%`}
        styles={progressBarStyle(color)}
      >
        <div style={{ fontSize: 22, marginTop: -5, color: `#${color}` }}>
          <strong>{`${percentage}%`}</strong>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
