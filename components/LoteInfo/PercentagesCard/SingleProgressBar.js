import React from "react";
import progressBarStyle from "./progressBarStyle";
import { CircularProgressbar } from "react-circular-progressbar";

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
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={progressBarStyle(color)}
      />
    </div>
  );
}
