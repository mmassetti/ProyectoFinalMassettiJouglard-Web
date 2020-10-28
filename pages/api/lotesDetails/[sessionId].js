import firebase from "../../../configuration/firebase";

export default async (req, res) => {
  let data = [];

  const sessionDetails = await firebase
    .collection("sessionsDetails")
    .doc(req.query.sessionId)
    .get();

  for (const lote of sessionDetails.data().lotes) {
    let lotesDetails = await firebase
      .collection("lotesDetails")
      .doc(lote.ref.id)
      .get();

    let pasturasData = [];
    for (const pastura of lotesDetails.data().pasturas) {
      let pasturasDetails = await firebase
        .collection("pasturasDetails")
        .doc(pastura.ref.id)
        .get();

      pasturasData.push(pasturasDetails.data());
    }

    data.push(
      Object.assign({
        // sessionData: sessionDetails.data(),
        loteData: lotesDetails.data(),
        pasturasData: pasturasData,
      })
    );
  }

  return res.json(data);
};