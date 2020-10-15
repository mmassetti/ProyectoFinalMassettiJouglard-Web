import React from "react";
import PasturaInfo from "./PasturaInfo";

export default function LotePasturas({ pasturas, onPasturaImageSelected }) {
  const lotesInfo = () => {
    if (pasturas) {
      if (pasturas.data) {
        //El lote tiene una sola pastura (viene un objeto) //todo: refactor api
        return (
          <PasturaInfo
            {...pasturas.data}
            key={pasturas.data.id}
            onPasturaImageSelected={onPasturaImageSelected}
          />
        );
      } else if (pasturas.length > 0) {
        //El lote tiene mas de una pastura
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
    }
  };

  return <div>{lotesInfo()}</div>;
}
