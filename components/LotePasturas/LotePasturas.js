import React from "react";
import PasturaInfo from "./PasturaInfo";

export default function LotePasturas({ pasturasData, onPasturaImageSelected }) {
  const lotesInfo = () => {
    pasturasData.sort(
      (dataA, dataB) =>
        new Date(dataB.data.creationDate._seconds * 1000).getTime() -
        new Date(dataA.data.creationDate._seconds * 1000).getTime()
    );
    if (pasturasData.length > 0) {
      return (
        <>
          {pasturasData.map((pastura) => (
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
