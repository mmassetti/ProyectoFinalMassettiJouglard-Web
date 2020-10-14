import React from "react";
import PasturaInfo from "./PasturaInfo";

export default function LotePasturas({ pasturas, onPasturaImageSelected }) {
  const lotesInfo = () => {
    if (pasturas && pasturas.length > 0) {
      console.log("lotesInfo -> pasturas", pasturas);
      //ordeno de pastura mas nuevo a pastura mas vieja
      pasturas.sort(
        (a, b) =>
          new Date(b.data.creationDate._seconds * 1000).getTime() -
          new Date(a.data.creationDate._seconds * 1000).getTime()
      );
      return (
        <>
          {pasturas.map((pastura) => (
            <PasturaInfo
              {...pastura.data}
              key={pastura.data.id}
              onPasturaImageSelected={onPasturaImageSelected}
            />
          ))}
        </>
      );
    } else {
      return <h5>El lote no tiene ninguna pastura.</h5>;
    }
  };

  return <div>{lotesInfo()}</div>;
}
