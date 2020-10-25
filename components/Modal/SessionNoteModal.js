import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import DeleteIcon from "@material-ui/icons/Delete";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { removeItemFromArrayByDescription } from "../../lib/db-client";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

export default function SessionNoteModal(props) {
  const [open, setOpen] = React.useState(true);

  const onCloseModal = () => {
    setOpen(false);
    props.onCloseModal();
  };

  async function deleteNote(note) {
    onCloseModal();

    return confirmAlert({
      title: "Eliminar nota",
      message: "¡Atención! Se eliminará esta nota.",
      buttons: [
        {
          label: "Ok, eliminar",
          onClick: async () =>
            await removeItemFromArrayByDescription(
              "notes",
              "sessionsDetails",
              props.sessionDetailsId,
              note
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
      return props.notes.map((note, index) => {
        return (
          <div
            key={index}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <p>
              {index + 1} - {note}
            </p>

            <DeleteIcon
              onClick={() => {
                deleteNote(note);
              }}
              color="error"
            />
          </div>
        );
      });
    } else {
      return <p> La sesión no tiene ninguna nota. </p>;
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
