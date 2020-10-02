import firebase from "../../../configuration/firebase";

export default (req, res) => {
  console.log("entro y el id es: ", req.query.id);
  firebase
    .collection("sessions")
    .doc(req.query.id)
    .get()
    .then((doc) => {
      console.log("doc", doc);
      res.json(doc.data());
    })
    .catch((error) => {
      res.json({ error });
    });
};
