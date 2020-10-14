import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import DeleteIcon from "@material-ui/icons/Delete";
import firebase from "../../configuration/firebaseClientApp";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

export default function InfoModal(props) {
  const [open, setOpen] = React.useState(true);

  const onCloseModal = () => {
    setOpen(false);
    props.onCloseModal();
  };

  const removeItemFromArrayByDescription = async (
    attribute,
    descriptionToRemove
  ) => {
    let query = await firebase
      .firestore()
      .collection("sessionsDetails")
      .where("id", "==", props.sessionDetailsId);

    query.get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const snapshot = querySnapshot.docs[0];
        const documentRef = snapshot.ref;
        console.log("InfoModal -> documentRef", documentRef);
        const oldArray = snapshot.data()[attribute];
        const newArray = oldArray.filter(
          (item) => item !== descriptionToRemove
        );
        return documentRef.update({
          [attribute]: newArray,
        });
      } else {
        console.log("Lo sentimos. Hubo un error al eliminar la nota.");
      }
    });
  };

  async function deleteNote(note) {
    // alertService
    // .showConfirmDialog('¡Atención! Se eliminará esta nota. ')
    // .then(() => {
    //   firebaseService
    //     .removeItemFromArrayByDescription(docRef, 'notes', nota)
    //     .then(refresh);
    // });

    await removeItemFromArrayByDescription("notes", note);
  }

  const showNotes = () => {
    if (props.notes && props.notes.length > 0) {
      return props.notes.map((note, index) => {
        return (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p key={index}>
              {index + 1} - {note}
            </p>

            <DeleteIcon
              onClick={() => {
                deleteNote(note);
              }}
            />
          </div>
        );
      });
    } else {
      //TODO: Agregar un if para ver si hay alguna nota a nivel IMAGEN y mostrarlas aca haciendo referencia a que lote/pastura y numero de imagen corresponde. En caso de que no haya si mostrar que no hay ninguna
      return <p> La sesión no tiene ninguna nota.</p>;
    }
  };

  return (
    <div style={styles}>
      <Modal open={open} onClose={() => onCloseModal()} center>
        <h3>{props.title}</h3>
        {showNotes()}
      </Modal>
    </div>
  );
}
