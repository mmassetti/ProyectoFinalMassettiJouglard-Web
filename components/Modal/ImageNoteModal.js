import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteNoteFromImage } from "../../lib/db-client";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

export default function ImageNoteModal(props) {
  const [open, setOpen] = React.useState(true);

  const onCloseModal = () => {
    setOpen(false);
    props.onCloseModal();
  };

  async function deleteNote(note, imageId) {
    onCloseModal();

    return confirmAlert({
      title: "Eliminar nota",
      message: "¡Atención! Se eliminará esta nota.",
      buttons: [
        {
          label: "Ok, eliminar",
          onClick: async () =>
            await deleteNoteFromImage(
              props.loteInnerId,
              note,
              imageId,
              props.imageNumberInArray
            ),
        },
        {
          label: "No eliminar",
          onClick: () => {},
        },
      ],
    });
  }

  const showNotes = () => {
    if (props.notes && props.notes.length > 0) {
      return props.notes.map(
        ({ originalNote, noteToDisplay, imageId }, index) => {
          return (
            <div
              key={index}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <p>
                {index + 1} - {noteToDisplay}
              </p>

              <DeleteIcon
                onClick={() => {
                  deleteNote(originalNote, imageId);
                }}
                color="error"
              />
            </div>
          );
        }
      );
    } else {
      return <p> La imágen no tiene ninguna nota.</p>;
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
