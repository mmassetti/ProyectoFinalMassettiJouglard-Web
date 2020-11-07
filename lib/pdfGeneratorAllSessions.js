import jsPDF from "jspdf";
import "jspdf-autotable";
import { toDate, format, getMinutes, getHours } from "date-fns";

const generatePDF = (allInfo) => {
  if (!allInfo || allInfo.length == 0) {
    return;
  }

  // initialize jsPDF
  const doc = new jsPDF("p", "mm", "a4");

  // define the columns we want and their titles
  const tableColumn = [
    "Sesión",
    "Fecha",
    "Creado por",
    "Cantidad de lotes",
    "Cantidad de pasturas",
    "Total de imágenes (sueltas + en pasturas)",
    "Notas",
  ];

  // define an empty array of rows
  const tableRows = [];

  allInfo.map((sessionInfo) => {
    const sessionDate = toDate(
      sessionInfo.sessionData.creationDate._seconds * 1000
    );
    const sessionFormattedDate =
      format(sessionDate, "dd/MM/yyyy") +
      " - " +
      getHours(sessionDate) +
      ":" +
      getMinutes(sessionDate) +
      "hs";

    let totalPasturas = 0;
    let totalImages = 0;
    sessionInfo.lotesAndPasturasData.data.map((data) => {
      totalImages +=
        data.loteData.totalImagesBefore + data.loteData.totalImagesAfter;

      if (data.loteData.pasturas.length > 0) {
        totalPasturas += data.loteData.pasturas.length;
      }
    });

    const sessionData = [
      sessionInfo.sessionData.description,
      sessionFormattedDate,
      sessionInfo.sessionData.user,
      sessionInfo.lotesAndPasturasData.data.length,
      totalPasturas,
      totalImages,
      sessionInfo.sessionData.notes.length > 0
        ? sessionInfo.sessionData.notes.join(" - ")
        : "La sesión no tiene notas generales",
    ];

    tableRows.push(sessionData);
  });

  let options = {
    styles: {
      halign: "center",
    },
    startY: 30,
  };
  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, options);

  // document title. and margin-top + margin-left
  doc.setFontSize(20);
  doc.text("Lista de sesiones", 14, 15);
  doc.setFontSize(12);
  doc.text("Fecha de descarga: " + format(new Date(), "dd/MM/yyyy"), 14, 20);

  doc.save(
    `CoberturaSuelos_TodasLasSesiones_${
      format(new Date(), "dd/MM/yyyy-HH:mm") + "hs"
    }.pdf`
  );
};

export default generatePDF;
