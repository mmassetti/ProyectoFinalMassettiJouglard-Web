import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

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

  const showNotes = () => {
    if (props.notes && props.notes.length > 0) {
      return props.notes.map((note, index) => {
        return (
          <p key={index}>
            {index + 1} - {note}
          </p>
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
