import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import ImageNotesTable from "components/Modal/ImageNoteModal/ImageNotesTable";

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

  const showNotes = () => {
    if (props.notes && props.notes.length > 0) {
      return (
        <ImageNotesTable
          tableHead={[{ title: "Nota", field: "noteToDisplay" }]}
          tableData={props.notes}
          loteDetailId={props.loteDetailId}
          imageNumberInArray={props.imageNumberInArray}
        />
      );
    } else {
      return <p> La imágen no tiene ninguna nota. </p>;
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
    // <div style={styles}>
    //   <Modal open={open} onClose={() => onCloseModal()} center>
    //     <h3>{props.title}</h3>
    //     {showNotes()}
    //   </Modal>
    // </div>
  );
}
