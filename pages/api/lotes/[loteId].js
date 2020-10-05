import firebase from "../../../configuration/firebase";

export default (req, res) => {
  let lotesDetailsRef = firebase.collection("lotesDetails");
  let queryLotesDetails = lotesDetailsRef
    .where("id", "==", req.query.loteId)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("No matching LotesDetails.");
        return res.json([]);
      }
      let infoArray = [];

      snapshot.forEach((doc) => {
        infoArray.push(doc.data());
      });
      return res.json(infoArray);
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });
};
