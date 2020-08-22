import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";
import MaterialTable from "material-table";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  console.log("CustomTable -> tableData", tableData);

  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: "Id", field: "id" },
    { title: "Descripción", field: "description" },
    { title: "Fecha", field: "date" },
    { title: "Creador/a", field: "creator" },
  ]);

  // const [data, setData] = useState(tableData);

  const [data, setData] = useState([
    {
      id: "1",
      description: "Sesion 1",
      date: "21/08/2019",
      creator: "Usuario1",
    },
    {
      id: "2",
      description: "Sesion 2",
      date: "02/02/2017",
      creator: "Usuario2",
    },
  ]);

  return (
    <div className={classes.tableResponsive}>
      <MaterialTable
        columns={columns}
        data={data}
        options={{
          filtering: true,
          showTitle: false,
          draggable: false,
        }}
        const
        localization={{
          toolbar: {
            searchPlaceholder: "Búsqueda...",
            nRowsSelected: "{0} fila(s) seleccionadas",
            searchTooltip: "Buscar",
          },
          body: {
            deleteTooltip: "Eliminar",
            editTooltip: "Editar",
            emptyDataSourceMessage: "No hay ninguna sesión para mostrar",
            filterRow: {
              filterTooltip: "Filtrar",
            },
            saveTooltip: "Guardar",
            editRow: {
              deleteText: "Confirmá que querés eliminar la sesión",
              saveTooltip: "Confirmar",
              cancelTooltip: "Cancelar",
            },
          },
          header: {
            actions: "Acciones",
          },
          pagination: {
            labelDisplayedRows: "{from}-{to} de {count}",
            labelRowsSelect: "filas",
            firstAriaLabel: "Primer página",
            firstTooltip: "Primer página",
            lastArialLabel: "Última página",
            previousAriaLabel: "Página anterior",
            previousTooltip: "Página anterior",
            nextAriaLabel: "Página siguiente",
            nextTooltip: "Página siguiente",
            lastAriaLabel: "Última página",
            lastTooltip: "Última página",
          },
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
      />
      {/* <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table> */}
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
