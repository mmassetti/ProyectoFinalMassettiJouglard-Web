import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import DeleteIcon from "@material-ui/icons/Delete";
import "react-confirm-alert/src/react-confirm-alert.css";
import SweetAlert from "react-bootstrap-sweetalert";
import Button from "components/CustomButtons/Button.js";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};

export default function SessionNoteModal(props) {
  const [open, setOpen] = React.useState(true);
  const [showNotesContent, setShowNotesContent] = React.useState(true);
  const [note, setNote] = useState("");

  const onCloseModal = () => {
    setOpen(false);
    props.onCloseModal();
  };

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
                setNote(note);
                setShowNotesContent(false);
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

  const onConfirm = () => {
    props.onDelete(note);
    onCloseModal();
  };
  const onCancel = () => {
    onCloseModal();
  };

  return (
    <div>
      {showNotesContent ? (
        <SweetAlert
          title={props.title}
          onCancel={onCancel}
          custom
          showConfirm={false}
          showCancel={false}
          showCloseButton
        >
          {showNotes()}
        </SweetAlert>
      ) : (
        <SweetAlert
          warning
          showCancel
          title="¡Atención! "
          customButtons={
            <>
              <Button onClick={onCancel} color="info" round size="sm">
                No eliminar
              </Button>
              <Button onClick={onConfirm} color="danger" round size="sm">
                Sí, eliminar nota
              </Button>
            </>
          }
        >
          Se eliminará esta nota, tanto aquí como en la aplicación móvil.
        </SweetAlert>
      )}
    </div>
  );
}
