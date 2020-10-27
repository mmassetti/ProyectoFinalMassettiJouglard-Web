import React from "react";
import PasturaInfo from "./PasturaInfo";

export default function LotePasturas({ pasturas, onPasturaImageSelected }) {
  const lotesInfo = () => {
    pasturas.sort(
      (a, b) =>
        new Date(b.creationDate._seconds * 1000).getTime() -
        new Date(a.creationDate._seconds * 1000).getTime()
    );
    if (pasturas.length > 0) {
      return (
        <>
          {pasturas.map((pastura) => (
            <PasturaInfo
              {...pastura}
              key={pastura.id}
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
