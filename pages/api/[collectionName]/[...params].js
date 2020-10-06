import firebase from "../../../configuration/firebase";

//Used for urls with that have more than one query
//In our case: To receive multiple 'lotes' or 'pasturas' ids and process all the info

export default async (req, res) => {
  let result = [];

  const promises = req.query.params.map(async (loteId) => {
    const {
      docs: [doc],
    } = await firebase
      .collection(req.query.collectionName)
      .where("id", "==", loteId)
      .get();

    if (doc) {
      result.push({ data: doc.data() });
    }
  });

  Promise.all(promises).then(() => {
    return res.json(result);
  });
};
