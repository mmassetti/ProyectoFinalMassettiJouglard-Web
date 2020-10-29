import firebase from "../configuration/firebaseClientApp";

function getDocRefFromId(collectionName, id) {
  return firebase.firestore().collection(collectionName).doc(id);
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

async function removeItemFromArray(docRef, attribute, idToRemove) {
  const response = await docRef.get();
  const oldArray = response.data()[attribute];
  const newArray = oldArray.filter((item) => item.id !== idToRemove);
  return docRef.update({
    [attribute]: newArray,
  });
}

async function remove(sessionRef, attribute, detailsCollection, id) {
  await removeItemFromArray(sessionRef, attribute, id);
  const { docRef } = await getDocRefInnerId(detailsCollection, id);
  await docRef.delete();
}

export async function removeItemFromArrayByDescription(
  attribute,
  collectionName,
  detailId,
  descriptionToRemove
) {
  let detail = await firebase
    .firestore()
    .collection(collectionName)
    .doc(detailId)
    .get();

  const documentRef = detail.ref;
  const oldArray = detail.data()[attribute];
  const newArray = oldArray.filter((item) => item !== descriptionToRemove);

  return documentRef.update({
    [attribute]: newArray,
  });
}

export async function editItemFromArrayByDescription(
  attribute,
  collectionName,
  detailId,
  oldDescription,
  newDescription
) {
  let detail = await firebase
    .firestore()
    .collection(collectionName)
    .doc(detailId)
    .get();

  const documentRef = detail.ref;
  const oldArray = detail.data()[attribute];
  let newArray = [];
  oldArray.map((note, index) => {
    if (note === oldDescription) {
      newArray.push(newDescription);
    } else {
      newArray.push(note);
    }
  });

  return documentRef.update({
    [attribute]: newArray,
  });
}

export async function deleteSession(sessionId) {
  await getDocRefFromId("sessions", sessionId).delete();

  let lotesIds = [];

  //Elimino lotes y pasturas
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

    let lotesIdsArray = [];
    lotesIds.map(async (lote) => {
      lotesIdsArray.push(lote.id);

      const loteDetails = await getDocRefInnerId("lotesDetails", lote.id);

      const pasturas = loteDetails.data.pasturas;

      deleteInBatch(
        pasturas.map((pastura) => pastura.id),
        "pasturasDetails"
      );
    });

    await deleteInBatch(lotesIdsArray, "lotesDetails");
  }
}

export async function deleteLote(detailDocRef, loteId, pasturasDetails) {
  const docRef = getDocRefFromId("sessionsDetails", detailDocRef);

  if (pasturasDetails.data) {
    //1 sola pastura
    deleteInBatch([pasturasDetails.data.id], "pasturasDetails");
  } else if (pasturasDetails.length > 1) {
    deleteInBatch(
      pasturasDetails.map((pastura) => pastura.data.id),
      "pasturasDetails"
    );
  }
  await remove(docRef, "lotes", "lotesDetails", loteId);
}

export async function deletePastura(loteInnerId, pasturaId) {
  const lote = await getDocRefInnerId("lotesDetails", loteInnerId);
  await remove(lote.docRef, "pasturas", "pasturasDetails", pasturaId);
}

export async function deleteNoteFromImage(
  loteInnerId,
  note,
  imageId,
  imageNumberInArray
) {
  const lote = await getDocRefInnerId("lotesDetails", loteInnerId);
  const image = lote.data.images[imageNumberInArray];

  if (image.before.id === imageId && note === image.before.note) {
    image.before.note = "";
  } else if (
    image.after &&
    image.after.id == imageId &&
    note === image.after.note
  ) {
    image.after.note = "";
  }

  return lote.docRef.update({
    images: lote.data.images,
  });
}

export async function updateSession(sessionId, sessionDetailId, newData) {
  const session = await getDocRefFromId("sessions", sessionId).get();
  const sessionDetail = await getDocRefFromId(
    "sessionsDetails",
    sessionDetailId
  ).get();

  sessionDetail.ref.update({
    description: newData,
  });

  return session.ref.update({
    description: newData,
  });
}

export async function updateLote(loteDetailId, newData) {
  const loteDetail = await getDocRefFromId("lotesDetails", loteDetailId).get();

  loteDetail.ref.update({
    description: newData,
  });
}
