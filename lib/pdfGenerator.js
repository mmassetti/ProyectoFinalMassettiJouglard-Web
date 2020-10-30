import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { toDate, format, getMinutes, getHours } from "date-fns";
import moment from "moment";
import "moment/locale/es";

// define a generatePDF function that accepts a tickets argument
const generatePDF = (dataLotes) => {
  //   console.log("generatePDF -> dataLotes", dataLotes);
  //   console.log("generatePDF -> dataLotes", dataLotes);

  //   const result = format(
  //     toDate(dataLotes[0].loteData.creationDate._seconds * 1000),
  //     "dd/MM/yyyy"
  //   );

  let sessionInfo = "";

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
    // headStyles: {
    //   valign: "middle",
    //   halign: "center",
    // },
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
  let sessionCreationDate = doc.splitTextToSize(
    "Sesión creada el 27/07/2020 a las 08:30 hs por NombreUsuario",
    pageWidth - 35,
    {}
  );
  doc.text(sessionCreationDate, 14, 30);

  doc.setFontSize(14);
  doc.setTextColor(20); //negro
  //TODO: meter un if para ver si hay notas y mostrarlas
  doc.text("Notas de la sesión:", 14, doc.lastAutoTable.finalY + 10);

  //   doc.text(
  //     "Información para la sesión: " +
  //       sessionInfo.description +
  //       " ,creada el: " +
  //       sessionInfo.creationDate,
  //     14,
  //     15
  //   );
  // we define the name of our PDF file.

  doc.save(
    `CubrimientoSuelos_${dateStr}.pdf`
    // `CubrimientoSuelos_Sesion_${sessionInfo.creationDate}_${dateStr}.pdf`
  );
};

export default generatePDF;
