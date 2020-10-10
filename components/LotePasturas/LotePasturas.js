import React from "react";
import PasturaInfo from "./PasturaInfo";

export default function LotePasturas({ pasturas, pasturasDetails }) {
  const lotesInfo = () => {
    if (pasturas && pasturas.length > 0) {
      return (
        <>
          {pasturas.map((pastura) => (
            <PasturaInfo {...pastura} key={pastura.id} />
          ))}
        </>
      );
    } else {
      return <h5>El lote no tiene ninguna pastura</h5>;
    }
  };

  return <div>{lotesInfo()}</div>;
}
