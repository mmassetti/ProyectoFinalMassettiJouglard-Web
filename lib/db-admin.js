import firebase from "../configuration/firebase";

export async function getAllSessions() {
  let data = [];

  await firebase
    .collection("sessions")
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
      return { error };
    });

  return data;
}

export async function getSessionDetails(sessionId) {
  const {
    docs: [doc],
  } = await firebase
    .collection("sessionsDetails")
    .where("id", "==", sessionId)
    .get();

  return {
    docRef: doc.ref.id,
    data: doc.data(),
  };
}
