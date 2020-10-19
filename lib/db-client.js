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

async function removeItemFromArrayById(
  docRefId,
  collectionName,
  attribute,
  idToRemove
) {
  let docRef = firebase.firestore().collection(collectionName).doc(docRefId);
  docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        const oldArray = doc.data()[attribute];
        const newArray = oldArray.filter((item) => item.id !== idToRemove);
        return docRef.update({
          [attribute]: newArray,
        });
      } else {
        console.log(
          "No such document! idToRemove: " +
            idToRemove +
            "- collectionName: " +
            collectionName
        );
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}

export async function removeItemFromArrayByDescription(
  attribute,
  collectionName,
  detailId,
  descriptionToRemove
) {
  let query = firebase
    .firestore()
    .collection(collectionName)
    .where("id", "==", detailId);

  query.get().then((querySnapshot) => {
    if (!querySnapshot.empty) {
      const snapshot = querySnapshot.docs[0];
      const documentRef = snapshot.ref;
      const oldArray = snapshot.data()[attribute];
      const newArray = oldArray.filter((item) => item !== descriptionToRemove);

      return documentRef.update({
        [attribute]: newArray,
      });
    } else {
      console.log("Lo sentimos. Hubo un error al eliminar la nota.");
    }
  });
}

async function getDocRefInnerId(collectionName, innerId) {
  return firebase
    .firestore()
    .collection(collectionName)
    .where("id", "==", innerId)
    .get()
    .then(({ docs: [doc] }) => {
      return {
        docRef: doc.ref,
        data: doc.data(),
      };
    });
}

async function remove(sessionRef, attribute, detailsCollection, id) {
  const removeFromArray = await removeItemFromArrayById(
    sessionRef,
    "sessionsDetails",
    attribute,
    id
  );
  const { docRef } = await getDocRefInnerId(detailsCollection, id);
  const removeFromCollection = await docRef.delete();

  // return this.withSpinner(
  //   this.generatePromise(removeFromArray, removeFromCollection)
  // );
}

export async function deleteLote(detailDocRef, loteId, pasturasDetails) {
  if (pasturasDetails.data) {
    //1 sola pastura
    deleteInBatch([pasturasDetails.data.id], "pasturasDetails");
  } else if (pasturasDetails.length > 1) {
    deleteInBatch(
      pasturasDetails.map((pastura) => pastura.data.id),
      "pasturasDetails"
    );
  }
  remove(detailDocRef, "lotes", "lotesDetails", loteId).then(
    console.log("Lote eliminado- I hope")
  );
}
