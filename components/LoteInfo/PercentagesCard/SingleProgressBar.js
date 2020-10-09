import React from "react";
import progressBarStyle from "./progressBarStyle";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

export default function SingleProgressBar(props) {
  const { percentage, color } = props;
  console.log("SingleProgressBar -> color", color);

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
        {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
        {/* <img
          style={{ width: 40, marginTop: -5 }}
          src="https://i.imgur.com/b9NyUGm.png"
          alt="doge"
        /> */}
        <div style={{ fontSize: 22, marginTop: -5, color: `#${color}` }}>
          <strong>{`${percentage}%`}</strong>
        </div>
      </CircularProgressbarWithChildren>
      {/* <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={progressBarStyle(color)}
      /> */}
    </div>
  );
}
