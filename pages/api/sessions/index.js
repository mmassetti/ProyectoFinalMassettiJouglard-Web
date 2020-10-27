import firebase from "../../../configuration/firebase";

export default async (req, res) => {
  let data = [];

  const sessions = await firebase
    .collection("sessions")
    .orderBy("date", "desc")
    .get();

  for (const session of sessions.docs) {
    let sessionDetail = await session.data().ref.get();

    data.push(
      Object.assign(
        {
          id: sessionDetail.id,
          sessionDetailRef: sessionDetail.ref,
          sessionRef: session.ref,
        },
        sessionDetail.data()
      )
    );
  }

  return res.json(data);
};
