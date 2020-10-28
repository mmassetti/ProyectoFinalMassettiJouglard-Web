import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";
import MaterialTable from "material-table";
import { optionsConfig, localizationConfig } from "./config/tableConfig";

const useStyles = makeStyles(styles);

export default function SessionNotesTable(props) {
  const classes = useStyles();
  const { tableHead, tableData } = props;
  const [columns, setColumns] = useState(tableHead);

  return (
    <div>
      <div className={classes.tableResponsive}>
        <MaterialTable
          columns={columns}
          data={tableData}
          options={optionsConfig}
          localization={localizationConfig}
          editable={{
            isDeletable: () => false,
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(async () => {
                  //Actualizo en firebase
                  //   if (oldData.description !== newData.description) {
                  //     //Only session description is editable
                  //     await updateSession(
                  //       oldData.sessionId,
                  //       oldData.id,
                  //       newData.description
                  //     );
                  //   }

                  //Actualizo la tabla
                  const dataUpdate = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setData([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
          }}
        />
      </div>
    </div>
  );
}
