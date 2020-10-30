import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { toDate, format, getMinutes, getHours } from "date-fns";
import moment from "moment";
import "moment/locale/es";

//TODO: Si no tiene lotes mostrar un mensaje en lugar de la tabla

// define a generatePDF function that accepts a tickets argument
const generatePDF = (dataLotes) => {
  //   const result = format(
  //     toDate(dataLotes[0].loteData.creationDate._seconds * 1000),
  //     "dd/MM/yyyy"
  //   );
  let sessionData;
  if (dataLotes && dataLotes.length > 0) {
    //la sesion tiene al menos un lote
    sessionData = dataLotes[0].sessionData;
  }

  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = [
    "Lote",
    "Fecha creación",
    "Cantidad de imágenes sueltas",
    "Cantidad de pasturas",
    "Promedio lote 'antes'",
    "Promedio lote 'después'",
  ];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  dataLotes.forEach((info) => {
    const loteDate = toDate(info.loteData.creationDate._seconds * 1000);
    const formattedDate =
      format(loteDate, "dd/MM/yyyy") +
      " - " +
      getHours(loteDate) +
      ":" +
      getMinutes(loteDate) +
      "hs";

    const loteData = [
      info.loteData.description,
      formattedDate,
      info.loteData.images.length,
      info.loteData.pasturas.length,
      info.loteData.averageBefore.totalGreen,
      info.loteData.averageAfter.totalGreen,
    ];

    //  push each tickcet's info into a row
    tableRows.push(loteData);
  });

  let options = {
    styles: {
      halign: "center",
    },
    startY: 40,
  };
  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, options);
  const date = Date().split(" ");
  //    we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // document title. and margin-top + margin-left
  doc.setFontSize(20);
  doc.text("Informe de la sesión", 14, 15);
  doc.setFontSize(12);
  doc.text("Fecha de descarga: 12/12/12", 14, 20);

  //Descripcion de la sesion
  doc.setFontSize(16);
  doc.setTextColor("#2980ba");
  let pageSize = doc.internal.pageSize;
  let pageWidth = pageSize.getWidth ? pageSize.getWidth : pageSize.getWidth();
  const sessionDate = toDate(sessionData.creationDate._seconds * 1000);
  let sessionCreationDate = doc.splitTextToSize(
    "Sesión creada el " +
      format(sessionDate, "dd/MM/yyyy") +
      " a las " +
      getHours(sessionDate) +
      ":" +
      getMinutes(sessionDate) +
      "hs por " +
      sessionData.user,
    pageWidth - 35,
    {}
  );
  doc.text(sessionCreationDate, 14, 30);

  doc.setFontSize(14);
  doc.setTextColor(20); //negro
  let sessionDescription = sessionData.description;
  doc.text("Descripción:", 14, doc.lastAutoTable.finalY + 10);

  let desc = doc.splitTextToSize("  " + sessionDescription, pageWidth - 55);

  doc.text(desc, 12, doc.lastAutoTable.finalY + 16);

  let descriptionWidth = doc.getTextWidth(sessionDescription);
  console.log("generatePDF -> descriptionWidth", descriptionWidth);

  //TODO: meter un if para ver si hay notas y mostrarlas
  if (sessionData.notes.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(20); //negro
    doc.text(
      "Notas de la sesión:",
      14,
      doc.lastAutoTable.finalY + descriptionWidth + 6
    );
    doc.setFontSize(12);
    // doc.text("      -Una nota de eejemplo", 14, doc.lastAutoTable.finalY + 16);
  }

  // we define the name of our PDF file.

  //TODO: Poner bien esta fecha
  doc.save(
    `CubrimientoSuelos_${dateStr}.pdf`
    // `CubrimientoSuelos_Sesion_${sessionInfo.creationDate}_${dateStr}.pdf`
  );
};

export default generatePDF;
