import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import Button from "components/CustomButtons/Button.js";

export default function LoteModal(props) {
  const [open, setOpen] = useState(true);

  const onCloseModal = () => {
    setOpen(false);
    props.onCloseModal();
  };

  return (
    <div>
      <SweetAlert
        input
        showCancel
        title={props.title}
        placeHolder="Nueva descripción..."
        onConfirm={(response) =>
          props.handleEditLote
            ? props.handleEditLote(response)
            : props.handleEditPastura(response)
        }
        onCancel={onCloseModal}
        confirmBtnText="Guardar"
        cancelBtnText="Cancelar"
        //TODO: Placeholder not working and check buttons styles
        // customButtons={
        //   <>
        //     <Button round color="secondary" onClick={onCloseModal}>
        //       Cancelar
        //     </Button>
        //     <Button
        //       round
        //       color="success"
        //       onClick={(response) => props.handleEditLote(response)} //Esto no funciona
        //     >
        //       Confirmar
        //     </Button>
        //   </>
        // }
      >
        Nueva descripción:
      </SweetAlert>
    </div>
  );
}
