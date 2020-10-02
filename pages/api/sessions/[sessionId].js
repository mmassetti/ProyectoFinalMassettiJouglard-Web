import firebase from "../../../configuration/firebase";

export default (req, res) => {
  firebase
    .collection("sessions")
    .doc(req.query.sessionId)
    .get()
    .then((doc) => {
      res.json(doc.data());
    })
    .catch((error) => {
      res.json({ error });
    });
};
