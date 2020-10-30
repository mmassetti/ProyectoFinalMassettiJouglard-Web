import moment from "moment";
import "moment/locale/es";

export const optionsConfig = {
  filtering: true,
  showTitle: false,
  draggable: false,
  exportButton: true,
  //TODO: Decidir si dejamos el exportAllData como true o false
  exportAllData: true,
  exportFileName: "Cobertura de suelos - Sesiones al " + moment().format("LL"),
};

export const localizationConfig = {
  toolbar: {
    searchPlaceholder: "Búsqueda...",
    nRowsSelected: "{0} fila(s) seleccionadas",
    searchTooltip: "Buscar",
    exportTitle: "Exportar",
    exportArialLabel: "Exportar",
    //TODO: para poder usar estas dos hay que esperar al neuvo release de material-table, chequear si se agregaron en https://github.com/mbrn/material-table/releases  (release actual es v1.69.0 y todavia no están)
    // exportPdfName: "Exportar como PDF",
    // exportCsvName: "Exportar como CSV"
  },
  body: {
    editTooltip: "Editar",
    emptyDataSourceMessage: "No hay ninguna sesión para mostrar",
    filterRow: {
      filterTooltip: "Filtrar",
    },
    saveTooltip: "Guardar",
    editRow: {
      saveTooltip: "Confirmar",
      cancelTooltip: "Cancelar",
    },
  },
  header: {
    actions: "Editar",
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
};
