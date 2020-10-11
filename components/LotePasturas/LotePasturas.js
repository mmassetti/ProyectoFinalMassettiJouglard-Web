import React from "react";
import PasturaInfo from "./PasturaInfo";

export default function LotePasturas({ pasturas }) {
  const lotesInfo = () => {
    if (pasturas && pasturas.length > 0) {
      return (
        <>
          {pasturas.map((pastura) => (
            <PasturaInfo {...pastura.data} key={pastura.data.id} />
          ))}
        </>
      );
    } else {
      return <h5>El lote no tiene ninguna pastura</h5>;
    }
  };

  return <div>{lotesInfo()}</div>;
}
