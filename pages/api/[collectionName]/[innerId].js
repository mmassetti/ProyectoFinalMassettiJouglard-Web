import firebase from "../../../configuration/firebase";

export default async (req, res) => {
  //TODO: Handle cuando no existe nada (por ej cuando elimino un lote viene a esta funcion una vez mas pero como el lote no existe tira error)
  const {
    docs: [doc],
  } = await firebase
    .collection(req.query.collectionName)
    .where("id", "==", req.query.innerId)
    .get();

  return res.json({
    docRef: doc.ref.id,
    data: doc.data(),
  });
};
