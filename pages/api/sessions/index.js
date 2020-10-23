import firebase from "../../../configuration/firebase";

export default async (req, res) => {
  let data = [];

  await firebase
    .collection("sessionsDetails")
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        data.push(
          Object.assign(
            {
              id: doc.id,
            },
            doc.data()
          )
        );
      });
    })
    .catch((error) => {
      res.json({ error });
    });

  return res.json(data);
};
