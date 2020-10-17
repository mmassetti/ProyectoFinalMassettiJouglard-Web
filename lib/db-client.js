import firebase from "../configuration/firebaseClientApp";

export async function deleteSession(sessionId) {
  await firebase.firestore().collection("sessions").doc(sessionId).delete();

  let lotesIds = [];

  await firebase
    .firestore()
    .collection("sessionsDetails")
    .where("id", "==", sessionId)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        lotesIds.push(doc.data().lotes);
        doc.ref.delete();
      });
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  if (lotesIds.length > 0) {
    lotesIds = lotesIds[0];
    await deleteInBatch(
      lotesIds.map((lote) => lote.id),
      "lotesDetails"
    );
  }

  //TODO: Falta eliminar las pasturas
}

async function deleteInBatch(arrayOfIds, detailsCollection) {
  const batch = firebase.firestore().batch();
  const allArrays = [];
  for (let i = 0; i < arrayOfIds.length; i += 10) {
    allArrays.push(
      firebase
        .firestore()
        .collection(detailsCollection)
        .where("id", "in", arrayOfIds.slice(i, i + 10))
        .get()
    );
  }
  const allDocs = await Promise.all(allArrays);
  const flattenArray = [].concat(...allDocs.map((response) => response.docs));

  const docsRefs = flattenArray.map((doc) =>
    firebase.firestore().collection(detailsCollection).doc(doc.id)
  );
  for (const ref of docsRefs) {
    batch.delete(ref);
  }
  return batch.commit();
}
