import jsPDF from "jspdf";
import "jspdf-autotable";
import { toDate, format, getMinutes, getHours } from "date-fns";

const generatePDF = (dataLotes) => {
  let sessionData;
  if (dataLotes && dataLotes.length > 0) {
    //la sesion tiene al menos un lote
    sessionData = dataLotes[0].sessionData;
  } else {
    return;
  }

  // initialize jsPDF

  const doc = new jsPDF("p", "mm", "a4");

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

  // for each lote data pass all its data into an array
  dataLotes.forEach((info) => {
    const loteDate = toDate(info.loteData.creationDate._seconds * 1000);
    const formattedDate =
      format(loteDate, "dd/MM/yyyy") +
      " - " +
      getHours(loteDate) +
      ":" +
      getMinutes(loteDate) +
      "hs";

    let averageBeforeObj = getPercentagesBefore(
      info.loteData.averageBefore,
      info.loteData.totalImagesBefore
    );

    let averageAfterObj = getPercentagesAfter(
      info.loteData.averageAfter,
      info.loteData.totalImagesAfter
    );

    let averageBeforeString =
      "Verde: " +
      Math.floor(averageBeforeObj.percentageGreen) +
      "% " +
      " Seco: " +
      Math.floor(averageBeforeObj.percentageYellow) +
      "% " +
      " Desnudo: " +
      Math.floor(averageBeforeObj.percentageNaked) +
      "%";

    let averageAfterString =
      "Verde: " +
      Math.floor(averageAfterObj.percentageGreen) +
      "% " +
      " Seco: " +
      Math.floor(averageAfterObj.percentageYellow) +
      "% " +
      " Desnudo: " +
      Math.floor(averageAfterObj.percentageNaked) +
      "%";

    const loteData = [
      info.loteData.description,
      formattedDate,
      info.loteData.images.length,
      info.loteData.pasturas.length,
      averageBeforeString +
        " (Cantidad imágenes 'antes': " +
        info.loteData.totalImagesBefore +
        ")",
      averageAfterString +
        " (Cantidad imágenes 'despues': " +
        info.loteData.totalImagesAfter +
        ")",
    ];

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
  doc.text("Fecha de descarga: " + format(new Date(), "dd/MM/yyyy"), 14, 20);

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
  doc.setTextColor("#2980ba");
  doc.text("Descripción:", 14, doc.lastAutoTable.finalY + 10);

  //adjustments to fit a possible long text
  var lMargin = 15; //left margin in mm
  var rMargin = 15; //right margin in mm
  var pdfInMM = 210; // width of A4 in mm
  var lines = doc.splitTextToSize(
    sessionDescription,
    pdfInMM - lMargin - rMargin
  );
  doc.setTextColor(20); //negro
  doc.text(lMargin, doc.lastAutoTable.finalY + 16, lines);

  if (sessionData.notes.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor("#2980ba");
    doc.text("Notas de la sesión:", 14, doc.lastAutoTable.finalY + 40);
    doc.setTextColor(20); //negro
    let startHeight = doc.lastAutoTable.finalY + 46;
    sessionData.notes.map((note) => {
      doc.text(" " + note, 14, startHeight);
      startHeight += 6;
    });
  }

  doc.save(
    `CoberturaSuelos_${format(new Date(), "dd/MM/yyyy-HH:mm") + "hs"}.pdf`
  );
};

export default generatePDF;

function getPercentagesBefore(averageBefore, totalImagesBefore) {
  let percentagesBefore;
  if (totalImagesBefore > 0) {
    percentagesBefore = {
      percentageGreen: averageBefore.totalGreen / totalImagesBefore,
      percentageYellow: averageBefore.totalYellow / totalImagesBefore,
      percentageNaked: averageBefore.totalNaked / totalImagesBefore,
    };
  } else {
    percentagesBefore = {
      percentageGreen: 0,
      percentageYellow: 0,
      percentageNaked: 0,
    };
  }
  return percentagesBefore;
}

function getPercentagesAfter(averageAfter, totalImagesAfter) {
  let percentagesAfter;
  if (totalImagesAfter > 0) {
    percentagesAfter = {
      percentageGreen: averageAfter.totalGreen / totalImagesAfter,
      percentageYellow: averageAfter.totalYellow / totalImagesAfter,
      percentageNaked: averageAfter.totalNaked / totalImagesAfter,
    };
  } else {
    percentagesAfter = {
      percentageGreen: 0,
      percentageYellow: 0,
      percentageNaked: 0,
    };
  }

  return percentagesAfter;
}
