// import firebase from "../../../configuration/firebase";

// export default async (req, res) => {
//   let result = [];

//   let collectionRef = firebase.collection("sessionsDetails");

//   let documents = await collectionRef.get();

//   documents.forEach(async (doc) => {
//     // console.log("Parent Document ID: ", doc.id);
//     let subCollectionDocs = await collectionRef
//       .doc(doc.id)
//       .collection("sessionsDetails")
//       .get();
//     subCollectionDocs.forEach((subCollectionDoc) => {
//       console.log("subCollectionDoc", subCollectionDoc);
//       subCollectionDoc.forEach((doc) => {
//         // console.log("doc", doc);
//         // console.log("Sub Document ID: ", doc.id);
//       });
//     });
//   });

//   return res.json(result);
// };
