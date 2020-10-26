import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";
import MaterialTable from "material-table";
import { optionsConfig, localizationConfig } from "./config/tableConfig";
import router from "next/router";
import { deleteSession, updateSession } from "../../lib/db-client";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData } = props;

  const [columns, setColumns] = useState(tableHead);

  const [data, setData] = useState(tableData);

  const goToSessionDetail = (rowData) => {
    router.push("/sesion/[id]", `/sesion/${rowData.id}`, {
      shallow: true,
    });
  };

  return (
    <div className={classes.tableResponsive}>
      <MaterialTable
        columns={columns}
        data={props.tableData}
        options={optionsConfig}
        localization={localizationConfig}
        onRowClick={(event, rowData) => goToSessionDetail(rowData)}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                //Actualizo en firebase
                if (oldData.description !== newData.description) {
                  //Only session description is editable
                  await updateSession(oldData.id, newData.description);
                }

                //Actualizo la tabla
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(async () => {
                //Elimino de firebase
                await deleteSession(oldData.id);

                //Elimino de la tabla
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
}

CustomTable.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.object),
  tableData: PropTypes.arrayOf(PropTypes.object),
};
