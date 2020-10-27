// import firebase from "../../../configuration/firebase";

// async function getItems() {
//   return firebase
//     .collection("sessionsDetails")
//     .get()
//     .then(async (items) => {
//       return await getThingsForItems(items);
//     });
// }

// async function getThingsForItems(items) {
//   return Promise.all(
//     items.docs.map(async (element) => {
//       var things = [];

//       const response = await firebase
//         .collection("sessionsDetails")
//         .doc(element.id)
//         .collection("lotes")
//         .get();

//       response.forEach((subcollectionItem) => {
//         things.push(subcollectionItem.data());
//       });

//       console.log("getThingsForItems -> things", things);

//       return { Item: element.data(), Things: things };
//     })
//   );
// }

// export default async (req, res) => {
//   return getItems();
// };
