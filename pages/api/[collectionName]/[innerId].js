import firebase from "../../../configuration/firebase";

export default async (req, res) => {
  console.log("req", req.query);
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
