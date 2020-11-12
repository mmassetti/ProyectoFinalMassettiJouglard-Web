import { toDate, format, getMinutes, getHours } from "date-fns";

function formatCsvDataSingleSession(dataLotes) {
  let sessionData;
  if (dataLotes && dataLotes.length > 0) {
    //la sesion tiene al menos un lote
    sessionData = dataLotes[0].sessionData;
  } else {
    return;
  }

  const headers = [
    { label: "Lote", key: "lote" },
    { label: "Fecha de creación", key: "creationDate" },
    { label: "Cantidad de imágenes sueltas", key: "totalImagesBefore" },
    { label: "Cantidad de pasturas", key: "totalPasturas" },
    { label: "Promedio lote 'antes'", key: "loteAverageBefore" },
    { label: "Promedio lote 'después'", key: "loteAverageAfter" },
  ];

  let data = [];

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

    data.push({
      lote: info.loteData.description,
      creationDate: formattedDate,
      totalImagesBefore: info.loteData.images.length,
      totalPasturas: info.loteData.pasturas.length,
      loteAverageBefore:
        averageBeforeString +
        " (Cantidad imágenes 'antes': " +
        info.loteData.totalImagesBefore +
        ")",
      loteAverageAfter:
        averageAfterString +
        " (Cantidad imágenes 'despues': " +
        info.loteData.totalImagesAfter +
        ")",
    });
  });

  const csvReport = {
    data: data,
    headers: headers,
    filename: `CoberturaSuelos_${
      format(new Date(), "dd/MM/yyyy-HH:mm") + "hs"
    }.csv`,
  };

  return csvReport;
}
export default formatCsvDataSingleSession;

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
