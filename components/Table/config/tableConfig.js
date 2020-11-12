import moment from "moment";
import "moment/locale/es";

export const optionsConfig = {
  filtering: true,
  showTitle: false,
  draggable: false,
};

export const localizationConfig = {
  toolbar: {
    searchPlaceholder: "Búsqueda...",
    nRowsSelected: "{0} fila(s) seleccionadas",
    searchTooltip: "Buscar",
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
