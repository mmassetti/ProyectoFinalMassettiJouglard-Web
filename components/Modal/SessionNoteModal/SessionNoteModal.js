import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import SessionNotesTable from "components/Modal/SessionNoteModal/SessionNotesTable";

export default function SessionNoteModal(props) {
  const [open, setOpen] = useState(true);

  let notesInfo = [];
  props.notes.map((note, index) => {
    notesInfo.push({
      id: index,
      note: note,
    });
  });

  const onCloseModal = () => {
    setOpen(false);
    props.onCloseModal();
  };

  const showNotes = () => {
    if (props.notes && props.notes.length > 0) {
      return (
        <SessionNotesTable
          tableHead={[{ title: "Nota", field: "note" }]}
          tableData={notesInfo}
          sessionDetailsId={props.sessionDetailsId}
        />
      );
    } else {
      return <p> La sesión no tiene ninguna nota. </p>;
    }
  };

  return (
    <div>
      <SweetAlert
        title={props.title}
        onConfirm={() => {}}
        onCancel={() => onCloseModal()}
        custom
        showConfirm={false}
        showCancel={false}
        showCloseButton
      >
        {showNotes()}
      </SweetAlert>
    </div>
  );
}
