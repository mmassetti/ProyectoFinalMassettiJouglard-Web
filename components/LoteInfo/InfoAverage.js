import React from "react";
import PercentagesCard from "./PercentagesCard/PercentagesCard";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem.js";

export default function InfoAverage(props) {
  const {
    title,
    averageBefore,
    averageAfter,
    totalImagesBefore,
    totalImagesAfter,
  } = props;

  const percentagesBefore = getPercentagesBefore(
    averageBefore,
    totalImagesBefore
  );
  const percentagesAfter = getPercentagesAfter(averageAfter, totalImagesAfter);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <h3>
            <strong>{title}</strong>
          </h3>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <PercentagesCard
            title={"Antes"}
            percentages={percentagesBefore}
            isAverage={true}
          />
          <h6>
            <strong>Cantidad de imágenes antes: {totalImagesBefore}</strong>
          </h6>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          <PercentagesCard
            title={"Después"}
            percentages={percentagesAfter}
            isAverage={true}
          />
          <h6>
            <strong>Cantidad de imágenes después: {totalImagesAfter}</strong>
          </h6>
        </GridItem>
      </GridContainer>
    </div>
  );
}

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
